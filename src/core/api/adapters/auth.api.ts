import httpClient from '../axios.client';
import { getApiUrl } from '@/config/api.config';
import { ApiResponse } from '@/types/api.types';
import { LoginCredentials, RegisterData, AuthResponse } from '@/types/auth.type';
import { authMock, isBackendAvailable } from '@/core/mocks/auth.mock';

// Función helper para intentar llamada real primero, fallback a mock
async function withMockFallback<T>(
  realCall: () => Promise<T>,
  mockCall: () => Promise<T>
): Promise<T> {
  try {
    // Intentar llamada real con timeout corto
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 3000)
    );
    
    return await Promise.race([realCall(), timeoutPromise]);
  } catch (error: any) {
    // Si falla, usar mock
    console.warn('Backend unavailable, using mock data:', error.message);
    return mockCall();
  }
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    return withMockFallback(
      () => httpClient.post<AuthResponse>(getApiUrl('/auth/login'), credentials),
      () => authMock.login(credentials)
    );
  },

  register: async (data: RegisterData): Promise<ApiResponse<AuthResponse>> => {
    return withMockFallback(
      () => httpClient.post<AuthResponse>(getApiUrl('/auth/register'), data),
      () => authMock.register(data)
    );
  },

  logout: async (): Promise<ApiResponse<void>> => {
    return withMockFallback(
      () => httpClient.post<void>(getApiUrl('/auth/logout')),
      () => authMock.logout()
    );
  },

  refreshToken: async (refreshToken: string): Promise<ApiResponse<{ accessToken: string }>> => {
    return withMockFallback(
      () => httpClient.post<{ accessToken: string }>(getApiUrl('/auth/refresh'), { refreshToken }),
      () => authMock.refreshToken(refreshToken)
    );
  },
};
