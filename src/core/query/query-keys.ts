export const queryKeys = {
  // Auth
  auth: {
    profile: ['auth', 'profile'] as const,
  },

  // Users
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters?: Record<string, any>) => [...queryKeys.users.lists(), filters] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
    profile: () => [...queryKeys.users.all, 'profile'] as const,
  },

  // Products
  products: {
    all: ['products'] as const,
    lists: () => [...queryKeys.products.all, 'list'] as const,
    list: (filters?: Record<string, any>) => [...queryKeys.products.lists(), filters] as const,
    details: () => [...queryKeys.products.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.products.details(), id] as const,
    featured: (limit?: number) => [...queryKeys.products.all, 'featured', limit] as const,
    latest: (limit?: number) => [...queryKeys.products.all, 'latest', limit] as const,
    byCategory: (category: string, filters?: Record<string, any>) =>
      [...queryKeys.products.all, 'category', category, filters] as const,
  },

  // Cart
  cart: {
    all: ['cart'] as const,
    current: () => [...queryKeys.cart.all, 'current'] as const,
  },

  // Orders
  orders: {
    all: ['orders'] as const,
    lists: () => [...queryKeys.orders.all, 'list'] as const,
    list: (filters?: Record<string, any>) => [...queryKeys.orders.lists(), filters] as const,
    details: () => [...queryKeys.orders.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.orders.details(), id] as const,
  },

  // Wishlist
  wishlist: {
    all: ['wishlist'] as const,
    current: () => [...queryKeys.wishlist.all, 'current'] as const,
  },

  // Comparisons
  comparisons: {
    all: ['comparisons'] as const,
    current: () => [...queryKeys.comparisons.all, 'current'] as const,
  },

  // Alerts
  alerts: {
    all: ['alerts'] as const,
    lists: () => [...queryKeys.alerts.all, 'list'] as const,
    list: (filters?: Record<string, any>) => [...queryKeys.alerts.lists(), filters] as const,
  },

  // Reviews
  reviews: {
    all: ['reviews'] as const,
    byProduct: (productId: string, filters?: Record<string, any>) =>
      [...queryKeys.reviews.all, 'product', productId, filters] as const,
  },

  // Price History
  priceHistory: {
    all: ['price-history'] as const,
    byProduct: (productId: string, filters?: Record<string, any>) =>
      [...queryKeys.priceHistory.all, 'product', productId, filters] as const,
    chart: (productId: string, days?: number) =>
      [...queryKeys.priceHistory.all, 'product', productId, 'chart', days] as const,
  },

  // Admin
  admin: {
    all: ['admin'] as const,
    stats: () => [...queryKeys.admin.all, 'stats'] as const,
    users: (filters?: Record<string, any>) => [...queryKeys.admin.all, 'users', filters] as const,
    products: (filters?: Record<string, any>) => [...queryKeys.admin.all, 'products', filters] as const,
    orders: (filters?: Record<string, any>) => [...queryKeys.admin.all, 'orders', filters] as const,
  },
};
