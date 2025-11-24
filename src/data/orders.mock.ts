import { Order } from '@/types/order.type';
import { mockProducts } from './products.mock';
import { getCurrentUser } from './users.mock';

const orderStatuses: Order['status'][] = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

export const mockOrders: Order[] = [
    {
        id: 'order-001',
        userId: 'user-001',
        items: [
            {
                productId: mockProducts[0].id,
                productName: mockProducts[0].name,
                quantity: 2,
                price: mockProducts[0].price,
                variant: { color: 'Black', size: 'M' },
                subtotal: mockProducts[0].price * 2,
            },
            {
                productId: mockProducts[8].id,
                productName: mockProducts[8].name,
                quantity: 1,
                price: mockProducts[8].price,
                subtotal: mockProducts[8].price,
            },
        ],
        subtotal: mockProducts[0].price * 2 + mockProducts[8].price,
        tax: (mockProducts[0].price * 2 + mockProducts[8].price) * 0.1,
        shipping: 15.99,
        discount: 50.0,
        total: (mockProducts[0].price * 2 + mockProducts[8].price) * 1.1 + 15.99 - 50.0,
        shippingAddress: {
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA',
        },
        paymentMethod: {
            type: 'credit_card',
            last4: '4242',
            brand: 'visa',
        },
        status: 'delivered',
        trackingNumber: 'TRK123456789',
        shippedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        deliveredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    ...Array.from({ length: 15 }, (_, i) => {
        const idx = i + 2;
        const productCount = Math.floor(Math.random() * 3) + 1;
        const products = mockProducts.slice(0, productCount);
        const subtotal = products.reduce((sum, p) => sum + p.price * (Math.floor(Math.random() * 2) + 1), 0);
        const tax = subtotal * 0.1;
        const shipping = Math.random() > 0.5 ? 15.99 : 0;
        const discount = Math.random() > 0.7 ? Math.floor(Math.random() * 50) : 0;
        const total = subtotal + tax + shipping - discount;
        const status = orderStatuses[Math.floor(Math.random() * orderStatuses.length)];

        return {
            id: `order-${String(idx).padStart(3, '0')}`,
            userId: getCurrentUser()?.id || 'user-001',
            items: products.map((p) => ({
                productId: p.id,
                productName: p.name,
                quantity: Math.floor(Math.random() * 2) + 1,
                price: p.price,
                variant: { color: 'Black' },
                subtotal: p.price * (Math.floor(Math.random() * 2) + 1),
            })),
            subtotal,
            tax,
            shipping,
            discount,
            total,
            shippingAddress: {
                street: `${Math.floor(Math.random() * 9999)} Main St`,
                city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][Math.floor(Math.random() * 5)],
                state: ['NY', 'CA', 'IL', 'TX', 'AZ'][Math.floor(Math.random() * 5)],
                zipCode: String(Math.floor(10000 + Math.random() * 90000)),
                country: 'USA',
            },
            paymentMethod: {
                type: Math.random() > 0.5 ? 'credit_card' : 'paypal',
                last4: Math.random() > 0.5 ? String(Math.floor(1000 + Math.random() * 9000)) : undefined,
                brand: ['visa', 'mastercard', 'amex'][Math.floor(Math.random() * 3)],
            },
            status,
            trackingNumber: status !== 'pending' && status !== 'cancelled' ? `TRK${Math.floor(100000000 + Math.random() * 900000000)}` : undefined,
            shippedAt: status === 'shipped' || status === 'delivered' ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : undefined,
            deliveredAt: status === 'delivered' ? new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000) : undefined,
            createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(),
        } as Order;
    }),
];

export const getOrderById = (id: string): Order | undefined => {
    return mockOrders.find((o) => o.id === id);
};

export const getOrdersByUserId = (userId: string): Order[] => {
    return mockOrders.filter((o) => o.userId === userId);
};

