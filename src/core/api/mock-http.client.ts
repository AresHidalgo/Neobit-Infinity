import { AxiosRequestConfig } from 'axios';
import { ApiResponse, PaginatedResponse } from '@/types/api.types';
import { delay } from '@/core/mocks/mock.service';
import { mockDataService } from '@/core/mocks/mock-data.service';

class MockHttpClient {
    async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T> | PaginatedResponse<T[]>> {
        await delay();
        return mockDataService.handleGet<T>(url, config) as unknown as ApiResponse<T> | PaginatedResponse<T[]>;
    }

    async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T> | PaginatedResponse<T[]>> {
        await delay();
        return mockDataService.handlePost<T>(url, data, config) as unknown as ApiResponse<T> | PaginatedResponse<T[]>;
    }

    async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T> | PaginatedResponse<T[]>> {
        await delay();
        return mockDataService.handlePut<T>(url, data, config) as unknown as ApiResponse<T> | PaginatedResponse<T[]>;
    }

    async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T> | PaginatedResponse<T[]>> {
        await delay();
        return mockDataService.handlePatch<T>(url, data, config) as unknown as ApiResponse<T> | PaginatedResponse<T[]>;
    }

    async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T> | PaginatedResponse<T[]>> {
        await delay();
        return mockDataService.handleDelete<T>(url, config) as unknown as ApiResponse<T> | PaginatedResponse<T[]>;
    }
}

export const mockHttpClient = new MockHttpClient();

