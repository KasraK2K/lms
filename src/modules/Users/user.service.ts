// Dependencies
// Modules
import Service from '#base/Service'
// import { User } from '#models/index'
import repository from './user.repository'

class UserService extends Service {
	count(): Promise<number> {
		return repository.count()
	}

	// pagination(page: number, limit: number): Promise<IPagination<User>> {
	// 	return repository.pagination(page, limit)
	// }

	// findAll(): Promise<User[]> {
	// 	return repository.findAll()
	// }

	// findOne(id: number): Promise<User | null> {
	// 	return repository.findOne(id)
	// }

	// async create(values: IUserFillable): Promise<User> {
	// 	values.password = await hashGenerator(values.password)
	// 	return repository.create(values)
	// }

	// async update(values: IUserGuarded, id: number): Promise<[affectedCount: number]> {
	// 	if ('password' in values) values.password = await hashGenerator(values.password)
	// 	return repository.update(values, id)
	// }

	// async upsert(values: IUserFillable & { id?: number }): Promise<User | null> {
	// 	const { id } = values
	// 	if ('password' in values) values.password = await hashGenerator(values.password)
	// 	values = _.omit(values, ['id'])
	// 	if (id) {
	// 		repository.update(values, id)
	// 		return repository.findOne(id)
	// 	} else return repository.create(values)
	// }

	// destroy(id: number): Promise<number> {
	// 	return repository.destroy(id)
	// }
}

export default new UserService()
