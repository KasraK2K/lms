// Dependencies
import { FieldPacket, QueryError } from 'mysql2'
import _ from 'lodash'
// Modules
import Repository from '#base/Repository'
import { mysql } from '#src/utils'
import { IUser, IUserFindArgs, IUserGuarded } from './types/user.interface'

class UserRepository extends Repository {
	private tableName: string = 'users'

	health(args: IUserFindArgs) {
		return args
	}

	findAll(): Promise<IUser[]> {
		return new Promise((resolve, reject) => {
			mysql.execute(/* SQL */ `SELECT * FROM ${this.tableName}`, (err: QueryError | null, results: IUser[], _fields: FieldPacket[]) => {
				if (err) reject(err)
				else resolve(results)
			})
		})
	}

	insert(args: IUserGuarded) {
		return new Promise((resolve, reject) => {
			let query = `INSERT INTO ${this.tableName} (`
			const actions: string[] = []
			const values: any[] = []

			for (const key in args) {
				actions.push(key)
				values.push((args as any)[key])
			}

			actions.push('verify_token')
			values.push('fake_verify_token')

			query += actions.join(', ')
			query += `) VALUES (${Array(values.length).fill('?').join(', ')})`

			mysql.execute<any>(query, values, (err: QueryError | null, result: any, _fields: FieldPacket[]) => {
				if (err) reject(err)
				else resolve(result)
			})
		})
	}
}

export default new UserRepository()
