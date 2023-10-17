// Dependencies
import _ from 'lodash'
// Modules
import Service from '#base/Service'
import { User } from '#models/index'
import { IPagination } from '#types/interfaces'
import repository from './user.repository'
import { IUserFillable, IUserGuarded } from './types/user.interface'

class UserService extends Service {
	count() {
		return repository.count()
	}

	async pagination(page: number, limit: number): Promise<IPagination<User>> {
		return repository.pagination(page, limit)
	}

	findAll(): Promise<User[]> {
		return repository.findAll()
	}

	findOne(id: number): Promise<User | null> {
		return repository.findOne(id)
	}

	create(values: IUserFillable): Promise<User> {
		const newValues: IUserFillable & { last_token: string; verify_token: string } = {
			...values,
			last_token: 'last-token',
			verify_token: 'verify-token',
		}
		return repository.create(newValues)
	}

	update(values: IUserGuarded, id: number): Promise<[affectedCount: number]> {
		return repository.update(values, id)
	}

	upsert(values: IUserFillable & { id?: number }): Promise<User | null> {
		const { id } = values
		values = _.omit(values, ['id'])
		if (id) {
			repository.update(values, id)
			return repository.findOne(id)
		} else return repository.create({ ...values, last_token: 'last-token', verify_token: 'verify-token' })
	}

	destroy(id: number): Promise<number> {
		return repository.destroy(id)
	}
}

export default new UserService()
