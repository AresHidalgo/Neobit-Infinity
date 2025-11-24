import { LoginCredentials, RegisterData, AuthResponse } from '@/types/auth.type';
import { ApiResponse } from '@/types/api.types';

// Mock Users Database (simulado en memoria)
// 
// CREDENCIALES DE PRUEBA:
// - Usuario normal: demo@neobit.com / demo123
// - Admin: admin@neobit.com / admin123
//
// El mock se activa automáticamente si el backend no responde (timeout 3s)
// o si está deshabilitado. Los nuevos registros se guardan en memoria durante la sesión.
interface MockUser {
  id: string;
  email: string;
  password: string; // En producción esto sería un hash
  firstName: string;
  lastName: string;
  role: string;
  phone?: string;
}

const mockUsers: MockUser[] = [
  {
    id: 'mock-user-1',
    email: 'demo@neobit.com',
    password: 'demo123',
    firstName: 'Demo',
    lastName: 'User',
    role: 'user',
    phone: '+1234567890',
  },
  {
    id: 'mock-user-2',
    email: 'admin@neobit.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
  },
];

// Generar token mock (simplificado, solo para desarrollo)
function generateMockToken(): string {
  return `mock-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Simular delay de red
function simulateNetworkDelay(ms: number = 800): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const authMock = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    await simulateNetworkDelay(600);
    
    // Buscar usuario
    const user = mockUsers.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      return {
        success: false,
        error: {
          message: 'Invalid email or password',
          code: 'INVALID_CREDENTIALS',
        },
      };
    }

    // Generar tokens
    const accessToken = generateMockToken();
    const refreshToken = generateMockToken();

    return {
      success: true,
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      },
    };
  },

  register: async (data: RegisterData): Promise<ApiResponse<AuthResponse>> => {
    await simulateNetworkDelay(800);

    // Verificar si el email ya existe
    const existingUser = mockUsers.find((u) => u.email === data.email);
    if (existingUser) {
      return {
        success: false,
        error: {
          message: 'Email already registered',
          code: 'EMAIL_EXISTS',
        },
      };
    }

    // Crear nuevo usuario mock
    const newUser: MockUser = {
      id: `mock-user-${Date.now()}`,
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      role: 'user',
      phone: data.phone,
    };

    mockUsers.push(newUser);

    // Generar tokens
    const accessToken = generateMockToken();
    const refreshToken = generateMockToken();

    return {
      success: true,
      data: {
        accessToken,
        refreshToken,
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          role: newUser.role,
        },
      },
    };
  },

  logout: async (): Promise<ApiResponse<void>> => {
    await simulateNetworkDelay(300);
    return {
      success: true,
    };
  },

  refreshToken: async (refreshToken: string): Promise<ApiResponse<{ accessToken: string }>> => {
    await simulateNetworkDelay(400);
    
    // En producción, verificaríamos el refresh token
    // Por ahora, simplemente generamos uno nuevo
    const accessToken = generateMockToken();
    
    return {
      success: true,
      data: {
        accessToken,
      },
    };
  },
};

// Helper para verificar si el backend está disponible
export async function isBackendAvailable(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 segundos timeout
    
    const response = await fetch(import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/health', {
      method: 'GET',
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    return false; // Backend no disponible
  }
}

