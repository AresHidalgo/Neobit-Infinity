import httpClient from '../axios.client';
import { getApiUrl } from '@/config/api.config';
import { ApiResponse, PaginatedResponse } from '@/types/api.types';
import { User } from '@/types/user.type';

export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatarUrl?: string;
}

export interface UpdateUserDto extends UpdateProfileDto {
  role?: string;
  isActive?: boolean;
  points?: number;
}

export const usersApi = {
  getProfile: async (): Promise<ApiResponse<User>> => {
    return httpClient.get<User>(getApiUrl('/users/profile'));
  },

  updateProfile: async (data: UpdateProfileDto): Promise<ApiResponse<User>> => {
    return httpClient.put<User>(getApiUrl('/users/profile'), data);
  },

  getUserById: async (id: string): Promise<ApiResponse<User>> => {
    return httpClient.get<User>(getApiUrl(`/users/${id}`));
  },

  getUsers: async (params?: {
    page?: number;
    limit?: number;
    role?: string;
  }): Promise<PaginatedResponse<User>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.role) queryParams.append('role', params.role);

    const query = queryParams.toString();
    return httpClient.get<User[]>(getApiUrl(`/users${query ? `?${query}` : ''}`)) as Promise<PaginatedResponse<User>>;
  },

  updateUser: async (id: string, data: UpdateUserDto): Promise<ApiResponse<User>> => {
    return httpClient.put<User>(getApiUrl(`/users/${id}`), data);
  },

  deactivateUser: async (id: string): Promise<ApiResponse<User>> => {
    return httpClient.put<User>(getApiUrl(`/users/${id}/deactivate`), {});
  },
};
