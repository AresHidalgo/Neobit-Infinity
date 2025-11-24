import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/core/api/adapters/auth.api';
import { queryKeys } from '../query-keys';
import { toast } from 'sonner';
import { useAuthStore, AuthResponse as StoreAuthResponse } from '@/store/auth.store';
import { AuthResponse as ApiAuthResponse } from '@/types/auth.type';
import { User } from '@/types/user.type';

export function useLogin() {
  const queryClient = useQueryClient();
  const { login: loginStore } = useAuthStore();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      if (response.success && response.data) {
        const apiResponse = response.data as ApiAuthResponse;
        const storeResponse: StoreAuthResponse = {
          accessToken: apiResponse.accessToken,
          refreshToken: apiResponse.refreshToken,
          user: {
            ...apiResponse.user,
            role: apiResponse.user.role as User['role'],
          } as User,
        };
        loginStore(storeResponse);
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile });
        toast.success('Login successful!');
      } else {
        // Handle API response with success: false
        const errorMessage = response.error?.message || 'Login failed. Please try again.';
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.error?.message || error?.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  const { login: loginStore } = useAuthStore();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (response) => {
      if (response.success && response.data) {
        const apiResponse = response.data as ApiAuthResponse;
        const storeResponse: StoreAuthResponse = {
          accessToken: apiResponse.accessToken,
          refreshToken: apiResponse.refreshToken,
          user: {
            ...apiResponse.user,
            role: apiResponse.user.role as User['role'],
          } as User,
        };
        loginStore(storeResponse);
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile });
        toast.success('Account created successfully!');
      } else {
        // Handle API response with success: false
        const errorMessage = response.error?.message || 'Registration failed. Please try again.';
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.error?.message || error?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      logout();
      queryClient.clear();
      toast.success('Logged out successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Logout failed');
    },
  });
}
