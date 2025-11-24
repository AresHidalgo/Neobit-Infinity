export const mockConfig = {
    enabled: import.meta.env.VITE_USE_MOCKS === 'true' || import.meta.env.VITE_USE_MOCKS === '1',
    delay: {
        min: 300,
        max: 800,
    },
    errorRate: 0, // 0 = no errors, 0.1 = 10% error rate
};

export const useMocks = () => {
    // Never use mocks in production
    if (import.meta.env.PROD) {
        return false;
    }
    // Enable mocks if explicitly set, or if in development mode (for easier testing)
    const explicitEnabled = mockConfig.enabled;
    const devModeFallback = import.meta.env.DEV && import.meta.env.VITE_USE_MOCKS !== 'false';
    return explicitEnabled || devModeFallback;
};

