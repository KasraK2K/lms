// Dependencies
import { Sequelize } from 'sequelize'
// Modules
import meditation from '#meditation'

const { mariadb: mariadbConfig } = meditation.config.database
const { active_databases } = meditation.config

export const mariadb = new Sequelize(mariadbConfig.database, mariadbConfig.user, mariadbConfig.password, {
	dialect: 'mariadb',
	host: mariadbConfig.host,
	sync: mariadbConfig.sync,
	logging: false,
})

if (active_databases.includes('mariadb'))
	try {
		await mariadb.authenticate()
		console.log('mariadb is connected.')
	} catch (error) {
		console.error('error on mariadb connection.')
	}
