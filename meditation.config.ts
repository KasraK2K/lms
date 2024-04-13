// Default Modules
// Modules
import { Databases } from '#types/enums/general.enum'
import { IMeditationConfig } from '#types/interfaces/config.interface'

const { NODE_ENV = 'development' } = process.env

const meditationConfig: IMeditationConfig = {
	name: 'meditation',
	port: NODE_ENV === 'production' ? 4000 : 3500,
	boot: [],
	config: {
		default_database: Databases.POSTGRES,
		active_databases: [Databases.POSTGRES],
		database: {
			mysql: {
				host: 'localhost',
				user: 'user',
				database: 'db',
				password: 'password',
				sync: { force: true },
			},
			mongodb: {
				url: 'mongodb://admin:admin@mongo:27017',
				database: 'meditation',
				collection: 'default',
				options: {},
			},
			mariadb: {
				host: 'localhost',
				user: 'user',
				database: 'db',
				password: 'password',
				sync: { force: true },
			},
			postgres: {
				host: 'postgres',
				user: 'postgres',
				database: 'meditation',
				password: 'postgres',
				port: 5432,
				idleTimeoutMillis: 10000,
				connectionTimeoutMillis: 10000,
				sync: { force: true },
			},
			redis: {
				url: 'redis://localhost:6379',
			},
			ioRedis: {
				host: 'localhost',
				port: 6379,
				showFriendlyErrorStack: true,
				enableReadyCheck: true,
				maxRetriesPerRequest: null,
			},
			rabbitMQ: {
				url: 'amqp://localhost',
			},
		},
		fluentd: {
			socket: {
				host: 'fluentd',
				port: 24224,
				timeout: 3000,
			},
		},
	},
}

export default meditationConfig
