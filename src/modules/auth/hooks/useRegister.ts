import { useNavigate } from 'react-router-dom';
import { useRegister as useRegisterMutation } from '@/core/query/mutations/auth.mutations';
import { routesConfig } from '@/config/app.config';
import { RegisterData } from '@/types/auth.type';

export function useRegister() {
  const navigate = useNavigate();
  const mutation = useRegisterMutation();

  const register = async (data: RegisterData) => {
    try {
      const result = await mutation.mutateAsync(data);

      if (result?.success) {
        navigate(routesConfig.home, { replace: true });
      }
    } catch (error: any) {
      // Error is already handled in mutation
      console.error('Register error:', error);
    }
  };

  return {
    register,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}

