// Dependencies
import { Elysia } from 'elysia'
// Modules
import controller from './controller'
import { IUserGuarded } from './interface'
import { CountDTO, CreateDTO, DeleteDTO, FindAllDTO, FindOneDTO, PaginationDTO, UpdateDTO } from './schema'

// prettier-ignore
const routes = new Elysia({prefix: '/users'})
	/* ---------------------------------- Rest ---------------------------------- */
	.get('/count',						() => controller.count(),															CountDTO)
	.get('/pagination/:page/:limit',	({ params: { page, limit } }) => controller.pagination(page, limit),				PaginationDTO)
	.get('/',							() => controller.findAll(),															FindAllDTO)
	.get('/:id',						({ params }) => controller.findOne(params.id),										FindOneDTO)
	.post('/',							({ body }) => controller.create(body),												CreateDTO)
	// .put('/',							({ body }) => controller.upsert(body),												UpsertDTO)
	.patch('/:id',						({ params, body }) => controller.update(body as IUserGuarded, params.id as number),	UpdateDTO)
	.delete('/:id',						({ params }) => controller.destroy(params.id),										DeleteDTO)
	/* ------------------------------- Web Socket ------------------------------- */
	.ws('/ws/create', { ...CreateDTO, async message(ws, message) { ws.send(await controller.create(message)) }})

export default routes
