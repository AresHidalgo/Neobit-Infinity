import {
  useMutation as useReactMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import { queryConfig } from '../query/query-config';

export function useMutation<TData = unknown, TError extends Error = Error, TVariables = void, TContext = unknown>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
): UseMutationResult<TData, TError, TVariables, TContext> {
  return useReactMutation<TData, TError, TVariables, TContext>({
    ...queryConfig.mutations,
    ...options,
  } as UseMutationOptions<TData, TError, TVariables, TContext>);
}

