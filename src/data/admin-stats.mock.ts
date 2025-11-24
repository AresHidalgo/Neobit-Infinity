import { DashboardStats } from '@/types/admin.type';
import { mockUsers } from './users.mock';
import { mockProducts } from './products.mock';
import { mockOrders } from './orders.mock';

export const mockAdminStats: DashboardStats = {
    totalUsers: mockUsers.length,
    activeUsers: mockUsers.filter((u) => u.isActive).length,
    totalProducts: mockProducts.length,
    activeProducts: mockProducts.filter((p) => p.isActive).length,
    outOfStockProducts: mockProducts.filter((p) => p.stock === 0).length,
    totalOrders: mockOrders.length,
    totalRevenue: mockOrders
        .filter((o) => o.status === 'delivered' || o.status === 'shipped')
        .reduce((sum, o) => sum + o.total, 0),
    pendingOrders: mockOrders.filter((o) => o.status === 'pending').length,
    completedOrders: mockOrders.filter((o) => o.status === 'delivered').length,
    cancelledOrders: mockOrders.filter((o) => o.status === 'cancelled').length,
    productsByCategory: mockProducts.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>),
    usersByRole: mockUsers.reduce((acc, u) => {
        acc[u.role] = (acc[u.role] || 0) + 1;
        return acc;
    }, {} as Record<string, number>),
    ordersByStatus: mockOrders.reduce((acc, o) => {
        acc[o.status] = (acc[o.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>),
};

