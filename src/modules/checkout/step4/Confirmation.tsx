import { Link } from 'react-router-dom';
import { CheckCircle2, Truck, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { Separator } from '@/shared/components/ui/Separator';
import { routesConfig } from '@/config/app.config';
import { Order } from '@/types/order.type';
import { ShippingAddress } from '../step2/ShippingInfo';
import { PaymentMethodData } from '../step3/PaymentMethod';

interface ConfirmationProps {
  order?: Order;
  shippingAddress?: ShippingAddress;
  paymentMethod?: PaymentMethodData;
  onPlaceOrder?: () => void;
  isLoading?: boolean;
}

export function Confirmation({ order, shippingAddress, paymentMethod, onPlaceOrder, isLoading }: ConfirmationProps) {

  if (order) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <CheckCircle2 className="h-16 w-16 mx-auto text-green-500 mb-4" />
          <h2 className="text-3xl font-bold mb-2">Order Confirmed!</h2>
          <p className="text-muted-foreground mb-2">Thank you for your purchase</p>
          <p className="font-semibold">Order ID: {order.id}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Items</h3>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.productName} x {item.quantity}</span>
                    <span>${item.subtotal.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{order.shipping > 0 ? `$${order.shipping.toFixed(2)}` : 'Free'}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-center">
          <Link to={routesConfig.orders.list}>
            <Button variant="outline">View Orders</Button>
          </Link>
          <Link to={routesConfig.home}>
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Confirm Your Order</h2>
      </div>

      {/* Shipping Address Review */}
      {shippingAddress && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Shipping Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              {shippingAddress.street}
              <br />
              {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
              <br />
              {shippingAddress.country}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Payment Method Review */}
      {paymentMethod && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm capitalize">{paymentMethod.type.replace('_', ' ')}</p>
            {paymentMethod.last4 && (
              <p className="text-sm text-muted-foreground">**** **** **** {paymentMethod.last4}</p>
            )}
            {paymentMethod.brand && (
              <p className="text-sm text-muted-foreground capitalize">{paymentMethod.brand}</p>
            )}
          </CardContent>
        </Card>
      )}

      <div className="flex gap-4">
        {onPlaceOrder && (
          <Button
            onClick={onPlaceOrder}
            disabled={isLoading}
            className="flex-1"
            size="lg"
          >
            {isLoading ? 'Placing Order...' : 'Place Order'}
          </Button>
        )}
      </div>
    </div>
  );
}

