import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { validateToken, getUserFromToken } from '@/core/auth/auth.utils';
import { TokenService } from '@/core/auth/token.service';

export function useAuth() {
  const { user, token, setUser, setToken, clearAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on mount
    const storedToken = TokenService.getToken();

    if (storedToken && validateToken()) {
      // Token is valid
      const tokenPayload = getUserFromToken();

      if (tokenPayload && !user) {
        // Token exists but user not in store, try to set from token
        // User profile will be fetched via API when needed
        if (!token) {
          setToken(storedToken);
        }
      } else if (!tokenPayload) {
        // Invalid token, clear auth
        clearAuth();
      }
    } else if (storedToken && TokenService.isTokenExpired(storedToken)) {
      // Token expired, clear auth
      clearAuth();
    } else if (!storedToken && !token) {
      // No token at all
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  }, [token, user, setToken, clearAuth]);

  const isAuthenticated = !!(token && user && validateToken());

  const logout = () => {
    clearAuth();
    // Clear all stores
    localStorage.removeItem('cart-storage');
    localStorage.removeItem('wishlist-storage');
    localStorage.removeItem('compare-storage');
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    setUser,
    setToken,
    logout,
    clearAuth,
    role: user?.role,
    isAdmin: user?.role === 'admin',
    isSeller: user?.role === 'seller' || user?.role === 'admin',
    isCustomer: user?.role === 'customer' || !user,
  };
}
