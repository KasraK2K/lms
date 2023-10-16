// Modules
import { Databases } from './general.enum'

export interface IMeditationConfig {
	name: string
	port: number
	boot: string[]
	config: {
		default_engine: Databases
		active_databases: Databases[]
		database: IDatabaseConfig
	}
}

export interface IDatabaseConfig {
	mysql: IMySQLConfig
	mongodb: IMongoDBConfig
	mariadb: IMariaDBConfig
	postgres: IPostgreSQLConfig
	sqlite: ISQLiteConfig
	redis: IRedisConfig
	ioRedis: IIORedisConfig
	rabbitMQ: IRabbitMQConfig
}

export interface IMySQLConfig {
	host: string
	user: string
	database: string
	password: string
	sync: { force: boolean }
}

export interface IMongoDBConfig {
	url: string
	database: string
	collection: string
	options: {}
}

export interface IMariaDBConfig {
	host: string
	user: string
	database: string
	password: string
	sync: { force: boolean }
}

export interface IPostgreSQLConfig {
	host: string
	user: string
	database: string
	password: string
	port: number
	idleTimeoutMillis: number
	connectionTimeoutMillis: number
	sync: { force: boolean }
}

export interface ISQLiteConfig {
	storage: string
	database: string
	user: string
	password: string
	sync: { force: boolean }
}

export interface IRedisConfig {
	url: string
}

export interface IIORedisConfig {
	host: string
	port: number
	showFriendlyErrorStack: boolean
	enableReadyCheck: boolean
	maxRetriesPerRequest: number | null
}

export interface IRabbitMQConfig {}
