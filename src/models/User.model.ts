// Dependencies
import { DataTypes, Model } from 'sequelize'
// Modules
import { defaultDatabase } from '#models/index'

class User extends Model {
	declare id: number
	declare first_name: string
	declare surname: string
	declare contact_number: string
	declare email: string
	declare password: string
	declare role: number
	declare is_active: number
	declare is_verify: number
	declare is_archive: number
	declare is_block: number
	declare last_login_at: number
	declare createdAt: Date
	declare updatedAt: Date
	declare archiveAt: Date
}

// prettier-ignore
User.init(
	{
		id:				{ type: DataTypes.INTEGER,	autoIncrement: true,	primaryKey: true },
		first_name:		{ type: DataTypes.STRING,	defaultValue: '' },
		surname:		{ type: DataTypes.STRING,	defaultValue: '' },
		contact_number:	{ type: DataTypes.STRING,	defaultValue: '' },

		email:			{ type: DataTypes.STRING,	allowNull: false },
		password:		{ type: DataTypes.STRING,	allowNull: false },

		role:			{ type: DataTypes.INTEGER,	defaultValue: 1 },

		is_active:		{ type: DataTypes.BOOLEAN,	defaultValue: true },
		is_verify:		{ type: DataTypes.BOOLEAN,	defaultValue: false },
		is_archive:		{ type: DataTypes.BOOLEAN,	defaultValue: false },
		is_block:		{ type: DataTypes.BOOLEAN,	defaultValue: false },

		last_login_at: { type: DataTypes.DATE },
	},
	{
		sequelize: defaultDatabase,
		timestamps: true,
		underscored: true,
		paranoid: true,
		modelName: 'User',
		tableName: 'users',
		deletedAt: 'archiveAt',
	}
)

export { User }
