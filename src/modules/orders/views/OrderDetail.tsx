import { useParams, Link, useNavigate } from 'react-router-dom';
import { useOrder } from '@/core/query/queries/orders.queries';
import { useCancelOrder } from '@/core/query/mutations/orders.mutations';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/Card';
import { Badge } from '@/shared/components/ui/Badge';
import { Button } from '@/shared/components/ui/Button';
import { Separator } from '@/shared/components/ui/Separator';
import { LoadingSpinner } from '@/shared/components/ui/LoadingSpinner';
import { routesConfig } from '@/config/app.config';
import { Order } from '@/types/order.type';
import { ArrowLeft, Package, Truck, CreditCard, MapPin, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useOrder(id || '');
  const cancelOrderMutation = useCancelOrder();

  const handleCancel = async () => {
    if (!id || !window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    await cancelOrderMutation.mutateAsync(id);
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

  if (error || !data?.success || !data.data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground text-lg mb-4">Order not found</p>
            <Link to={routesConfig.orders.list}>
              <Button variant="outline">Back to Orders</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const order: Order = data.data;
  const statusColors: Record<Order['status'], string> = {
    pending: 'bg-yellow-500',
    confirmed: 'bg-blue-500',
    processing: 'bg-purple-500',
    shipped: 'bg-indigo-500',
    delivered: 'bg-green-500',
    cancelled: 'bg-red-500',
  };

  const canCancel = order.status === 'pending' || order.status === 'confirmed';

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(routesConfig.orders.list)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Order #{order.id.split('-')[1]}</h1>
          <p className="text-muted-foreground mt-1">
            Placed on {order.createdAt ? format(new Date(order.createdAt), 'MMMM dd, yyyy') : 'N/A'}
          </p>
        </div>
        <Badge className={statusColors[order.status]}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </Badge>
        {canCancel && (
          <Button variant="destructive" onClick={handleCancel} disabled={cancelOrderMutation.isPending}>
            Cancel Order
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <Link to={routesConfig.products.detail(item.productId)}>
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src="https://via.placeholder.com/80"
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                    <div className="flex-1">
                      <Link to={routesConfig.products.detail(item.productId)}>
                        <h3 className="font-semibold hover:text-primary transition-colors">{item.productName}</h3>
                      </Link>
                      {item.variant && Object.keys(item.variant).length > 0 && (
                        <div className="text-sm text-muted-foreground mt-1">
                          {Object.entries(item.variant).map(([key, value]) => (
                            <span key={key} className="mr-2">
                              {key}: {value}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Quantity: {item.quantity}</span>
                        <span className="font-semibold">${item.subtotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
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
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                {order.shippingAddress.street}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                <br />
                {order.shippingAddress.country}
              </p>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm capitalize">{order.paymentMethod.type.replace('_', ' ')}</p>
              {order.paymentMethod.last4 && (
                <p className="text-sm text-muted-foreground">**** **** **** {order.paymentMethod.last4}</p>
              )}
              {order.paymentMethod.brand && (
                <p className="text-sm text-muted-foreground capitalize">{order.paymentMethod.brand}</p>
              )}
            </CardContent>
          </Card>

          {/* Tracking Info */}
          {order.trackingNumber && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Tracking Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-mono">{order.trackingNumber}</p>
                {order.shippedAt && (
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Shipped on {format(new Date(order.shippedAt), 'MMM dd, yyyy')}
                  </p>
                )}
                {order.deliveredAt && (
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Delivered on {format(new Date(order.deliveredAt), 'MMM dd, yyyy')}
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Order Dates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Important Dates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Order Placed:</span>
                <p>{order.createdAt ? format(new Date(order.createdAt), 'MMM dd, yyyy HH:mm') : 'N/A'}</p>
              </div>
              {order.shippedAt && (
                <div>
                  <span className="text-muted-foreground">Shipped:</span>
                  <p>{format(new Date(order.shippedAt), 'MMM dd, yyyy HH:mm')}</p>
                </div>
              )}
              {order.deliveredAt && (
                <div>
                  <span className="text-muted-foreground">Delivered:</span>
                  <p>{format(new Date(order.deliveredAt), 'MMM dd, yyyy HH:mm')}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

