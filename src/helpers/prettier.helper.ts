// Default Modules
import { exec } from 'child_process'

export const prettier = () => exec('prettier --write .')
