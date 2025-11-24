import { useNavigate } from 'react-router-dom';
import { useLogout as useLogoutMutation } from '@/core/query/mutations/auth.mutations';
import { routesConfig } from '@/config/app.config';

export function useLogout() {
  const navigate = useNavigate();
  const mutation = useLogoutMutation();

  const logout = async () => {
    try {
      await mutation.mutateAsync();
      navigate(routesConfig.home, { replace: true });
    } catch (error: any) {
      // Even if API call fails, clear local state
      navigate(routesConfig.home, { replace: true });
    }
  };

  return {
    logout,
    isLoading: mutation.isPending,
  };
}

