import { DefaultOptions } from '@tanstack/react-query';

export const queryConfig: DefaultOptions = {
  queries: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: (failureCount, error: unknown) => {
      // Don't retry on 4xx errors (client errors)
      if (error && typeof error === 'object' && 'statusCode' in error) {
        const statusCode = (error as { statusCode?: number }).statusCode;
        if (statusCode && statusCode >= 400 && statusCode < 500) {
          return false;
        }
      }
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  },
  mutations: {
    retry: false,
    onError: (error: unknown) => {
      // Global error handling for mutations
      console.error('[Mutation Error]', error);
    },
  },
};

