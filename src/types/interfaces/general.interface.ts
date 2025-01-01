declare global {
	export interface IPagination<T> {
		list: T[]
		count: number
		page: number
		total_pages: number
	}
}

export {}
