// Modules
import Controller from '#base/Controller'
import { User } from '#models/index'
import { IPagination } from '#types/interfaces'
import { IUserFillable, IUserGuarded } from './types/user.interface'
import service from './user.service'

class UserController extends Controller {
	async count() {
		return await service.count()
	}

	async pagination(page: number, limit: number): Promise<IPagination<User>> {
		return service.pagination(page, limit)
	}

	findAll(): Promise<User[]> {
		return service.findAll()
	}

	findOne(id: number): Promise<User | null> {
		return service.findOne(id)
	}

	create(values: IUserFillable): Promise<User> {
		return service.create(values)
	}

	update(values: IUserGuarded, id: number): Promise<[affectedCount: number]> {
		return service.update(values, id)
	}

	upsert(values: IUserFillable & { id?: number }): Promise<User | null> {
		return service.upsert(values)
	}

	destroy(id: number): Promise<number> {
		return service.destroy(id)
	}
}

export default new UserController()
