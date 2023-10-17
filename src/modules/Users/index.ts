// Dependencies
import { Elysia } from 'elysia'
// Modules
import controller from './user.controller'
import schemaTypes from './types/schema.type'

const routes = new Elysia({ prefix: '/users' })
	/* ---------------------------------- Rest ---------------------------------- */
	.all('/count', () => controller.count())
	.get('/pagination/:page/:limit', ({ params: { page, limit } }) => controller.pagination(page, limit), schemaTypes.pagination)
	.get('/', () => controller.findAll())
	.get('/:id', ({ params }) => controller.findOne(params.id), schemaTypes.id)
	.post('/', ({ body }) => controller.create(body), schemaTypes.create)
	.put('/', ({ body }) => controller.upsert(body), schemaTypes.upsert)
	.patch('/:id', ({ params, body }) => controller.update(body, params.id), schemaTypes.update)
	.delete('/:id', ({ params }) => controller.destroy(params.id), schemaTypes.id)
	/* ------------------------------- Web Socket ------------------------------- */
	.ws('/ws-create', {
		...schemaTypes.create,
		async message(ws, message) {
			ws.send(await controller.create(message))
		},
	})

export default routes
