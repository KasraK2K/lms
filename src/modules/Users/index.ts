// Dependencies
import { Elysia } from 'elysia'
// Modules
import controller from './user.controller'
import schemaTypes from './types/schema.type'

const routes = new Elysia({ prefix: '/users' })
	// health
	.post('/health', ({ body }) => controller.health(body), schemaTypes.health)
	.get('/find-all', () => controller.findAll())
	.post('/insert', ({ body }) => controller.insert(body), schemaTypes.insert)

export default routes
