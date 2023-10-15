// Dependencies
import { Sequelize } from 'sequelize'
// Modules
import meditation from '#meditation'

const { mysql: mysqlConfig } = meditation.config.database
const { active_databases } = meditation.config

export const mysql = new Sequelize(mysqlConfig.database, mysqlConfig.user, mysqlConfig.password, {
	dialect: 'mysql',
	host: mysqlConfig.host,
	sync: mysqlConfig.sync,
	logging: false,
})

if (active_databases.includes('mysql'))
	try {
		await mysql.authenticate()
		console.log('mysql is connected.')
	} catch (error) {
		console.error('error on mysql connection.')
	}
