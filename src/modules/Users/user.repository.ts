// Dependencies
import _ from 'lodash'
// Modules
import Repository from '#base/Repository'
import { User, engine } from '#models/index'
import { IPagination } from '#types/interfaces'
import { IUserFillable, IUserGuarded } from './types/user.interface'

class UserRepository extends Repository {
	private tableName = User.tableName

	async count() {
		const [result, _metadata] = (await engine.query(`SELECT COUNT(*) AS count from ${this.tableName}`)) as [[{ count: number }], unknown]
		return result[0].count
	}

	async pagination(page: number, limit: number): Promise<IPagination<User>> {
		const { rows, count } = await User.findAndCountAll({ offset: (page - 1) * limit, limit })
		let total_pages = Math.floor(count / limit)
		if (count % limit > 0) total_pages += 1
		return {
			rows,
			count,
			page,
			total_pages,
		}
	}

	async findAll(): Promise<User[]> {
		return await User.findAll()
	}

	async findOne(id: number): Promise<User | null> {
		return await User.findByPk(id)
	}

	async create(args: IUserFillable & { last_token: string; verify_token: string }): Promise<User> {
		return await User.create(args)
	}

	async update(values: IUserGuarded, id: number): Promise<[affectedCount: number]> {
		return await User.update(values, { where: { id } })
	}

	async destroy(id: number): Promise<number> {
		return await User.destroy({ where: { id }, force: false })
	}
}

export default new UserRepository()
