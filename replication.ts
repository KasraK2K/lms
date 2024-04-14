#!/usr/bin/env bun
import { exec } from 'child_process'
import fs from 'fs'
import os from 'os'

const { NODE_ENV = 'development' } = process.env
const numOfCpus = NODE_ENV === 'production' ? os.cpus().length : 1
const backendPort = NODE_ENV !== 'production' ? 3500 : 4000
const loadBalancerPort = 3000
const prismaCommands = 'bunx prisma generate && bunx prisma migrate deploy'

let services = `\n    # ---------------------------------- Backend --------------------------------- #`

for (let i = 0; i < numOfCpus; i++) {
	const port = backendPort + i
	services += `
    backend_${i + 1}:
        <<: *backend-template
        container_name: backend_${i + 1}
        environment: 
            - NODE_ENV=${NODE_ENV}
            - SERVICE_NUMBER=${i + 1}
        ports:
            - ${port}:${backendPort}
        healthcheck:
            test: ["CMD-SHELL", "curl --fail http://backend_${i + 1}:${backendPort}/api/health || exit 1"]
            interval: 30s
            timeout: 10s
            retries: 3\n`
}

// Generate docker-compose.yml
const yamlStr = `version: '3.9'

x-backend-template: &backend-template
    image: 'oven/bun:latest'
    entrypoint: []
    command: "/bin/sh -c '${prismaCommands} && bun ${NODE_ENV === 'development' ? 'run --watch' : 'run'} src/index.ts'"
    volumes: ['./:/home/bun/app']
    restart: unless-stopped
    depends_on:
        - postgres
        - mongo

services:${services}
    # -------------------------------- PostgreSQL -------------------------------- #
    postgres:
        image: postgres:latest
        container_name: db-postgres-database
        restart: unless-stopped
        deploy:
            mode: replicated
            replicas: 1
        environment:
            - POSTGRES_USER=postgres
            - POSTGRES_PASSWORD=postgres
            - POSTGRES_DB=meditation
            # - POSTGRESQL_PORT_NUMBER=5432
        ports:
            - 5432:5432
        volumes:
            - ./backup/postgresql/data:/var/lib/postgresql/data
        healthcheck:
            test: ["CMD-SHELL", "pg_isready -U postgres"]
            interval: 10s
            timeout: 5s
            retries: 3

    # ---------------------------------- MongoDB --------------------------------- #
    mongo:
        image: mongo:latest
        container_name: db-mongo-database
        restart: unless-stopped
        environment:
            MONGO_INITDB_ROOT_USERNAME: admin
            MONGO_INITDB_ROOT_PASSWORD: admin
        # command: mongod --port 27017
        ports:
            - 27017:27017
        volumes:
            - ./backup/mongodb/data:/data/db
            - ./backup/mongodb/logs:/var/log/mongodb
        healthcheck:
            test: ["CMD-SHELL", "mongo --eval \'printjson(db.serverStatus())\'"]
            interval: 10s
            timeout: 5s
            retries: 3

    # ------------------------------- Load Balancer ------------------------------ #
    load_balancer:
        image: nginx:latest
        container_name: load_balancer
        volumes:
            - ./nginx.conf:/etc/nginx/nginx.conf
        restart: unless-stopped
        ports:
            - "${loadBalancerPort}:80"

    # ---------------------------------- Fluentd --------------------------------- #
    fluentd:
        build:
            context: ./fluentd
            dockerfile: Dockerfile
        image: kasra-fluentd
        container_name: fluentd
        volumes:
            - ./fluentd/conf:/fluentd/etc
        ports:
            - "24224:24224"
            - "24224:24224/udp"
        restart: unless-stopped
        links:
            - elasticsearch

    # ------------------------------- Elasticsearch ------------------------------ #
    elasticsearch:
        image: docker.elastic.co/elasticsearch/elasticsearch:7.17.0
        container_name: elasticsearch
        environment:
            - discovery.type=single-node
            - ES_JAVA_OPTS=-Xms2g -Xmx2g
            - cluster.routing.allocation.disk.threshold_enabled=false
        ulimits:
            memlock:
                soft: -1
                hard: -1
        volumes:
            - ./backup/elasticsearch:/usr/share/elasticsearch/data
        ports:
            - "9200:9200"
`

// Write docker-compose.yml
fs.writeFileSync('docker-compose.yml', yamlStr)

// Generate nginx.conf
const upstreamPoint = `${Array(numOfCpus)
	.fill(undefined)
	.map((_, i) => `        server backend_${i + 1}:${backendPort};`)
	.join('\n')}`
const nginxConf = `worker_processes 1;

events {
    worker_connections 1024;
}

http {
    gzip on; # Enable gzip compression
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    upstream backend_http {
        least_conn;
${upstreamPoint}
    }

    upstream backend_ws {
        hash $request_uri consistent;
${upstreamPoint}
    }

    server {
        listen 80;

        location / {
            proxy_pass http://backend_http;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location ~ ^/(.*)/ws/ {
            proxy_pass http://backend_ws;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}`

// Write nginx.conf
fs.writeFileSync('nginx.conf', nginxConf)

// Run docker-compose
exec('docker-compose up -d', (err: Error | null, stdout: string, stderr: string) => {
	if (err) {
		// node couldn't execute the command
		console.error('err:', err)
		return
	}

	// the *entire* stdout and stderr (buffered)
	console.log(`stdout: ${stdout}`)
	console.log(`stderr: ${stderr}`)
})
