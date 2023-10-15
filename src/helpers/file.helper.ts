// Default Modules
import { exec } from 'node:child_process'

export const mkDir = (path: string) => exec(`mkdir -p ${path}`)
export const mkFile = (path: string) => exec(`mkdir -p ${path.substring(0, path.lastIndexOf('/'))} && touch ${path}`)
