// Modules
import { IUserSelectFields } from './interface'

class User {
	exclude(excludeFields: IUserSelectFields[]) {
		const fields = {
			id: true,
			first_name: true,
			surname: true,
			contact_number: true,
			email: true,
			password: true,
			last_token: true,
			verify_token: true,
			role: true,
			is_active: true,
			is_verify: true,
			is_archive: true,
			is_block: true,
			created_at: true,
			updated_at: true,
			archived_at: true,
			last_login_at: true,
		}

		for (const field of excludeFields) fields[field] = false

		return fields
	}
}

export default User
