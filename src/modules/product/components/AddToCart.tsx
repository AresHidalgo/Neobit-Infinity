import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { Label } from '@/shared/components/ui/Label';
import { routesConfig } from '@/config/app.config';
import { cartApi } from '@/core/api/adapters/cart.api';
import { wishlistApi } from '@/core/api/adapters/wishlist.api';
import { useCartStore } from '@/store/cart.store';
import { useWishlistStore } from '@/store/wishlist.store';
import { toast } from 'sonner';
import { Product } from '@/types/product.type';

interface AddToCartProps {
  product: Product;
  selectedVariant?: Record<string, string>;
}

export function AddToCart({ product, selectedVariant }: AddToCartProps) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { setCart } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();

  const isInWishlist = wishlistItems.some((item) => item.productId === product.id);

  const handleAddToCart = async () => {
    if (product.stock === 0) {
      toast.error('Product is out of stock');
      return;
    }

    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} items available`);
      return;
    }

    setIsAdding(true);
    try {
      const response = await cartApi.addToCart({
        productId: product.id,
        quantity,
        variant: selectedVariant,
      });

      if (response.success && response.data) {
        setCart(response.data);
        toast.success('Added to cart!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    if (!isAdding) {
      navigate(routesConfig.checkout);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const response = await wishlistApi.addToWishlist({ productId: product.id });
      if (response.success) {
        toast.success('Added to wishlist!');
        if (response.data) {
          useWishlistStore.setState({
            items: response.data.items,
            itemCount: response.data.itemCount,
          });
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to add to wishlist');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
        toast.success('Shared!');
      } catch (error) {
        // User cancelled share
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <Label>Quantity:</Label>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <Input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value) || 1;
              setQuantity(Math.min(Math.max(1, val), product.stock));
            }}
            className="w-20 text-center"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            disabled={quantity >= product.stock}
          >
            +
          </Button>
        </div>
        <span className="text-sm text-muted-foreground">
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          className="flex-1"
          size="lg"
          onClick={handleAddToCart}
          disabled={isAdding || product.stock === 0}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          {isAdding ? 'Adding...' : 'Add to Cart'}
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={handleBuyNow}
          disabled={isAdding || product.stock === 0}
        >
          Buy Now
        </Button>
      </div>

      {/* Secondary Actions */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={handleAddToWishlist}
          disabled={isInWishlist}
        >
          <Heart className={`h-4 w-4 mr-2 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
          {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
        </Button>
        <Button variant="outline" size="icon" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

