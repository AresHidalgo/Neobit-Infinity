import { useQuery as useReactQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { queryConfig } from '../query/query-config';

export function useQuery<TData = unknown, TError = Error>(
  options: UseQueryOptions<TData, TError>,
): UseQueryResult<TData, TError> {
  return useReactQuery<TData, TError>({
    ...queryConfig.queries,
    ...options,
  } as UseQueryOptions<TData, TError>);
}

