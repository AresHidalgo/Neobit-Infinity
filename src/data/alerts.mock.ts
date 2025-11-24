import { Alert } from '@/types/alert.type';
import { mockProducts } from './products.mock';
import { getCurrentUser } from './users.mock';

export const mockAlerts: Alert[] = [
    {
        id: 'alert-001',
        userId: getCurrentUser()?.id || 'user-001',
        productId: mockProducts[0].id,
        productName: mockProducts[0].name,
        targetPrice: 899.99,
        condition: 'below',
        isTriggered: false,
        isActive: true,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
    },
    {
        id: 'alert-002',
        userId: getCurrentUser()?.id || 'user-001',
        productId: mockProducts[3].id,
        productName: mockProducts[3].name,
        targetPrice: 1899.99,
        condition: 'below',
        isTriggered: true,
        triggeredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        isActive: false,
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    ...Array.from({ length: 8 }, (_, i) => {
        const idx = i + 3;
        const product = mockProducts[Math.floor(Math.random() * mockProducts.length)];
        const targetPrice = product.price * (Math.random() * 0.3 + 0.7); // 70-100% of current price
        const isTriggered = Math.random() > 0.7;
        return {
            id: `alert-${String(idx).padStart(3, '0')}`,
            userId: getCurrentUser()?.id || 'user-001',
            productId: product.id,
            productName: product.name,
            targetPrice: Math.round(targetPrice * 100) / 100,
            condition: 'below' as const,
            isTriggered,
            triggeredAt: isTriggered ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : undefined,
            isActive: !isTriggered,
            createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(),
        } as Alert;
    }),
];

export const getAlertById = (id: string): Alert | undefined => {
    return mockAlerts.find((a) => a.id === id);
};

export const getAlertsByUserId = (userId: string): Alert[] => {
    return mockAlerts.filter((a) => a.userId === userId);
};

