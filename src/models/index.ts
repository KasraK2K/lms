// Modules
import meditation from '#meditation'
import { sqlite, mysql, mariadb, postgres } from '#utils/index'

const { sqlite: sqliteConfig, mysql: mysqlConfig, mariadb: mariadbConfig, postgres: postgresConfig } = meditation.config.database
const { active_databases } = meditation.config

// Exporters
export * from './User.model'

// sqlite
active_databases.includes('sqlite') && (await sqlite.sync(sqliteConfig.sync))
// mysql
active_databases.includes('mysql') && (await mysql.sync(mysqlConfig.sync))
// mysql
active_databases.includes('mariadb') && (await mariadb.sync(mariadbConfig.sync))
// postgres
active_databases.includes('postgres') && (await postgres.sync(postgresConfig.sync))
