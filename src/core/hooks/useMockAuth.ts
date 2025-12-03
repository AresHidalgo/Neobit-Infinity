import { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { createMockToken, mockUser, mockSeller } from '@/core/auth/mockAuth.utils';
import { brutalToast } from '@/shared/utils/brutalToast';
import { useNavigate } from 'react-router-dom';
import { routesConfig } from '@/config/app.config';

export function useMockAuth() {
    const [isLoading, setIsLoading] = useState(false);
    const { login: storeLogin, logout: storeLogout } = useAuthStore();
    const navigate = useNavigate();

    const login = async (role: 'customer' | 'seller' = 'customer') => {
        setIsLoading(true);
        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            const user = role === 'seller' ? mockSeller : mockUser;
            const token = createMockToken(user);

            storeLogin({
                accessToken: token,
                refreshToken: 'mock-refresh-token',
                user: user,
            });

            brutalToast.success(`Welcome back, ${user.firstName}! System Online.`);

            if (role === 'seller') {
                navigate(routesConfig.seller.dashboard);
            } else {
                navigate(routesConfig.profile);
            }
        } catch (error) {
            brutalToast.error('Authentication Failed. System Error.');
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            storeLogout();
            brutalToast.info('System Disconnected. Session Terminated.');
            navigate(routesConfig.auth.login);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        login,
        logout,
        isLoading
    };
}
