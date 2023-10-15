// Default Modules
import { exec } from 'node:child_process'

export const prettier = () => exec('prettier --write .')
