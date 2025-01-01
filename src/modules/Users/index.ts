// Dependencies
import { Elysia } from 'elysia'
// Modules
import service from './service'
import './interface'
import { CountDTO, CreateDTO, DeleteDTO, FindAllDTO, FindOneDTO, PaginationDTO, UpdateDTO, UpsertDTO } from './schema'

// prettier-ignore
const routes = new Elysia({prefix: '/users'})
	/* ---------------------------------- Rest ---------------------------------- */
	.get('/count',						() => service.count(),																CountDTO)
	.get('/pagination/:page/:limit',	({ params: { page, limit } }) => service.pagination(page, limit),					PaginationDTO)
	.get('/',							() => service.findAll(),															FindAllDTO)
	.get('/:id',						({ params }) => service.findOne(params.id),											FindOneDTO)
	.post('/',							({ body }) => service.create(body),													CreateDTO)
	.put('/',							({ body }) => service.upsert(body),													UpsertDTO)
	.patch('/:id',						({ params, body }) => service.update(body as IUserGuarded, params.id as number),	UpdateDTO)
	.delete('/:id',						({ params }) => service.destroy(params.id),											DeleteDTO)
	/* ------------------------------- Web Socket ------------------------------- */
	.ws('/ws/create', { ...CreateDTO, async message(ws, message) { ws.send(await service.create(message)) }})

export default routes
