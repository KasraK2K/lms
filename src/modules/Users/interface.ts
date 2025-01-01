declare global {
	export interface IUser {
		id: number
		first_name?: string
		surname?: string
		contact_number: string

		email: string
		password: string
		last_token: string
		verify_token: string

		role: number

		is_active: boolean
		is_verify: boolean
		is_archive: boolean
		is_block: boolean

		created_at: Date
		updated_at: Date
		archived_at: Date | null
		last_login_at: Date | null
	}

	export type IUserFillable = Pick<IUser, 'first_name' | 'surname' | 'contact_number' | 'email' | 'password' | 'is_active'>

	export type IUserGuarded = Omit<
		IUser,
		'id' | 'last_token' | 'verify_token' | 'role' | 'is_verify' | 'is_archive' | 'is_block' | 'created_at' | 'updated_at' | 'archived_at'
	>

	// export type IUserFindArgs = { email: string } | { id: number }

	export type IUserSelectFields =
		| 'id'
		| 'first_name'
		| 'surname'
		| 'contact_number'
		| 'email'
		| 'password'
		| 'last_token'
		| 'verify_token'
		| 'role'
		| 'is_active'
		| 'is_verify'
		| 'is_archive'
		| 'is_block'
		| 'created_at'
		| 'updated_at'
		| 'archived_at'
		| 'last_login_at'
}

export {}
