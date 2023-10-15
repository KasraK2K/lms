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

	created_at: string
	updated_at: string
	archived_at?: string
	last_login_at?: string
}

export interface IUserFindByEmail {
	email: string
}

export interface IUserFindById {
	id: number
}

export type IUserFindArgs = IUserFindByEmail | IUserFindById

export type IOmittedUser = Omit<IUser, 'password' | 'last_token' | 'verify_token'>

export type IUserGuarded = Pick<IUser, 'first_name' | 'surname' | 'contact_number' | 'email' | 'password' | 'is_active'>
