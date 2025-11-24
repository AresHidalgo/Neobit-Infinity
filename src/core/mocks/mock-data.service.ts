import { AxiosRequestConfig } from 'axios';
import { ApiResponse, PaginatedResponse } from '@/types/api.types';
import { createMockResponse, paginate, filterItems, sortItems, createMockError } from './mock.service';
import { mockProducts, getProductById, getFeaturedProducts, getLatestProducts, getProductsByCategory } from '@/data/products.mock';
import { mockUsers, getUserById, getCurrentUser } from '@/data/users.mock';
import { mockOrders, getOrderById, getOrdersByUserId } from '@/data/orders.mock';
import { getReviewsByProductId } from '@/data/reviews.mock';
import { mockAlerts, getAlertsByUserId } from '@/data/alerts.mock';
import { getPriceHistoryByProductId, getPriceHistoryChartData } from '@/data/price-history.mock';
import { mockAdminStats } from '@/data/admin-stats.mock';
import { useCartStore } from '@/store/cart.store';
import { useWishlistStore } from '@/store/wishlist.store';
import { useCompareStore } from '@/store/compare.store';
import { CartResponse } from '@/types/cart.type';
import { WishlistResponse } from '@/types/wishlist.type';
import { ComparisonResponse } from '@/types/comparison.type';
import { Product } from '@/types/product.type';
import { User } from '@/types/user.type';
import { Order } from '@/types/order.type';
import { Alert } from '@/types/alert.type';
import { LoginCredentials, RegisterData, AuthResponse } from '@/types/auth.type';
import { PriceHistoryChartData, PriceHistory } from '@/types/price-history.type';
import { Review } from '@/types/review.type';
import { DashboardStats } from '@/types/admin.type';

class MockDataService {
  private extractParams(url: string): URLSearchParams {
    const urlObj = new URL(url, 'http://localhost');
    return urlObj.searchParams;
  }

  private getUrlPath(url: string): string {
    try {
      const urlObj = new URL(url, 'http://localhost');
      return urlObj.pathname;
    } catch {
      return url;
    }
  }

  async handleGet<_T = any>(url: string, _config?: AxiosRequestConfig): Promise<any> {
    const path = this.getUrlPath(url);
    const params = this.extractParams(url);

    // Auth routes
    if (path.includes('/auth/profile') || path.includes('/users/profile')) {
      const user = getCurrentUser();
      if (!user) {
        throw createMockError('UNAUTHORIZED', 'User not authenticated', 401);
      }
      return createMockResponse<User>(user) as ApiResponse<User>;
    }

    // Products routes
    if (path.includes('/products')) {
      if (path.endsWith('/featured')) {
        const limit = params.get('limit') ? parseInt(params.get('limit')!) : 10;
        return createMockResponse<Product[]>(getFeaturedProducts(limit)) as ApiResponse<Product[]>;
      }

      if (path.endsWith('/latest')) {
        const limit = params.get('limit') ? parseInt(params.get('limit')!) : 10;
        return createMockResponse<Product[]>(getLatestProducts(limit)) as ApiResponse<Product[]>;
      }

      if (path.includes('/category/')) {
        const category = path.split('/category/')[1];
        const page = params.get('page') ? parseInt(params.get('page')!) : 1;
        const limit = params.get('limit') ? parseInt(params.get('limit')!) : 10;
        const categoryProducts = getProductsByCategory(category);
        const result = paginate(categoryProducts, page, limit);
        return createMockResponse<Product[]>(result.data, result.meta) as PaginatedResponse<Product>;
      }

      if (path.match(/\/products\/[^/]+$/)) {
        const productId = path.split('/products/')[1];
        const product = getProductById(productId);
        if (!product) {
          throw createMockError('NOT_FOUND', 'Product not found', 404);
        }
        return createMockResponse<Product>(product) as ApiResponse<Product>;
      }

      // Search products
      const search = params.get('search') || '';
      const category = params.get('category') || undefined;
      const minPrice = params.get('minPrice') ? parseFloat(params.get('minPrice')!) : undefined;
      const maxPrice = params.get('maxPrice') ? parseFloat(params.get('maxPrice')!) : undefined;
      const minRating = params.get('minRating') ? parseFloat(params.get('minRating')!) : undefined;
      const inStock = params.get('inStock') === 'true' ? true : params.get('inStock') === 'false' ? false : undefined;
      const sortBy = params.get('sortBy') as 'price' | 'rating' | 'createdAt' | 'soldCount' | undefined;
      const order = (params.get('order') as 'asc' | 'desc') || 'desc';
      const page = params.get('page') ? parseInt(params.get('page')!) : 1;
      const limit = params.get('limit') ? parseInt(params.get('limit')!) : 10;

      let filtered = filterItems(mockProducts, search, {
        category,
        minPrice,
        maxPrice,
        minRating,
        inStock,
      });

      if (sortBy) {
        filtered = sortItems(filtered, sortBy, order);
      }

      const result = paginate(filtered, page, limit);
      return createMockResponse<Product[]>(result.data, result.meta) as PaginatedResponse<Product>;
    }

    // Cart routes
    if (path.includes('/cart')) {
      const cartStore = useCartStore.getState();
      const cartResponse: CartResponse = {
        items: cartStore.items,
        itemCount: cartStore.itemCount,
        subtotal: cartStore.subtotal,
        tax: cartStore.tax,
        shipping: cartStore.shipping,
        discount: cartStore.discount,
        total: cartStore.total,
      };
      return createMockResponse<CartResponse>(cartResponse) as ApiResponse<CartResponse>;
    }

    // Orders routes
    if (path.includes('/orders')) {
      if (path.match(/\/orders\/[^/]+$/)) {
        const orderId = path.split('/orders/')[1];
        const order = getOrderById(orderId);
        if (!order) {
          throw createMockError('NOT_FOUND', 'Order not found', 404);
        }
        return createMockResponse<Order>(order) as ApiResponse<Order>;
      }

      const userId = params.get('userId') || getCurrentUser()?.id;
      const page = params.get('page') ? parseInt(params.get('page')!) : 1;
      const limit = params.get('limit') ? parseInt(params.get('limit')!) : 10;

      let orders = userId ? getOrdersByUserId(userId) : mockOrders;
      const result = paginate(orders, page, limit);
      return createMockResponse<Order[]>(result.data, result.meta) as PaginatedResponse<Order>;
    }

    // Wishlist routes
    if (path.includes('/wishlist')) {
      const wishlistStore = useWishlistStore.getState();
      const wishlistResponse: WishlistResponse = {
        items: wishlistStore.items,
        itemCount: wishlistStore.itemCount,
      };
      return createMockResponse<WishlistResponse>(wishlistResponse) as ApiResponse<WishlistResponse>;
    }

    // Comparisons routes
    if (path.includes('/comparisons')) {
      const compareStore = useCompareStore.getState();
      const comparisonResponse: ComparisonResponse = {
        products: compareStore.products,
        productCount: compareStore.productCount,
        maxProducts: compareStore.maxProducts,
      };
      return createMockResponse<ComparisonResponse>(comparisonResponse) as ApiResponse<ComparisonResponse>;
    }

    // Alerts routes
    if (path.includes('/alerts')) {
      const userId = getCurrentUser()?.id;
      if (!userId) {
        throw createMockError('UNAUTHORIZED', 'User not authenticated', 401);
      }

      const page = params.get('page') ? parseInt(params.get('page')!) : 1;
      const limit = params.get('limit') ? parseInt(params.get('limit')!) : 10;

      const alerts = getAlertsByUserId(userId);
      const result = paginate(alerts, page, limit);
      return createMockResponse<Alert[]>(result.data, result.meta) as PaginatedResponse<Alert>;
    }

    // Reviews routes
    if (path.includes('/reviews/product/')) {
      const productId = path.split('/reviews/product/')[1].split('?')[0];
      const page = params.get('page') ? parseInt(params.get('page')!) : 1;
      const limit = params.get('limit') ? parseInt(params.get('limit')!) : 10;

      const reviews = getReviewsByProductId(productId);
      const result = paginate(reviews, page, limit);
      return createMockResponse(reviews, result.meta) as PaginatedResponse<Review>;
    }

    // Price History routes
    if (path.includes('/price-history/product/')) {
      const productId = path.split('/price-history/product/')[1].split('/')[0];

      if (path.includes('/chart')) {
        const days = params.get('days') ? parseInt(params.get('days')!) : undefined;
        const chartData = getPriceHistoryChartData(productId, days);
        return createMockResponse(chartData) as ApiResponse<PriceHistoryChartData>;
      }

      const page = params.get('page') ? parseInt(params.get('page')!) : 1;
      const limit = params.get('limit') ? parseInt(params.get('limit')!) : 10;

      const history = getPriceHistoryByProductId(productId);
      const result = paginate(history, page, limit);
      return createMockResponse(history, result.meta) as PaginatedResponse<PriceHistory>;
    }

    // Admin routes
    if (path.includes('/admin/stats')) {
      return createMockResponse(mockAdminStats) as ApiResponse<DashboardStats>;
    }

    if (path.includes('/admin/users')) {
      const page = params.get('page') ? parseInt(params.get('page')!) : 1;
      const limit = params.get('limit') ? parseInt(params.get('limit')!) : 10;
      const result = paginate(mockUsers, page, limit);
      return createMockResponse<User[]>(result.data, result.meta) as PaginatedResponse<User>;
    }

    if (path.includes('/admin/products')) {
      const page = params.get('page') ? parseInt(params.get('page')!) : 1;
      const limit = params.get('limit') ? parseInt(params.get('limit')!) : 10;
      const result = paginate(mockProducts, page, limit);
      return createMockResponse<Product[]>(result.data, result.meta) as PaginatedResponse<Product>;
    }

    if (path.includes('/admin/orders')) {
      const page = params.get('page') ? parseInt(params.get('page')!) : 1;
      const limit = params.get('limit') ? parseInt(params.get('limit')!) : 10;
      const result = paginate(mockOrders, page, limit);
      return createMockResponse<Order[]>(result.data, result.meta) as PaginatedResponse<Order>;
    }

    // Users routes
    if (path.match(/\/users\/[^/]+$/)) {
      const userId = path.split('/users/')[1];
      const user = getUserById(userId);
      if (!user) {
        throw createMockError('NOT_FOUND', 'User not found', 404);
      }
      return createMockResponse<User>(user) as ApiResponse<User>;
    }

    if (path.includes('/users') && !path.includes('/profile')) {
      const page = params.get('page') ? parseInt(params.get('page')!) : 1;
      const limit = params.get('limit') ? parseInt(params.get('limit')!) : 10;
      const role = params.get('role') || undefined;

      let filtered = mockUsers;
      if (role) {
        filtered = mockUsers.filter((u) => u.role === role);
      }

      const result = paginate(filtered, page, limit);
      return createMockResponse<User[]>(result.data, result.meta) as PaginatedResponse<User>;
    }

    throw createMockError('NOT_FOUND', 'Route not found', 404);
  }

  async handlePost<_T = any>(url: string, data?: any, _config?: AxiosRequestConfig): Promise<any> {
    const path = this.getUrlPath(url);

    // Auth routes
    if (path.includes('/auth/login')) {
      const credentials = data as LoginCredentials;
      const user = mockUsers.find((u) => u.email === credentials.email);

      if (!user || credentials.password !== 'password') {
        throw createMockError('INVALID_CREDENTIALS', 'Invalid email or password', 401);
      }

      const token = `mock_token_${user.id}_${Date.now()}`;
      const refreshToken = `mock_refresh_${user.id}_${Date.now()}`;

      // Store in localStorage
      localStorage.setItem('current-user', JSON.stringify(user.id));
      localStorage.setItem('auth-storage', JSON.stringify({
        state: {
          user,
          token,
          refreshToken,
          isAuthenticated: true,
        },
      }));

      const response: AuthResponse = {
        accessToken: token,
        refreshToken,
        user,
      };

      return createMockResponse<AuthResponse>(response) as ApiResponse<AuthResponse>;
    }

    if (path.includes('/auth/register')) {
      const registerData = data as RegisterData;
      const newUser: User = {
        id: `user-${String(mockUsers.length + 1).padStart(3, '0')}`,
        email: registerData.email,
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        role: 'customer',
        points: 100,
        phone: registerData.phone,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUsers.push(newUser);

      const token = `mock_token_${newUser.id}_${Date.now()}`;
      const refreshToken = `mock_refresh_${newUser.id}_${Date.now()}`;

      localStorage.setItem('current-user', JSON.stringify(newUser.id));
      localStorage.setItem('auth-storage', JSON.stringify({
        state: {
          user: newUser,
          token,
          refreshToken,
          isAuthenticated: true,
        },
      }));

      const response: AuthResponse = {
        accessToken: token,
        refreshToken,
        user: newUser,
      };

      return createMockResponse<AuthResponse>(response) as ApiResponse<AuthResponse>;
    }

    if (path.includes('/auth/logout')) {
      localStorage.removeItem('auth-storage');
      localStorage.removeItem('current-user');
      return createMockResponse<void>(undefined) as ApiResponse<void>;
    }

    // Cart routes
    if (path.includes('/cart') && !path.includes('/cart/')) {
      const { productId, quantity, variant } = data;
      const product = getProductById(productId);
      if (!product) {
        throw createMockError('NOT_FOUND', 'Product not found', 404);
      }

      const cartStore = useCartStore.getState();
      const existingItemIndex = cartStore.items.findIndex(
        (item) => item.productId === productId && JSON.stringify(item.variant) === JSON.stringify(variant || {}),
      );

      let newItems = [...cartStore.items];
      if (existingItemIndex >= 0) {
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity,
          subtotal: (newItems[existingItemIndex].quantity + quantity) * product.price,
        };
      } else {
        newItems.push({
          productId,
          productName: product.name,
          price: product.price,
          quantity,
          variant: variant || {},
          image: product.images?.[0],
          subtotal: product.price * quantity,
        });
      }

      const subtotal = newItems.reduce((sum, item) => sum + item.subtotal, 0);
      const tax = subtotal * 0.1;
      const shipping = subtotal > 100 ? 0 : 15.99;
      const discount = 0;
      const total = subtotal + tax + shipping - discount;

      useCartStore.setState({
        items: newItems,
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        subtotal,
        tax,
        shipping,
        discount,
        total,
      });

      const cartResponse: CartResponse = {
        items: newItems,
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        subtotal,
        tax,
        shipping,
        discount,
        total,
      };

      return createMockResponse<CartResponse>(cartResponse) as ApiResponse<CartResponse>;
    }

    // Orders routes
    if (path.includes('/orders')) {
      const cartStore = useCartStore.getState();
      if (cartStore.items.length === 0) {
        throw createMockError('EMPTY_CART', 'Cart is empty', 400);
      }

      const newOrder: Order = {
        id: `order-${String(mockOrders.length + 1).padStart(3, '0')}`,
        userId: getCurrentUser()?.id || 'user-001',
        items: cartStore.items,
        subtotal: cartStore.subtotal,
        tax: cartStore.tax,
        shipping: cartStore.shipping,
        discount: cartStore.discount,
        total: cartStore.total,
        shippingAddress: data.shippingAddress,
        paymentMethod: data.paymentMethod,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockOrders.push(newOrder);
      useCartStore.getState().clearCart();

      return createMockResponse<Order>(newOrder) as ApiResponse<Order>;
    }

    // Wishlist routes
    if (path.includes('/wishlist') && !path.includes('/wishlist/')) {
      const { productId } = data;
      const product = getProductById(productId);
      if (!product) {
        throw createMockError('NOT_FOUND', 'Product not found', 404);
      }

      const wishlistStore = useWishlistStore.getState();
      const exists = wishlistStore.items.find((item) => item.productId === productId);

      if (!exists) {
        const newItems = [
          ...wishlistStore.items,
          {
            productId,
            productName: product.name,
            price: product.price,
            image: product.images?.[0],
            inStock: product.stock > 0,
            addedAt: new Date(),
          },
        ];

        useWishlistStore.setState({
          items: newItems,
          itemCount: newItems.length,
        });
      }

      const wishlistResponse: WishlistResponse = {
        items: useWishlistStore.getState().items,
        itemCount: useWishlistStore.getState().itemCount,
      };

      return createMockResponse<WishlistResponse>(wishlistResponse) as ApiResponse<WishlistResponse>;
    }

    // Comparisons routes
    if (path.includes('/comparisons') && !path.includes('/comparisons/')) {
      const { productId } = data;
      const product = getProductById(productId);
      if (!product) {
        throw createMockError('NOT_FOUND', 'Product not found', 404);
      }

      const compareStore = useCompareStore.getState();
      const exists = compareStore.products.find((p) => p.productId === productId);

      if (!exists && compareStore.products.length < compareStore.maxProducts) {
        const newProducts = [
          ...compareStore.products,
          {
            productId,
            productName: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.images?.[0],
            rating: product.rating,
            reviewCount: product.reviewCount,
            specifications: product.specifications,
            addedAt: new Date(),
          },
        ];

        useCompareStore.setState({
          products: newProducts,
          productCount: newProducts.length,
        });
      }

      const comparisonResponse: ComparisonResponse = {
        products: useCompareStore.getState().products,
        productCount: useCompareStore.getState().productCount,
        maxProducts: useCompareStore.getState().maxProducts,
      };

      return createMockResponse<ComparisonResponse>(comparisonResponse) as ApiResponse<ComparisonResponse>;
    }

    // Alerts routes
    if (path.includes('/alerts') && !path.includes('/alerts/')) {
      const { productId, targetPrice, condition } = data;
      const product = getProductById(productId);
      if (!product) {
        throw createMockError('NOT_FOUND', 'Product not found', 404);
      }

      const newAlert: Alert = {
        id: `alert-${String(mockAlerts.length + 1).padStart(3, '0')}`,
        userId: getCurrentUser()?.id || 'user-001',
        productId,
        productName: product.name,
        targetPrice,
        condition: condition || 'below',
        isTriggered: false,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockAlerts.push(newAlert);

      return createMockResponse<Alert>(newAlert) as ApiResponse<Alert>;
    }

    // Reviews routes
    if (path.includes('/reviews') && !path.match(/\/reviews\/[^/]+$/)) {
      const { productId, rating, comment, tags } = data;
      const newReview = {
        id: `review-${productId}-${Date.now()}`,
        userId: getCurrentUser()?.id || 'user-001',
        userName: `${getCurrentUser()?.firstName} ${getCurrentUser()?.lastName}`,
        productId,
        rating,
        comment,
        tags: tags || [],
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return createMockResponse(newReview) as ApiResponse<Review>;
    }

    throw createMockError('NOT_FOUND', 'Route not found', 404);
  }

  async handlePut<_T = any>(url: string, data?: any, _config?: AxiosRequestConfig): Promise<any> {
    const path = this.getUrlPath(url);

    // Cart update
    const cartPathMatch = path.match(/^\/cart\/([^/]+)/);
    if (cartPathMatch) {
      const productId = cartPathMatch[1].split('?')[0];
      const { quantity } = data;

      const cartStore = useCartStore.getState();
      const itemIndex = cartStore.items.findIndex((item) => item.productId === productId);

      if (itemIndex === -1) {
        throw createMockError('NOT_FOUND', 'Cart item not found', 404);
      }

      const newItems = [...cartStore.items];
      if (quantity <= 0) {
        newItems.splice(itemIndex, 1);
      } else {
        newItems[itemIndex] = {
          ...newItems[itemIndex],
          quantity,
          subtotal: newItems[itemIndex].price * quantity,
        };
      }

      const subtotal = newItems.reduce((sum, item) => sum + item.subtotal, 0);
      const tax = subtotal * 0.1;
      const shipping = subtotal > 100 ? 0 : 15.99;
      const total = subtotal + tax + shipping;

      useCartStore.setState({
        items: newItems,
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        subtotal,
        tax,
        shipping,
        discount: 0,
        total,
      });

      const cartResponse: CartResponse = {
        items: newItems,
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        subtotal,
        tax,
        shipping,
        discount: 0,
        total,
      };

      return createMockResponse<CartResponse>(cartResponse);
    }

    // Profile update
    if (path.includes('/users/profile')) {
      const user = getCurrentUser();
      if (!user) {
        throw createMockError('UNAUTHORIZED', 'User not authenticated', 401);
      }

      const updatedUser = { ...user, ...data, updatedAt: new Date() };
      const userIndex = mockUsers.findIndex((u) => u.id === user.id);
      if (userIndex >= 0) {
        mockUsers[userIndex] = updatedUser;
      }

      return createMockResponse<User>(updatedUser) as ApiResponse<User>;
    }

    // Reviews update
    if (path.match(/\/reviews\/[^/]+$/)) {
      const reviewId = path.split('/reviews/')[1];
      // Mock update
      return createMockResponse({ id: reviewId, ...data }) as ApiResponse<any>;
    }

    throw createMockError('NOT_FOUND', 'Route not found', 404);
  }

  async handlePatch<_T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return this.handlePut<_T>(url, data, config);
  }

  async handleDelete<_T = any>(url: string, _config?: AxiosRequestConfig): Promise<any> {
    const path = this.getUrlPath(url);

    // Cart delete
    const cartPathMatch2 = path.match(/^\/cart\/([^/]+)/);
    if (cartPathMatch2) {
      const productId = path.split('/cart/')[1].split('?')[0];

      const cartStore = useCartStore.getState();
      const newItems = cartStore.items.filter((item) => item.productId !== productId);

      const subtotal = newItems.reduce((sum, item) => sum + item.subtotal, 0);
      const tax = subtotal * 0.1;
      const shipping = subtotal > 100 ? 0 : 15.99;
      const total = subtotal + tax + shipping;

      useCartStore.setState({
        items: newItems,
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        subtotal,
        tax,
        shipping,
        discount: 0,
        total,
      });

      const cartResponse: CartResponse = {
        items: newItems,
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        subtotal,
        tax,
        shipping,
        discount: 0,
        total,
      };

      return createMockResponse<CartResponse>(cartResponse) as ApiResponse<CartResponse>;
    }

    if (path === '/cart') {
      useCartStore.getState().clearCart();
      return createMockResponse<void>(undefined) as ApiResponse<void>;
    }

    // Wishlist delete
    if (path.match(/\/wishlist\/[^/]+$/)) {
      const productId = path.split('/wishlist/')[1];

      const wishlistStore = useWishlistStore.getState();
      const newItems = wishlistStore.items.filter((item) => item.productId !== productId);

      useWishlistStore.setState({
        items: newItems,
        itemCount: newItems.length,
      });

      const wishlistResponse: WishlistResponse = {
        items: newItems,
        itemCount: newItems.length,
      };

      return createMockResponse<WishlistResponse>(wishlistResponse) as ApiResponse<WishlistResponse>;
    }

    // Comparisons delete
    if (path.match(/\/comparisons\/[^/]+$/)) {
      const productId = path.split('/comparisons/')[1];

      const compareStore = useCompareStore.getState();
      const newProducts = compareStore.products.filter((p) => p.productId !== productId);

      useCompareStore.setState({
        products: newProducts,
        productCount: newProducts.length,
      });

      const comparisonResponse: ComparisonResponse = {
        products: newProducts,
        productCount: newProducts.length,
        maxProducts: compareStore.maxProducts,
      };

      return createMockResponse<ComparisonResponse>(comparisonResponse) as ApiResponse<ComparisonResponse>;
    }

    // Alerts delete
    if (path.match(/\/alerts\/[^/]+$/)) {
      const alertId = path.split('/alerts/')[1];
      const alertIndex = mockAlerts.findIndex((a) => a.id === alertId);
      if (alertIndex >= 0) {
        mockAlerts.splice(alertIndex, 1);
      }
      return createMockResponse<void>(undefined) as ApiResponse<void>;
    }

    // Reviews delete
    if (path.match(/\/reviews\/[^/]+$/)) {
      return createMockResponse<void>(undefined) as ApiResponse<void>;
    }

    throw createMockError('NOT_FOUND', 'Route not found', 404);
  }
}

export const mockDataService = new MockDataService();

