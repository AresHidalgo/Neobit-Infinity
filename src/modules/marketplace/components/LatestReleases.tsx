import { Link } from 'react-router-dom';
import { useLatestProducts } from '@/core/query/queries/products.queries';
import { routesConfig } from '@/config/app.config';
import { Card, CardHeader, CardTitle } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { LoadingSpinner } from '@/shared/components/ui/LoadingSpinner';
import { Badge } from '@/shared/components/ui/Badge';
import { AspectRatio } from '@/shared/components/ui/AspectRatio';
import { MasonryGrid } from '@/shared/components/ui/Layouts';
import { GamingIcon } from '@/shared/components/ui/GamingIcons';
import { Product } from '@/types/product.type';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Text } from '@/shared/components/ui/Typography';
import { getRandomGamingIconType, getRandomRotation } from '@/shared/utils/gamingIcons';
import { cn } from '@/shared/utils/cn';

function ProductCard({ product, index }: { product: Product; index: number }) {
  // Tamaños variables para masonry
  const size = index % 5 === 0 ? 'large' : index % 3 === 0 ? 'medium' : 'small';
  const rotation = (getRandomRotation() % 5); // -2° a +2°
  const gamingIconType = getRandomGamingIconType();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20, rotate: rotation }}
      whileInView={{ opacity: 1, scale: 1, y: 0, rotate: rotation }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3, type: "spring" }}
      whileHover={{
        rotate: rotation + 1,
        scale: 1.03,
        transition: { duration: 0.3 }
      }}
      className="h-full mb-6"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <Link to={routesConfig.products.detail(product.id)}>
        <Card className="h-full brutal-card-hover cursor-pointer group overflow-hidden relative">
          {/* Neon accent on hover - Refined */}
          <div className="absolute inset-0 border-[6px] border-transparent group-hover:border-primary opacity-0 group-hover:opacity-100 neon-glow-hover transition-all duration-300 ease-out z-10 pointer-events-none"></div>
          
          {/* Gaming Icon Decorativo */}
          <div className="absolute top-2 left-2 z-20 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
            <GamingIcon
              type={gamingIconType}
              size="sm"
              solid={true}
              randomRotation={true}
              className="text-primary"
            />
          </div>
          
          <div className="relative overflow-hidden">
            <AspectRatio 
              ratio={1} 
              className={cn(
                "bg-muted brutal-border border-b-[4px]",
                size === 'large' && "h-[280px]",
                size === 'medium' && "h-[240px]",
                size === 'small' && "h-[200px]"
              )}
            >
              <motion.img
                src={product.images?.[0] || 'https://via.placeholder.com/400'}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
                loading="lazy"
              />
            </AspectRatio>
            {product.discountPercent && (
              <Badge className="absolute top-4 right-4 z-20 neon-glow-hover">
                -{product.discountPercent}%
              </Badge>
            )}
          </div>
          <CardHeader className="p-6">
            <CardTitle className="text-lg sm:text-xl line-clamp-2 group-hover:text-primary group-hover:neon-text transition-all duration-300">
              {product.name}
            </CardTitle>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-baseline gap-2">
                <motion.span 
                  className="text-2xl font-black neon-primary"
                  whileHover={{ scale: 1.1 }}
                >
                  ${product.price.toFixed(2)}
                </motion.span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <Text className="text-sm line-through text-muted-foreground font-bold">
                    ${product.originalPrice.toFixed(2)}
                  </Text>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3 pt-3 border-t-[4px] border-foreground/10">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Text className="text-sm font-black">
                  {product.rating.toFixed(1)}
                </Text>
              </div>
              <Text className="text-sm font-bold text-muted-foreground uppercase tracking-wide">
                ({product.reviewCount} reviews)
              </Text>
            </div>
          </CardHeader>
        </Card>
      </Link>
    </motion.div>
  );
}

export function LatestReleases() {
  const { data, isLoading, error } = useLatestProducts(8);

  if (isLoading) {
    return (
      <section className="mb-12">
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error || !data?.success || !data.data) {
    return (
      <section className="mb-12">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Failed to load latest products</p>
        </div>
      </section>
    );
  }

  const products = data.data;

  return (
    <div>
      <div className="flex items-center justify-between mb-8 pb-6 border-b-[8px] border-foreground/20">
        <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter neon-text">
          Latest Releases
        </h2>
        <Link to={routesConfig.products.search}>
          <Button variant="outline" className="neon-glow-hover">
            View All
          </Button>
        </Link>
      </div>
      <MasonryGrid cols={4} gap="lg">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </MasonryGrid>
    </div>
  );
}

