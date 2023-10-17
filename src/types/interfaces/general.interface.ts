export interface IPagination<T> {
	rows: T[]
	count: number
	page: number
	total_pages: number
}
