import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { apiConfig, getApiUrl } from '@/config/api.config';
import { ApiException } from './api.error';
import { ApiResponse } from '@/types/api.types';
import { useMocks } from '@/core/config/mock.config';
import { mockHttpClient } from './mock-http.client';

class HttpClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: getApiUrl(),
      timeout: apiConfig.timeout,
      headers: apiConfig.headers,
      withCredentials: true,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor - Add auth token
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = this.getAuthToken();

        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add correlation ID for request tracking
        if (config.headers) {
          config.headers['X-Correlation-ID'] = this.generateCorrelationId();
        }

        // Log request in development
        if (import.meta.env.DEV) {
          console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
            params: config.params,
            data: config.data,
          });
        }

        return config;
      },
      (error) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
      },
    );

    // Response interceptor - Handle errors and transform responses
    this.client.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        // Log response in development
        if (import.meta.env.DEV) {
          console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
            status: response.status,
            data: response.data,
          });
        }

        // Transform response to match ApiResponse interface
        if (response.data?.success !== undefined) {
          return response;
        }

        // If response is not in ApiResponse format, wrap it
        return {
          ...response,
          data: {
            success: true,
            data: response.data,
          },
        };
      },
      async (error) => {
        // Handle axios errors
        if (error.response) {
          // Server responded with error status
          const apiError = ApiException.fromAxiosError(error);

          // Handle 401 Unauthorized - Clear auth and redirect to login
          if (error.response.status === 401) {
            this.handleUnauthorized();
          }

          return Promise.reject(apiError);
        } else if (error.request) {
          // Request made but no response received (network error)
          // The fallback to mocks is handled in the individual methods (get, post, etc.)
          const networkError = ApiException.fromNetworkError(error);
          return Promise.reject(networkError);
        } else {
          // Error setting up request
          return Promise.reject(
            new ApiException({
              code: 'REQUEST_ERROR',
              message: error.message || 'An error occurred',
            }),
          );
        }
      },
    );
  }

  private getAuthToken(): string | null {
    // Get token from localStorage or Zustand store
    try {
      const authData = localStorage.getItem('auth-storage');
      if (authData) {
        const parsed = JSON.parse(authData);
        return parsed?.state?.token || null;
      }
    } catch (e) {
      console.error('Error getting auth token:', e);
    }
    return null;
  }

  private handleUnauthorized(): void {
    // Clear auth storage
    localStorage.removeItem('auth-storage');

    // Redirect to login if not already there
    if (window.location.pathname !== '/auth/login') {
      window.location.href = '/auth/login';
    }
  }

  private generateCorrelationId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    // Use mock client if mocks are enabled
    if (useMocks()) {
      return mockHttpClient.get<T>(url, config) as Promise<ApiResponse<T>>;
    }

    try {
      const response = await this.client.get<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error: any) {
      // If network error and mocks are enabled, fallback to mocks
      if (error.request && useMocks()) {
        console.warn('[API] Backend unavailable, using mock data for:', url);
        return mockHttpClient.get<T>(url, config) as Promise<ApiResponse<T>>;
      }
      throw error;
    }
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    // Use mock client if mocks are enabled
    if (useMocks()) {
      return mockHttpClient.post<T>(url, data, config) as Promise<ApiResponse<T>>;
    }

    try {
      const response = await this.client.post<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error: any) {
      // If network error and mocks are enabled, fallback to mocks
      if (error.request && useMocks()) {
        console.warn('[API] Backend unavailable, using mock data for:', url);
        return mockHttpClient.post<T>(url, data, config) as Promise<ApiResponse<T>>;
      }
      throw error;
    }
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    // Use mock client if mocks are enabled
    if (useMocks()) {
      return mockHttpClient.put<T>(url, data, config) as Promise<ApiResponse<T>>;
    }

    try {
      const response = await this.client.put<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error: any) {
      if (error.request && useMocks()) {
        console.warn('[API] Backend unavailable, using mock data for:', url);
        return mockHttpClient.put<T>(url, data, config) as Promise<ApiResponse<T>>;
      }
      throw error;
    }
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    // Use mock client if mocks are enabled
    if (useMocks()) {
      return mockHttpClient.patch<T>(url, data, config) as Promise<ApiResponse<T>>;
    }

    try {
      const response = await this.client.patch<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error: any) {
      if (error.request && useMocks()) {
        console.warn('[API] Backend unavailable, using mock data for:', url);
        return mockHttpClient.patch<T>(url, data, config) as Promise<ApiResponse<T>>;
      }
      throw error;
    }
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    // Use mock client if mocks are enabled
    if (useMocks()) {
      return mockHttpClient.delete<T>(url, config) as Promise<ApiResponse<T>>;
    }

    try {
      const response = await this.client.delete<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error: any) {
      if (error.request && useMocks()) {
        console.warn('[API] Backend unavailable, using mock data for:', url);
        return mockHttpClient.delete<T>(url, config) as Promise<ApiResponse<T>>;
      }
      throw error;
    }
  }

  getClient(): AxiosInstance {
    return this.client;
  }
}

export const httpClient = new HttpClient();
export default httpClient;
