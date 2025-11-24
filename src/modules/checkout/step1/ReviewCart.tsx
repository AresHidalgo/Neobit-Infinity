import { Link } from 'react-router-dom';
import { useCart } from '@/core/query/queries/cart.queries';
import { CartItem } from '@/modules/cart/components/CartItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { Separator } from '@/shared/components/ui/Separator';
import { LoadingSpinner } from '@/shared/components/ui/LoadingSpinner';
import { routesConfig } from '@/config/app.config';

interface ReviewCartProps {
  onNext?: () => void;
}

export function ReviewCart({ onNext }: ReviewCartProps) {
  const { data, isLoading } = useCart();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  const cart = data?.success && data.data ? data.data : null;

  if (!cart || cart.items.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground mb-4">Your cart is empty</p>
          <Link to={routesConfig.products.search}>
            <Button variant="outline">Continue Shopping</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Review Your Cart</h2>
        <div className="space-y-4">
          {cart.items.map((item, index) => (
            <CartItem key={`${item.productId}-${index}`} item={item} />
          ))}
        </div>
      </div>

      <Separator />

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${cart.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax</span>
            <span>${cart.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span>{cart.shipping > 0 ? `$${cart.shipping.toFixed(2)}` : 'Free'}</span>
          </div>
          {cart.discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount</span>
              <span>-${cart.discount.toFixed(2)}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${cart.total.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      {onNext && (
        <div className="flex justify-end">
          <Button onClick={onNext} size="lg">
            Continue to Shipping
          </Button>
        </div>
      )}
    </div>
  );
}
