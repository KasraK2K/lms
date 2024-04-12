// Dependencies
import { Prisma } from '@prisma/client'
// Modules
import Repository from '#base/Repository'
import db from '#db'
import { IPagination } from '#types/interfaces'
import User from './entity'
import { IUser, IUserFillable, IUserGuarded } from './interface'

class UserRepository extends Repository {
	public async count() {
		return await db.user.count()
	}

	public async pagination(page: number, limit: number): Promise<IPagination<IUser>> {
		const users = await db.user.findMany({ skip: (page - 1) * limit, take: limit })
		const count = users.length
		let total_pages = Math.floor(count / limit)
		if (count % limit > 0) total_pages += 1
		return {
			list: users,
			count,
			page,
			total_pages,
		}
	}

	public async findAll(): Promise<IUser[]> {
		return await db.user.findMany({ where: { archived_at: null } })
	}

	public async findOne(id: number): Promise<IUser | null> {
		return await db.user.findUnique({ where: { id, archived_at: null } })
	}

	public async create(args: IUserFillable): Promise<IUser> {
		try {
			return await db.user.create({ data: args })
		} catch (err) {
			if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
				const error = new Error('Record already exist')
				error.name = 'Database'
				throw error
			}
			throw err
		}
	}

	public async update(values: IUserGuarded, id: number): Promise<IUser> {
		try {
			return await db.user.update({ where: { id }, data: values, select: new User().exclude(['password']) })
		} catch (err) {
			if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
				const error = new Error('Record not found for update')
				error.name = 'Database'
				throw error
			}
			throw err
		}
	}

	public async destroy(id: number): Promise<IUser> {
		try {
			return await db.user.update({
				where: { id, archived_at: null },
				data: { archived_at: new Date() },
				select: new User().exclude(['password']),
			})
		} catch (err) {
			if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
				const error = new Error('Record not found for delete')
				error.name = 'Database'
				throw error
			}
			throw err
		}
	}
}

export default new UserRepository()
