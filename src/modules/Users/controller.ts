// Modules
import Controller from '#base/Controller'
import logger from '#logger'
import { IPagination } from '#src/types/interfaces'
import { IUser, IUserFillable, IUserGuarded } from './interface'
import service from './service'

class UserController extends Controller {
	public count(): Promise<number> {
		logger('controller', { module: 'user', file: 'controller.ts', method: 'count', additional: { count: 12 } })
		return service.count()
	}

	public pagination(page: number, limit: number): Promise<IPagination<IUser>> {
		return service.pagination(page, limit)
	}

	public findAll(): Promise<IUser[]> {
		return service.findAll()
	}

	public findOne(id: number): Promise<IUser | null> {
		return service.findOne(id)
	}

	public create(values: IUserFillable): Promise<IUser> {
		return service.create(values)
	}

	public update(values: IUserGuarded, id: number): Promise<IUser> {
		return service.update(values, id)
	}

	public upsert(args: IUserFillable): Promise<IUser> {
		return service.upsert(args)
	}

	public destroy(id: number): Promise<IUser> {
		return service.destroy(id)
	}
}

export default new UserController()
