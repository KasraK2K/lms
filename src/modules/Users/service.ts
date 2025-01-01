// Dependencies
// Modules
import Service from '#base/Service'
import { hashGenerator } from '#src/utils'
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

	public async create(args: IUserFillable): Promise<IUser> {
		args.password = await hashGenerator(args.password)
		args.email = args.email.toLowerCase().trim()
		return repository.create(args)
	}

	public async update(args: IUserGuarded, id: number): Promise<IUser> {
		if ('password' in args) args.password = await hashGenerator(args.password)
		if ('email' in args) args.email = args.email.toLowerCase().trim()
		return await repository.update(args, id)
	}

	public async upsert(args: IUserFillable): Promise<IUser> {
		if ('email' in args) args.email = args.email.toLowerCase().trim()
		return await repository.upsert(args)
	}

	public async destroy(id: number): Promise<IUser> {
		return repository.destroy(id)
	}
}

export default new UserService()
