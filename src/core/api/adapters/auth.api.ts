import httpClient from '../axios.client';
import { getApiUrl } from '@/config/api.config';
import { ApiResponse } from '@/types/api.types';
import { LoginCredentials, RegisterData, AuthResponse } from '@/types/auth.type';
import { authMock } from '@/core/mocks/auth.mock';
import { useMocks } from '@/core/config/mock.config';
import { ApiException } from '../api.error';

// Función helper para logging seguro (solo en desarrollo)
function safeLog(message: string, ...args: any[]): void {
  if (import.meta.env.DEV) {
    console.warn(`[Auth API] ${message}`, ...args);
  }
}

// Función helper para intentar llamada real primero, fallback a mock (solo si mocks están habilitados)
async function withMockFallback<T>(
  realCall: () => Promise<T>,
  mockCall: () => Promise<T>
): Promise<T> {
  // En producción, nunca usar mocks
  if (import.meta.env.PROD || !useMocks()) {
    try {
      return await realCall();
    } catch (error: any) {
      // En producción, propagar el error sin fallback
      throw error;
    }
  }

  // En desarrollo, permitir fallback a mocks solo si está habilitado
  let timeoutId: NodeJS.Timeout | null = null;

  try {
    // Intentar llamada real con timeout
    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error('Backend timeout'));
      }, 3000);
    });

    const result = await Promise.race([realCall(), timeoutPromise]);

    // Limpiar timeout si realCall terminó primero
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    return result;
  } catch (error: any) {
    // Limpiar timeout en caso de error
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Solo usar mock si es un error de red/timeout, NO para errores HTTP válidos (401, 403, 500)
    const isNetworkError =
      error.message === 'Backend timeout' ||
      (error instanceof ApiException && (error.code === 'NETWORK_ERROR' || error.statusCode === 0)) ||
      (error.request && !error.response);

    if (isNetworkError) {
      safeLog('Backend unavailable, using mock data:', error.message);
      return mockCall();
    }

    // Para errores HTTP válidos (401, 403, 500, etc.), propagar el error sin usar mock
    throw error;
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
