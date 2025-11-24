import { useNavigate, useLocation } from 'react-router-dom';
import { useLogin as useLoginMutation } from '@/core/query/mutations/auth.mutations';
import { routesConfig } from '@/config/app.config';

export function useLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const mutation = useLoginMutation();

  const login = async (email: string, password: string) => {
    try {
      const result = await mutation.mutateAsync({ email, password });

      if (result?.success) {
        // Redirect to intended page or home
        const from = (location.state as any)?.from?.pathname || routesConfig.home;
        navigate(from, { replace: true });
      }
    } catch (error: any) {
      // Error is already handled in mutation
      console.error('Login error:', error);
    }
  };

  return {
    login,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}

