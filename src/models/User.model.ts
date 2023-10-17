// Dependencies
import { DataTypes, Model } from 'sequelize'
// Modules
import { engine } from '#models/index'

class User extends Model {
	declare first_name: string
	declare surname: string
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
		sequelize: engine,
		timestamps: true,
		underscored: true,
		paranoid: true,
		modelName: 'User',
		tableName: 'users',
		deletedAt: 'archiveAt',
	}
)

export { User }
