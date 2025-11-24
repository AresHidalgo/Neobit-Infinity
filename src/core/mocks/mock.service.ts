import { ApiResponse, PaginatedResponse } from '@/types/api.types';
import { mockConfig } from '@/core/config/mock.config';

/**
 * Simulates network delay
 */
export const delay = (_ms: number = mockConfig.delay.min): Promise<void> => {
    const delayTime = Math.floor(Math.random() * (mockConfig.delay.max - mockConfig.delay.min) + mockConfig.delay.min);
    return new Promise((resolve) => setTimeout(resolve, delayTime));
};

/**
 * Creates a mock API response
 */
export function createMockResponse<T>(
    data: T,
    meta?: PaginatedResponse<T[]>['meta'],
): ApiResponse<T> | PaginatedResponse<T[]> {
    if (meta && Array.isArray(data)) {
        return {
            success: true,
            data: data as T[],
            meta,
        } as PaginatedResponse<T[]>;
    }

    return {
        success: true,
        data,
    } as ApiResponse<T>;
}

/**
 * Creates a mock error response
 */
export function createMockError(code: string, message: string, statusCode: number = 400): never {
    throw {
        response: {
            status: statusCode,
            data: {
                success: false,
                error: {
                    code,
                    message,
                },
            },
        },
    };
}

/**
 * Simulates pagination
 */
export function paginate<T>(
    items: T[],
    page: number = 1,
    limit: number = 10,
): { data: T[]; meta: PaginatedResponse<T[]>['meta'] } {
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedItems = items.slice(start, end);
    const total = items.length;
    const totalPages = Math.ceil(total / limit);

    return {
        data: paginatedItems,
        meta: {
            page,
            limit,
            total,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        },
    };
}

/**
 * Filters items based on search query
 */
export function filterItems<T extends Record<string, any>>(
    items: T[],
    query?: string,
    filters?: Record<string, any>,
): T[] {
    let filtered = [...items];

    // Text search
    if (query) {
        const searchLower = query.toLowerCase();
        filtered = filtered.filter((item) => {
            return Object.values(item).some((value) => {
                if (typeof value === 'string') {
                    return value.toLowerCase().includes(searchLower);
                }
                return false;
            });
        });
    }

    // Apply filters
    if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
            if (value === undefined || value === null || value === '') {
                return;
            }

            filtered = filtered.filter((item) => {
                if (key === 'minPrice' && item.price !== undefined) {
                    return item.price >= value;
                }
                if (key === 'maxPrice' && item.price !== undefined) {
                    return item.price <= value;
                }
                if (key === 'category' && item.category !== undefined) {
                    return item.category === value || item.category?.toLowerCase() === value?.toLowerCase();
                }
                if (key === 'tags' && Array.isArray(value)) {
                    return value.some((tag: string) => item.tags?.includes(tag));
                }
                if (key === 'minRating' && item.rating !== undefined) {
                    return item.rating >= value;
                }
                if (key === 'inStock' && item.stock !== undefined) {
                    return value ? item.stock > 0 : true;
                }
                if (item[key] !== undefined) {
                    return item[key] === value || item[key]?.toString().toLowerCase() === value?.toString().toLowerCase();
                }
                return true;
            });
        });
    }

    return filtered;
}

/**
 * Sorts items
 */
export function sortItems<T extends Record<string, any>>(
    items: T[],
    sortBy?: string,
    order: 'asc' | 'desc' = 'desc',
): T[] {
    if (!sortBy) {
        return items;
    }

    const sorted = [...items].sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (aValue === undefined || bValue === undefined) {
            return 0;
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return order === 'asc' ? aValue - bValue : bValue - aValue;
        }

        const aStr = String(aValue).toLowerCase();
        const bStr = String(bValue).toLowerCase();

        if (order === 'asc') {
            return aStr.localeCompare(bStr);
        }

        return bStr.localeCompare(aStr);
    });

    return sorted;
}

