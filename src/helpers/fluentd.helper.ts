// Dependencies
import { FluentClient } from '@fluent-org/logger'
// Modules
import meditationConfig from '#meditation'

const fluentClient = new FluentClient('backend', meditationConfig.config.fluentd)

interface Data {
	module: string
	method: string
	[key: string]: any
}

const logger = async (label: string, data: Data) => {
	await fluentClient.emit(label, { service_number: Number(process.env.SERVICE_NUMBER), timestamps: Date.now(), data })
}

export default logger
