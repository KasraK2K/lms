// Dependencies
// Modules
import Service from '#base/Service'
import { IPagination } from '#src/types/interfaces'
import { hashGenerator } from '#src/utils'
import { IUser, IUserFillable, IUserGuarded } from './interface'
import repository from './repository'

class UserService extends Service {
	public async count(): Promise<number> {
		return repository.count()
	}

	public async pagination(page: number, limit: number): Promise<IPagination<IUser>> {
		return repository.pagination(page, limit)
	}

	public async findAll(): Promise<IUser[]> {
		return repository.findAll()
	}

	public async findOne(id: number): Promise<IUser | null> {
		return repository.findOne(id)
	}

	public async create(values: IUserFillable): Promise<IUser> {
		values.password = await hashGenerator(values.password)
		return repository.create(values)
	}

	public async update(values: IUserGuarded, id: number): Promise<IUser> {
		if ('password' in values) values.password = await hashGenerator(values.password)
		return await repository.update(values, id)
	}

	public async upsert(args: IUserFillable): Promise<IUser> {
		return await repository.upsert(args)
	}

	public async destroy(id: number): Promise<IUser> {
		return repository.destroy(id)
	}
}

export default new UserService()
