import { routesConfig } from './app.config';

export const publicRoutes = [
  routesConfig.home,
  routesConfig.auth.login,
  routesConfig.auth.register,
  routesConfig.products.list,
  routesConfig.products.search,
  '/products/:id',
];

export const privateRoutes = [
  routesConfig.cart,
  routesConfig.checkout,
  routesConfig.orders.list,
  '/orders/:id',
  routesConfig.wishlist,
  routesConfig.comparisons,
  routesConfig.alerts,
  routesConfig.profile,
];

export const sellerRoutes = [
  routesConfig.seller.dashboard,
  routesConfig.seller.products,
  routesConfig.seller.orders,
];

export const adminRoutes = [
  routesConfig.admin.dashboard,
  routesConfig.admin.users,
  routesConfig.admin.products,
  routesConfig.admin.analytics,
];

