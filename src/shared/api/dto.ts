export interface PaginationDto<T> {
    data: T[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    }
}