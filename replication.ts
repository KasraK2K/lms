#!/usr/bin/env bun
import { exec } from 'child_process'
import fs from 'fs'
import os from 'os'

const { NODE_ENV = 'development' } = process.env
const numOfCpus = NODE_ENV === 'production' ? os.cpus().length : 1
const backendPort = NODE_ENV !== 'production' ? 3500 : 4000
const loadBalancerPort = 3000

let services = `\n    # ---------------------------------- Backend --------------------------------- #`

for (let i = 0; i < numOfCpus; i++) {
	services += `
    backend_${i + 1}:
        <<: *backend-template
        container_name: backend_${i + 1}\n`
}

// Generate docker-compose.yml
const yamlStr = `version: '3.9'

x-backend-template: &backend-template
    image: 'oven/bun:latest'
    entrypoint: []
    command: "/bin/sh -c 'bunx prisma generate && bun ${NODE_ENV === 'development' ? 'run --watch' : 'run'} src/index.ts'"
    volumes: ['./:/home/bun/app']
    environment: 
        - NODE_ENV=${NODE_ENV}
    restart: unless-stopped
    depends_on:
        - postgres
        - mongo

services:${services}
    # -------------------------------- PostgreSQL -------------------------------- #
    postgres:
        image: postgres:latest
        container_name: bun-postgres-database
        restart: unless-stopped
        deploy:
            mode: replicated
            replicas: 1
        environment:
            - POSTGRES_USER=postgres
            - POSTGRES_PASSWORD=postgres
            - POSTGRES_DB=meditation
            - POSTGRESQL_PORT_NUMBER=5432
        volumes:
            - ./backup/pg-data:/var/lib/postgresql/data

    # ---------------------------------- MongoDB --------------------------------- #
    mongo:
        image: mongo:latest
        container_name: bun-mongo-database
        restart: unless-stopped
        environment:
            MONGO_INITDB_ROOT_USERNAME: admin
            MONGO_INITDB_ROOT_PASSWORD: admin
        command: mongod --port 27017
        volumes:
            - ./backup/db:/data/db
            - ./backup/logs:/var/log/mongodb

    # ------------------------------- Load Balancer ------------------------------ #
    load_balancer:
        image: nginx
        container_name: load_balancer
        volumes:
            - ./nginx.conf:/etc/nginx/nginx.conf
        restart: unless-stopped
        ports:
            - "${loadBalancerPort}:80"
`

// Write docker-compose.yml
fs.writeFileSync('docker-compose.yml', yamlStr)

// Generate nginx.conf
const nginxConf = `worker_processes 1;

events {
    worker_connections 1024;
}

http {
    upstream backend {
        least_conn;  # Use least connections algorithm
${Array(numOfCpus)
	.fill(undefined)
	.map((_, i) => `        server backend_${i + 1}:${backendPort};`)
	.join('\n')}
    }

    server {
        listen 80;

        location / {
            proxy_pass http://backend;
            proxy_http_version 1.1;
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
		return
	}

	// the *entire* stdout and stderr (buffered)
	console.log(`stdout: ${stdout}`)
	console.log(`stderr: ${stderr}`)
})
