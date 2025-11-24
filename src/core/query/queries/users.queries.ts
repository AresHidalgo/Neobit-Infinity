import { useQuery } from '@tanstack/react-query';
import { usersApi } from '../../api/adapters/users.api';
import { queryKeys } from '../query-keys';
import { useAuth } from '../../../core/hooks/useAuth';

export function useProfile() {
  const { isAuthenticated } = useAuth();
  
  return useQuery({
    queryKey: queryKeys.users.profile(),
    queryFn: () => usersApi.getProfile(),
    enabled: isAuthenticated,
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => usersApi.getUserById(id),
    enabled: !!id,
  });
}

