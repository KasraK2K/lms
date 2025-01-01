// Bootstrap
import '#bootstrap'
// Dependencies
import { swagger } from '@elysiajs/swagger'
import { Elysia } from 'elysia'
// Modules
import db from '#db'
import meditation from '#meditation'
import routes from '#routes'

if (!db) console.log('DB not found')
else if (!db.user) console.log('DB.USER not found')
else if (!db.user.findFirst) console.log('DB.USER.Find_First not found')

const app = new Elysia()
	// Swagger
	.use(
		swagger({
			path: '/swagger',
			documentation: {
				info: { title: 'LMS Documentation', version: '1.0.0' },
				tags: [{ name: 'User', description: 'User endpoints' }],
			},
		})
	)
	// Routes
	.get('/health', async () => await db.$executeRaw`SELECT 1`)
	.use(routes)
	.listen(meditation.port)

console.log(`🍀 Meditation is running at http://${app.server?.hostname}:${app.server?.port}`)
