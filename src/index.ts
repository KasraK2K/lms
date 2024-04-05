// Bootstrap
import '#bootstrap'
// Dependencies
import { swagger } from '@elysiajs/swagger'
import { Elysia } from 'elysia'
// Modules
import meditation from '#meditation'
import routes from '#routes'

const app = new Elysia({ prefix: '/api' })
	// Swagger
	.use(
		swagger({
			path: '/swagger',
			documentation: {
				info: { title: 'Meditation Documentation', version: '1.0.0' },
				tags: [{ name: 'User', description: 'User endpoints' }],
			},
		})
	)
	// Routes
	.onAfterHandle((context) => {
		context.response = { result: context.response }
	})
	.use(routes)
	.listen(meditation.port)

console.log(`🍀 Meditation is running at ${app.server?.hostname}:${app.server?.port}`)
