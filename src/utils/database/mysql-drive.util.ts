// Dependencies
import mysql2 from 'mysql2'
// Modules
import meditation from '#meditation'

const { mysql: mysqlConfig } = meditation.config.database
const { active_databases } = meditation.config

export const mysqlDrive = active_databases.includes('mysql')
	? mysql2.createConnection({ user: mysqlConfig.user, password: mysqlConfig.password, database: mysqlConfig.database })
	: {}
