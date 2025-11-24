export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalProducts: number;
  activeProducts: number;
  outOfStockProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  productsByCategory: Record<string, number>;
  usersByRole: Record<string, number>;
  ordersByStatus: Record<string, number>;
}

