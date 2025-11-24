
import { Link } from 'react-router-dom';
import { Product } from '@/types/product.type';
import { routesConfig } from '@/config/app.config';
import { Card, CardHeader, CardTitle } from '@/shared/components/ui/Card';
import { Badge } from '@/shared/components/ui/Badge';
import { AspectRatio } from '@/shared/components/ui/AspectRatio';
import { Text } from '@/shared/components/ui/Typography';
import { Skeleton } from '@/shared/components/ui/Skeleton';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface ResultsGridProps {
  products: Product[];
  isLoading?: boolean;
  viewMode?: 'grid' | 'list';
}

export function ResultsGrid({ products, isLoading, viewMode = 'grid' }: ResultsGridProps) {
  if (isLoading) {
    return (
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
        : 'space-y-4'
      }>
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            {viewMode === 'grid' ? (
              <>
                <AspectRatio ratio={1}>
                  <Skeleton className="w-full h-full" />
                </AspectRatio>
            <CardHeader>
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-6 w-1/2" />
            </CardHeader>
              </>
            ) : (
              <div className="flex gap-4 p-4">
                <Skeleton className="w-24 h-24 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-6 w-1/4" />
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Text size="lg" muted className="mb-2">No products found</Text>
        <Text size="sm" muted>Try adjusting your search or filters</Text>
      </motion.div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link to={routesConfig.products.detail(product.id)}>
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <div className="flex gap-4 p-4">
                  <AspectRatio ratio={1} className="w-24 h-24 flex-shrink-0">
                    <img
                      src={product.images?.[0] || 'https://via.placeholder.com/400'}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                  </AspectRatio>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base group-hover:text-primary transition-colors line-clamp-2 mb-2">
                      {product.name}
                    </CardTitle>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                      {product.discountPercent && (
                        <Badge variant="destructive">-{product.discountPercent}%</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Text size="sm" weight="medium">{product.rating.toFixed(1)}</Text>
                      </div>
                      <Text size="sm" muted>({product.reviewCount} reviews)</Text>
                      {product.stock > 0 && product.stock < 10 && (
                        <Text size="sm" className="text-orange-500">Only {product.stock} left!</Text>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ y: -4 }}
        >
          <Link to={routesConfig.products.detail(product.id)}>
            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full group overflow-hidden">
              <div className="relative overflow-hidden">
                <AspectRatio ratio={1}>
              <img
                src={product.images?.[0] || 'https://via.placeholder.com/400'}
                alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
              />
                </AspectRatio>
              {product.discountPercent && (
                <Badge className="absolute top-2 right-2 bg-destructive">
                  -{product.discountPercent}%
                </Badge>
              )}
              {product.stock === 0 && (
                <Badge variant="destructive" className="absolute top-2 left-2">
                  Out of Stock
                </Badge>
              )}
            </div>
            <CardHeader className="p-4">
                <CardTitle className="text-base group-hover:text-primary transition-colors line-clamp-2 mb-2">
                  {product.name}
                </CardTitle>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Text size="sm" weight="medium">{product.rating.toFixed(1)}</Text>
                  <Text size="sm" muted>({product.reviewCount})</Text>
              </div>
              {product.stock > 0 && product.stock < 10 && (
                  <Text size="xs" className="text-orange-500 mt-1">Only {product.stock} left!</Text>
              )}
            </CardHeader>
          </Card>
        </Link>
        </motion.div>
      ))}
    </div>
  );
}

