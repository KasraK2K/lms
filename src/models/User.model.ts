// Dependencies
import { DataTypes, Model } from 'sequelize'
// Modules
import { mysql } from '#utils/index'

class User extends Model {
	declare first_name: string
	declare last_name: string
}

User.init(
	{
		first_name: { type: DataTypes.STRING, defaultValue: '' },
		last_name: { type: DataTypes.STRING, defaultValue: '' },
		archivedAt: { type: DataTypes.DATE },
	},
	{ sequelize: mysql, timestamps: true, modelName: 'User', tableName: 'users' }
)

export { User }
