// Default Modules
import { exec } from 'node:child_process'
import { resolve } from 'node:path'

const { NODE_ENV = 'development' } = process.env

const meditationConfig = {
	name: 'meditation',
	port: NODE_ENV === 'production' ? 4000 : 3000,
	boot: [],
	script: {
		prettier: () => exec('prettier --write .'),
		mkDir: (path: string) => exec(`mkdir -p ${path}`),
		mkFile: (path: string) => exec(`mkdir -p ${path.substring(0, path.lastIndexOf('/'))} && touch ${path}`),
	},
	config: {
		active_databases: ['mysql'],
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
