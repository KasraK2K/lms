import { Elysia } from 'elysia'
import userRoutes from '../modules/Users'

const routes = new Elysia({ prefix: '/v1' }).use(userRoutes)

export default routes
