// NOTE : This file is used to define default database and you can change it into meditation.config.ts

// Modules
import meditation from '#meditation'
import { Databases } from '#types/enums/general.enum'
import { sqlite, mysql, mariadb, postgres } from '#utils/index'

const databases = {
	[Databases.SQLITE]: sqlite,
	[Databases.MYSQL]: mysql,
	[Databases.MARIADB]: mariadb,
	[Databases.POSTGRES]: postgres,
}

export const defaultDatabase = databases[meditation.config.default_database]
