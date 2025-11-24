import { User } from '@/types/user.type';

export const mockUsers: User[] = [
    {
        id: 'user-001',
        email: 'customer@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'customer',
        points: 1250,
        avatarUrl: 'https://i.pravatar.cc/150?img=1',
        phone: '+1234567890',
        isActive: true,
        lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
        createdAt: new Date('2023-01-15'),
        updatedAt: new Date(),
    },
    {
        id: 'user-002',
        email: 'seller@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'seller',
        points: 3500,
        avatarUrl: 'https://i.pravatar.cc/150?img=5',
        phone: '+1234567891',
        isActive: true,
        lastLogin: new Date(Date.now() - 5 * 60 * 60 * 1000),
        createdAt: new Date('2023-02-20'),
        updatedAt: new Date(),
    },
    {
        id: 'user-003',
        email: 'admin@neobit.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        points: 10000,
        avatarUrl: 'https://i.pravatar.cc/150?img=10',
        phone: '+1234567892',
        isActive: true,
        lastLogin: new Date(Date.now() - 30 * 60 * 1000),
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date(),
    },
    ...Array.from({ length: 20 }, (_, i) => {
        const idx = i + 4;
        const roles: Array<'customer' | 'seller' | 'admin'> = ['customer', 'customer', 'customer', 'seller', 'customer'];
        const role = roles[Math.floor(Math.random() * roles.length)];
        return {
            id: `user-${String(idx).padStart(3, '0')}`,
            email: `user${idx}@example.com`,
            firstName: `User${idx}`,
            lastName: `Last${idx}`,
            role,
            points: Math.floor(Math.random() * 5000),
            avatarUrl: `https://i.pravatar.cc/150?img=${idx}`,
            phone: `+123456${String(idx).padStart(4, '0')}`,
            isActive: Math.random() > 0.1,
            lastLogin: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
            createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(),
        } as User;
    }),
];

export const getCurrentUser = (): User | null => {
    const stored = localStorage.getItem('current-user');
    if (stored) {
        try {
            const userId = JSON.parse(stored);
            return mockUsers.find((u) => u.id === userId) || mockUsers[0];
        } catch {
            return mockUsers[0];
        }
    }
    return mockUsers[0];
};

export const getUserById = (id: string): User | undefined => {
    return mockUsers.find((u) => u.id === id);
};

