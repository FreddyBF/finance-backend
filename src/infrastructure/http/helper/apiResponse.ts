type PaginationMeta = {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
};

type ValidationIssue = {
    path: string;
    message: string;
};

export class ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
    errors?: ValidationIssue[];
    pagination?: PaginationMeta;

    private constructor(
        success: boolean,
        message: string,
        data?: T,
        error?: string,
        errors?: ValidationIssue[],
        pagination?: PaginationMeta
    ) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.error = error;
        this.errors = errors;
        this.pagination = pagination;
    }

    static ok<T>(data: T, message = 'Success', pagination?: PaginationMeta): ApiResponse<T> {
        return new ApiResponse(true, message, data, undefined, undefined, pagination);
    }

    static fail<T>(error: string, message = 'Error', errors?: ValidationIssue[]): ApiResponse<T> {
        return new ApiResponse(false, message, undefined, error, errors);
    }
}
