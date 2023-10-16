// Modules
import meditation from '#meditation'
import { Databases } from '#src/types/general.enum'
import { sqlite, mysql, mariadb, postgres } from '#utils/index'
import { engine } from './engine'

const { sqlite: sqliteConfig, mysql: mysqlConfig, mariadb: mariadbConfig, postgres: postgresConfig } = meditation.config.database
const { active_databases } = meditation.config

// Exporters
export { engine }
export * from './User.model'

// sqlite
active_databases.includes(Databases.SQLITE) && (await sqlite.sync(sqliteConfig.sync))
// mysql
active_databases.includes(Databases.MYSQL) && (await mysql.sync(mysqlConfig.sync))
// mysql
active_databases.includes(Databases.MARIADB) && (await mariadb.sync(mariadbConfig.sync))
// postgres
active_databases.includes(Databases.POSTGRES) && (await postgres.sync(postgresConfig.sync))
