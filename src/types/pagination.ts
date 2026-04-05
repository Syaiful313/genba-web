export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PageableResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface PaginationQueries {
  take?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: string;
}
