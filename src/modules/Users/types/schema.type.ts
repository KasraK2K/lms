// Dependencies
import { t } from 'elysia'

const types = {
	health: {
		body: t.Object({ id: t.Number() }),
	},
	insert: {
		body: t.Object({
			first_name: t.Optional(t.String({ error: 'first_name is required' })),
			surname: t.Optional(t.String()),
			contact_number: t.String(),
			email: t.String(),
			password: t.String(),
			is_active: t.Boolean(),
		}),
	},
}

export default types
