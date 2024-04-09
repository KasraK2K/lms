#!/usr/bin/env bun
import { exec } from 'child_process'
import fs from 'fs'
import os from 'os'

const numOfCpus = os.cpus().length

const devPort = 3500
const prodPort = 4000
const startPort = process.env.NODE_ENV !== 'production' ? devPort : prodPort
const insideDockerPort = process.env.NODE_ENV === 'production' ? devPort : prodPort

let services = ''

for (let i = 0; i < numOfCpus; i++) {
	const port = startPort + i
	services += `
    backend_${i + 1}:
        <<: *backend-template
        container_name: backend_${i + 1}
        ports: 
            - "${port}:${insideDockerPort}"\n`
}

const yamlStr = `version: '3.9'

x-backend-template: &backend-template
    image: 'oven/bun:latest'
    entrypoint: []
    command: "/bin/sh -c 'bun install && bun run --watch src/index.ts'"
    volumes: ['./:/home/bun/app']
    environment: 
        - NODE_ENV=${process.env.NODE_ENV}

services:${services}
`

fs.writeFileSync('docker-compose.yml', yamlStr)

exec('docker-compose up -d', (err: Error | null, stdout: string, stderr: string) => {
	if (err) {
		// node couldn't execute the command
		return
	}

	// the *entire* stdout and stderr (buffered)
	console.log(`stdout: ${stdout}`)
	console.log(`stderr: ${stderr}`)
})
