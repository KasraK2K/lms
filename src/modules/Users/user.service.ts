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

	pagination(page: number, limit: number): Promise<IPagination<User>> {
		return repository.pagination(page, limit)
	}

	findAll(): Promise<User[]> {
		return repository.findAll()
	}

	findOne(id: number): Promise<User | null> {
		return repository.findOne(id)
	}

	create(values: IUserFillable): Promise<User> {
		return repository.create(values)
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
		} else return repository.create(values)
	}

	destroy(id: number): Promise<number> {
		return repository.destroy(id)
	}
}

export default new UserService()
