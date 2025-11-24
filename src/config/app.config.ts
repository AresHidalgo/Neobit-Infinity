export const appConfig = {
  name: 'NeoBit',
  description: 'E-Commerce Platform with AI Integration',
  version: '1.0.0',
  env: import.meta.env.MODE || 'development',
  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production',
};

export const routesConfig = {
  home: '/',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  products: {
    list: '/products',
    detail: (id: string) => `/products/${id}`,
    search: '/search',
    categories: '/products/categories',
    new: '/products/new',
    offers: '/products/offers',
    preOrders: '/products/pre-orders',
  },
  aboutUs: '/about',
  about: {
    index: '/about',
    history: '/about/history',
    team: '/about/team',
    values: '/about/values',
  },
  services: {
    index: '/services',
    support: '/services/support',
    warranty: '/services/warranty',
    shipping: '/services/shipping',
  },
  policies: {
    index: '/policies',
    privacy: '/policies/privacy',
    terms: '/policies/terms',
    returns: '/policies/returns',
  },
  contactUs: '/contact',
  contact: {
    index: '/contact',
    support: '/contact/support',
    sales: '/contact/sales',
    partner: '/contact/partner',
  },
  cart: '/cart',
  checkout: '/checkout',
  orders: {
    list: '/orders',
    detail: (id: string) => `/orders/${id}`,
  },
  wishlist: '/wishlist',
  comparisons: '/compare',
  alerts: '/alerts',
  profile: '/profile',
  admin: {
    dashboard: '/admin',
    users: '/admin/users',
    products: '/admin/products',
    analytics: '/admin/analytics',
  },
  seller: {
    dashboard: '/seller',
    products: '/seller/products',
    orders: '/seller/orders',
  },
};

