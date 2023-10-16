// Dependencies
import { DataTypes, Model } from 'sequelize'
// Modules
import { engine } from '#models/index'

class User extends Model {
	declare first_name: string
	declare last_name: string
}

User.init(
	{
		first_name: { type: DataTypes.STRING, defaultValue: '' },
		last_name: { type: DataTypes.STRING, defaultValue: '' },
	},
	{ sequelize: engine, timestamps: true, modelName: 'User', tableName: 'users', underscored: true, paranoid: true }
)

export { User }
