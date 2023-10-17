// Dependencies
import mysql2 from 'mysql2'
// Modules
import meditation from '#meditation'
import { Databases } from '#src/types/enums/general.enum'

const { mysql: mysqlConfig } = meditation.config.database
const { active_databases } = meditation.config

export const mysqlDrive = active_databases.includes(Databases.MYSQL)
	? mysql2.createConnection({ user: mysqlConfig.user, password: mysqlConfig.password, database: mysqlConfig.database })
	: {}
