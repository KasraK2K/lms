// Dependencies
import { Elysia } from 'elysia'
// Modules
import { CountDTO, CreateDTO, DeleteDTO, FindAllDTO, FindOneDTO, PaginationDTO, UpdateDTO, UpsertDTO } from './types/schema.type'
import controller from './user.controller'

// prettier-ignore
const routes = new Elysia({prefix: '/users'})
	/* ---------------------------------- Rest ---------------------------------- */
	.get('/count',						() => controller.count(),												CountDTO)
	.get('/pagination/:page/:limit',	({ params: { page, limit } }) => controller.pagination(page, limit),	PaginationDTO)
	.get('/',							() => controller.findAll(),												FindAllDTO)
	.get('/:id',						({ params }) => controller.findOne(params.id),							FindOneDTO)
	.post('/',							({ body }) => controller.create(body),									CreateDTO)
	.put('/',							({ body }) => controller.upsert(body),									UpsertDTO)
	.patch('/:id',						({ params, body }) => controller.update(body, params.id),				UpdateDTO)
	.delete('/:id',						({ params }) => controller.destroy(params.id),							DeleteDTO)
	/* ------------------------------- Web Socket ------------------------------- */
	.ws('/ws-create', { ...CreateDTO, async message(ws, message) { ws.send(await controller.create(message)) }})

export default routes
