// Bootstrap
import '#bootstrap'
// Dependencies
import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
// Modules
import routes from '#routes'
import meditation from '#meditation'

const app = new Elysia()
	// Swagger
	.use(
		swagger({
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
