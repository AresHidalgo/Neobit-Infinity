import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/core/query/queries/cart.queries';
import { useCartStore } from '@/store/cart.store';
import { CartItem } from '../components/CartItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { Separator } from '@/shared/components/ui/Separator';
import { LoadingSpinner } from '@/shared/components/ui/LoadingSpinner';
import { Container } from '@/shared/components/ui/Container';
import { Heading1, Heading2, Text } from '@/shared/components/ui/Typography';
import { Breadcrumbs } from '@/shared/components/Breadcrumbs';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { routesConfig } from '@/config/app.config';
import { motion, AnimatePresence } from 'framer-motion';

export function Cart() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useCart();
  const cartStore = useCartStore();

  // Fallback to store if API data not available
  const cart = data?.success && data.data ? data.data : {
    items: cartStore.items,
    subtotal: cartStore.subtotal,
    tax: cartStore.tax,
    shipping: cartStore.shipping,
    discount: cartStore.discount,
    total: cartStore.total,
    itemCount: cartStore.itemCount,
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error || !cart || cart.items.length === 0) {
    return (
      <Container className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card>
            <CardContent className="py-16 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <ShoppingBag className="h-20 w-20 mx-auto text-muted-foreground mb-6" />
              </motion.div>
              <Heading2 className="mb-3">Your cart is empty</Heading2>
              <Text size="lg" muted className="mb-8">
                Start adding products to your cart!
              </Text>
              <Link to={routesConfig.products.search}>
                <Button size="lg">Continue Shopping</Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Breadcrumbs
          items={[
            { label: 'Home', to: routesConfig.home },
            { label: 'Cart' },
          ]}
          className="mb-6"
        />

        <div className="flex items-center gap-4 mb-8">
          <Link to={routesConfig.home}>
            <Button variant="ghost" size="icon" className="hover:bg-accent">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <Heading1 className="flex-1">Shopping Cart</Heading1>
          <Text size="lg" muted>({cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'})</Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <AnimatePresence mode="popLayout">
              {cart.items.map((item, index) => (
                <motion.div
                  key={`${item.productId}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <CartItem item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className="sticky top-24 shadow-lg">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <Text size="sm" muted>Subtotal</Text>
                    <Text size="sm" weight="medium">${cart.subtotal.toFixed(2)}</Text>
                  </div>
                  <div className="flex justify-between text-sm">
                    <Text size="sm" muted>Tax</Text>
                    <Text size="sm" weight="medium">${cart.tax.toFixed(2)}</Text>
                  </div>
                  <div className="flex justify-between text-sm">
                    <Text size="sm" muted>Shipping</Text>
                    <Text size="sm" weight="medium">
                      {cart.shipping > 0 ? `$${cart.shipping.toFixed(2)}` : 'Free'}
                    </Text>
                  </div>
                  {cart.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                      <Text size="sm">Discount</Text>
                      <Text size="sm" weight="medium">-${cart.discount.toFixed(2)}</Text>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between">
                  <Text size="lg" weight="bold">Total</Text>
                  <Text size="lg" weight="bold">${cart.total.toFixed(2)}</Text>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => navigate(routesConfig.checkout)}
                >
                  Proceed to Checkout
                </Button>

                <Link to={routesConfig.products.search} className="block">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </Container>
  );
}

