export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'customer' | 'seller' | 'admin';
  points?: number;
  avatarUrl?: string;
  phone?: string;
  isActive?: boolean;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// Re-exportar tipos de auth para compatibilidad
export type { AuthUser, LoginCredentials, RegisterData, AuthResponse } from './auth.type';

