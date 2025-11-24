import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/core/hooks/useAuth';
import { routesConfig } from '@/config/app.config';

interface SellerRouteProps {
  children: ReactNode;
}

export function SellerRoute({ children }: SellerRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={routesConfig.auth.login} replace />;
  }

  // Check if user has seller or admin role
  if (user?.role !== 'seller' && user?.role !== 'admin') {
    return <Navigate to={routesConfig.home} replace />;
  }

  return <>{children}</>;
}
