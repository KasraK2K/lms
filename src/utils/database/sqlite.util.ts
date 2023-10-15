// Dependencies
import { Sequelize } from 'sequelize'
// Modules
import meditation from '#meditation'

const { sqlite: sqliteConfig } = meditation.config.database
const { active_databases } = meditation.config

export const sqlite = new Sequelize(sqliteConfig.database, sqliteConfig.user, sqliteConfig.password, {
	dialect: 'sqlite',
	storage: sqliteConfig.storage,
	logging: false,
})

if (active_databases.includes('sqlite'))
	try {
		await sqlite.authenticate()
		console.log('sqlite is connected.')
	} catch (error) {
		console.error('error on sqlite connection.')
	}
