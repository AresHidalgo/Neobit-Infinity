import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/types/user.type';
import { TokenService } from '@/core/auth/token.service';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (authResponse: AuthResponse) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setTokens: (token: string, refreshToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      
      login: (authResponse: AuthResponse) => {
        // Store tokens using TokenService
        TokenService.setTokens(authResponse.accessToken, authResponse.refreshToken);
        
        set({
          user: authResponse.user,
          token: authResponse.accessToken,
          refreshToken: authResponse.refreshToken,
          isAuthenticated: true,
        });
      },
      
      logout: () => {
        // Clear tokens using TokenService
        TokenService.removeTokens();
        
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },
      
      setUser: (user: User) => {
        set({ user, isAuthenticated: !!user });
      },
      
      setToken: (token: string) => {
        TokenService.setToken(token);
        set({ token, isAuthenticated: !!token });
      },
      
      setTokens: (token: string, refreshToken: string) => {
        TokenService.setTokens(token, refreshToken);
        set({ token, refreshToken });
      },
      
      clearAuth: () => {
        TokenService.removeTokens();
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
