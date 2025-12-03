import { User } from '@/types/user.type';

export const createMockToken = (user: User): string => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
        sub: user.id,
        email: user.email,
        role: user.role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 24 hours
    }));
    const signature = 'mock-signature';
    return `${header}.${payload}.${signature}`;
};

export const mockUser: User = {
    id: 'user-001',
    email: 'cyber.user@neobit.com',
    firstName: 'Cyber',
    lastName: 'User',
    role: 'customer',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CyberUser',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
};

export const mockSeller: User = {
    id: 'seller-001',
    email: 'cyber.merchant@neobit.com',
    firstName: 'Cyber',
    lastName: 'Merchant',
    role: 'seller',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CyberMerchant',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
};
