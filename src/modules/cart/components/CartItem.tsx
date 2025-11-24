import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { Card, CardContent } from '@/shared/components/ui/Card';
import { routesConfig } from '@/config/app.config';
import { CartItem as CartItemType } from '@/types/cart.type';
import { useUpdateCartItem, useRemoveFromCart } from '@/core/query/mutations/cart.mutations';
import { motion } from 'framer-motion';
import { Heading3, Text } from '@/shared/components/ui/Typography';
import { cn } from '@/shared/utils/cn';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const updateMutation = useUpdateCartItem();
  const removeMutation = useRemoveFromCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemove();
      return;
    }
    updateMutation.mutate({
      productId: item.productId,
      data: { quantity: newQuantity },
      variant: item.variant,
    });
  };

  const handleRemove = () => {
    removeMutation.mutate({
      productId: item.productId,
      variant: item.variant,
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-4 sm:p-6">
          <div className="flex gap-4 sm:gap-6">
            {/* Image */}
            <Link 
              to={routesConfig.products.detail(item.productId)} 
              className="flex-shrink-0 group"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-muted"
              >
                <img
                  src={item.image || 'https://via.placeholder.com/100'}
                  alt={item.productName}
                  className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                />
              </motion.div>
            </Link>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <Link to={routesConfig.products.detail(item.productId)}>
                <Heading3 className="text-base sm:text-lg hover:text-primary transition-colors line-clamp-2 mb-1">
                  {item.productName}
                </Heading3>
              </Link>
              {item.variant && Object.keys(item.variant).length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1 mb-2">
                  {Object.entries(item.variant).map(([key, value]) => (
                    <span 
                      key={key}
                      className="text-xs sm:text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded"
                    >
                      {key}: {value}
                    </span>
                  ))}
                </div>
              )}
              <Text size="lg" weight="bold" className="mt-2">
                ${item.price.toFixed(2)}
              </Text>
            </div>

            {/* Quantity Controls & Actions */}
            <div className="flex flex-col items-end justify-between gap-4">
              <div className="flex items-center gap-2 border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-none"
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={updateMutation.isPending || removeMutation.isPending || item.quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <motion.span 
                  key={item.quantity}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="w-8 text-center font-medium text-sm"
                >
                  {item.quantity}
                </motion.span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-none"
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  disabled={updateMutation.isPending || removeMutation.isPending}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <div className="text-right">
                <Text size="lg" weight="bold" className="mb-2">
                  ${item.subtotal.toFixed(2)}
                </Text>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  disabled={removeMutation.isPending}
                  className={cn(
                    "text-destructive hover:text-destructive hover:bg-destructive/10",
                    "transition-colors"
                  )}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Remove</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

