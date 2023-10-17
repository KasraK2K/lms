// Dependencies
import { t } from 'elysia'

const types = {
	id: {
		params: t.Object({
			id: t.Integer(),
		}),
		transform({ params }: { params: Record<'id', string | number> }) {
			const id = +params.id
			if (!isNaN(id)) params.id = id
		},
	},
	pagination: {
		params: t.Object({
			page: t.Integer(),
			limit: t.Integer(),
		}),
		transform({ params }: { params: Record<'page' | 'limit', string | number> }) {
			const page = +params.page
			const limit = +params.limit
			if (!isNaN(page)) params.page = page
			if (!isNaN(limit)) params.limit = limit
		},
	},
	create: {
		body: t.Object({
			first_name: t.Optional(t.String()),
			surname: t.Optional(t.String()),
			contact_number: t.String(),
			email: t.String(),
			password: t.String(),
			is_active: t.Boolean(),
		}),
	},
	upsert: {
		body: t.Object({
			id: t.Optional(t.Integer()),
			first_name: t.Optional(t.String()),
			surname: t.Optional(t.String()),
			contact_number: t.String(),
			email: t.String(),
			password: t.String(),
			is_active: t.Boolean(),
		}),
	},
	update: {
		body: t.Object({
			first_name: t.Optional(t.String()),
			surname: t.Optional(t.String()),
			contact_number: t.String(),
			email: t.String(),
			password: t.String(),
			is_active: t.Boolean(),
		}),
		params: t.Object({
			id: t.Integer(),
		}),
		transform({ params }: { params: Record<'id', string | number> }) {
			const id = +params.id
			if (!isNaN(id)) params.id = id
		},
	},
}

export default types
