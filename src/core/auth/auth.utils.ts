import { TokenService } from './token.service';

export interface DecodedToken {
  sub: string; // user id
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export function validateToken(): boolean {
  const token = TokenService.getToken();
  if (!token) return false;

  return !TokenService.isTokenExpired(token);
}

export function getUserFromToken(): DecodedToken | null {
  return TokenService.getTokenPayload<DecodedToken>();
}

export function extractUserId(): string | null {
  const payload = getUserFromToken();
  return payload?.sub || null;
}

export function extractUserRole(): string | null {
  const payload = getUserFromToken();
  return payload?.role || null;
}

export function hasRole(requiredRole: string | string[]): boolean {
  const userRole = extractUserRole();
  if (!userRole) return false;

  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(userRole);
  }

  return userRole === requiredRole;
}

export function clearAuth(): void {
  TokenService.removeTokens();
  // Clear any other auth-related storage
  localStorage.removeItem('auth-storage');
  sessionStorage.clear();
}
