// Default Modules
import { resolve } from 'path'
// Modules
import { Databases } from '#types/enums/general.enum'
import { IMeditationConfig } from '#types/interfaces/config.interface'

const { NODE_ENV = 'development' } = process.env

const meditationConfig: IMeditationConfig = {
	name: 'meditation',
	port: NODE_ENV === 'production' ? 4000 : 3500,
	boot: [],
	config: {
		default_database: Databases.SQLITE,
		active_databases: [Databases.SQLITE],
		database: {
			mysql: {
				host: 'localhost',
				user: 'user',
				database: 'db',
				password: 'password',
				sync: { force: true },
			},
			mongodb: {
				url: 'mongodb://0.0.0.0:27017',
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
				host: '0.0.0.0',
				user: 'user',
				database: 'db',
				password: 'password',
				port: 5432,
				idleTimeoutMillis: 10000,
				connectionTimeoutMillis: 10000,
				sync: { force: true },
			},
			sqlite: {
				storage: resolve(process.cwd(), 'database/database.sqlite'),
				database: 'db',
				user: 'user',
				password: 'password',
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
	},
}

export default meditationConfig
