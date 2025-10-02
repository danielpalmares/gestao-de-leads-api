export interface Pagination {
  page: number
  limit: number
  total: number
  total_pages: number
}

export interface Collection<T> {
  items: T[]
  pagination: Pagination
}
