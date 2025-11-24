import { authApi } from '../../../core/api/adapters/auth.api';
import { LoginCredentials, RegisterData } from '../../../types/auth.type';
import { AuthResponse } from '../../../types/auth.type';
import { ApiResponse } from '../../../types/api.types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response: ApiResponse<AuthResponse> = await authApi.login(credentials);
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Login failed');
    }
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response: ApiResponse<AuthResponse> = await authApi.register(data);
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Registration failed');
    }
    return response.data;
  },

  logout: async (): Promise<void> => {
    await authApi.logout();
  },
};

