// Dependencies
import { Elysia } from 'elysia'
// Modules
import controller from './user.controller'
import schemaTypes from './types/schema.type'

const routes = new Elysia({ prefix: '/users' })
	.all('/count', () => controller.count())
	.get('/', () => controller.findAll())
	.get('/:id', ({ params }) => controller.findOne(params.id), schemaTypes.id)
	.post('/', ({ body }) => controller.create(body), schemaTypes.create)
	.put('/', ({ body }) => controller.upsert(body), schemaTypes.upsert)
	.patch('/:id', ({ params, body }) => controller.update(body, params.id), schemaTypes.update)
	.delete('/:id', ({ params }) => controller.destroy(params.id), schemaTypes.id)

export default routes
