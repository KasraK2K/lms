// Dependencies
import { Prisma } from '@prisma/client'
// Modules
import Repository from '#base/Repository'
import db from '#db'
import logger from '#logger'
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
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
				const err = new Error('Record already exist')
				err.name = 'Database'
				throw err
			}
			logger('repository', { module: 'user', method: 'create', error })
			throw error
		}
	}

	public async update(values: IUserGuarded, id: number): Promise<IUser> {
		try {
			return await db.user.update({ where: { id }, data: values, select: new User().exclude(['password']) })
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
				const err = new Error('Record not found for update')
				err.name = 'Database'
				throw err
			}
			logger('repository', { module: 'user', method: 'update', error })
			throw error
		}
	}

	public async upsert(args: IUserFillable): Promise<IUser> {
		return db.user.upsert({ where: { email: args.email }, update: args, create: args })
	}

	public async destroy(id: number): Promise<IUser> {
		try {
			return await db.user.update({
				where: { id, archived_at: null },
				data: { archived_at: new Date() },
				select: new User().exclude(['password']),
			})
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
				const err = new Error('Record not found for delete')
				err.name = 'Database'
				throw err
			}
			logger('repository', { module: 'user', method: 'destroy', error })
			throw error
		}
	}
}

export default new UserRepository()
