// Dependencies
import { t } from 'elysia'
import { SwaggerTags } from '#types/enums/general.enum'

export const UserDTO = t.Object({
	id: t.Optional(t.Integer()),
	first_name: t.Optional(t.String()),
	surname: t.Optional(t.String()),
	contact_number: t.Optional(t.String()),
	email: t.Optional(t.String()),
	password: t.Optional(t.String()),
	role: t.Optional(t.Integer()),
	is_active: t.Optional(t.Boolean()),
	is_verify: t.Optional(t.Boolean()),
	is_archive: t.Optional(t.Boolean()),
	is_block: t.Optional(t.Boolean()),
	last_login_at: t.Optional(t.Nullable(t.String())),
	createdAt: t.Optional(t.Date()),
	updatedAt: t.Optional(t.Date()),
	archivedAt: t.Optional(t.Nullable(t.String())),
})

export const CountDTO = {
	detail: {
		summary: 'Number of user rows',
		tags: [SwaggerTags.USER],
		description: 'Number of rows in the user table using a raw query',
	},
}

export const PaginationDTO = {
	params: t.Object({ page: t.Integer(), limit: t.Integer() }),
	transform({ params }: { params: Record<'page' | 'limit', string | number> }) {
		const page = +params.page
		const limit = +params.limit
		if (!isNaN(page)) params.page = page
		if (!isNaN(limit)) params.limit = limit
	},
	detail: {
		summary: 'Find all users with pagination',
		tags: [SwaggerTags.USER],
		description: 'Find all users with pagination',
	},
}

export const FindAllDTO = {
	detail: {
		summary: 'Find all users',
		tags: [SwaggerTags.USER],
		description: 'Find all users',
	},
}

export const FindOneDTO = {
	params: t.Object({ id: t.Integer() }),
	transform({ params }: { params: Record<'id', string | number> }) {
		const id = +params.id
		if (!isNaN(id)) params.id = id
	},
	detail: {
		summary: 'Find user by ID',
		tags: [SwaggerTags.USER],
		description: 'Find user by ID',
	},
}

export const CreateDTO = {
	body: t.Object({
		first_name: t.Optional(t.String()),
		surname: t.Optional(t.String()),
		contact_number: t.String(),
		email: t.String(),
		password: t.String(),
		is_active: t.Boolean(),
	}),
	detail: {
		summary: 'Create new user',
		tags: [SwaggerTags.USER],
		description: 'Create new user',
	},
}

export const UpsertDTO = {
	body: t.Object({
		id: t.Optional(t.Integer()),
		first_name: t.Optional(t.String()),
		surname: t.Optional(t.String()),
		contact_number: t.String(),
		email: t.String(),
		password: t.String(),
		is_active: t.Boolean(),
	}),
	detail: {
		summary: 'Upsert user',
		tags: [SwaggerTags.USER],
		description: "Upsert user has to update user if it has an ID or create a user if it doesn't have any ID",
	},
}

export const UpdateDTO = {
	body: t.Object({
		first_name: t.Optional(t.String()),
		surname: t.Optional(t.String()),
		contact_number: t.String(),
		email: t.String(),
		password: t.String(),
		is_active: t.Boolean(),
	}),
	params: t.Object({ id: t.Integer() }),
	transform({ params }: { params: Record<'id', string | number> }) {
		const id = +params.id
		if (!isNaN(id)) params.id = id
	},
	detail: {
		summary: "Update user founded by it's ID",
		tags: [SwaggerTags.USER],
		description: "Update user founded by it's ID",
	},
}

export const DeleteDTO = {
	params: t.Object({ id: t.Integer() }),
	transform({ params }: { params: Record<'id', string | number> }) {
		const id = +params.id
		if (!isNaN(id)) params.id = id
	},
	detail: {
		summary: 'Delete user by ID',
		tags: [SwaggerTags.USER],
		description: 'Delete user by ID',
	},
}
