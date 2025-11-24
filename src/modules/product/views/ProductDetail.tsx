import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '@/core/query/queries/products.queries';
import { ProductGallery } from '../components/ProductGallery';
import { VariantsSelector } from '../components/VariantsSelector';
import { AddToCart } from '../components/AddToCart';
import { ReviewList } from '../components/ReviewList';
import { PriceHistoryChart } from '../components/PriceHistoryChart';
import { Product3DViewer } from '../components/Product3DViewer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/Tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/Card';
import { Badge } from '@/shared/components/ui/Badge';
import { Separator } from '@/shared/components/ui/Separator';
import { LoadingSpinner } from '@/shared/components/ui/LoadingSpinner';
import { Container } from '@/shared/components/ui/Container';
import { Breadcrumbs } from '@/shared/components/Breadcrumbs';
import { Heading1, Heading2, Text } from '@/shared/components/ui/Typography';
import { RandomGamingIcons } from '@/shared/components/ui/GamingDecoratives';
import { Star, Package, Truck, Shield, CheckCircle2 } from 'lucide-react';
import { routesConfig } from '@/config/app.config';
import { motion } from 'framer-motion';
import { cn } from '@/shared/utils/cn';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useProduct(id || '');
  const [selectedVariant, setSelectedVariant] = useState<Record<string, string>>({});
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <Container className="py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      </Container>
    );
  }

  if (error || !data?.success || !data.data) {
    return (
      <Container className="py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardContent className="py-12 text-center">
              <Text size="lg" muted className="mb-4">Product not found</Text>
              <Link 
                to={routesConfig.products.search} 
                className="text-primary hover:underline inline-block"
              >
                Browse all products
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    );
  }

  const product = data.data;

  return (
    <div className="relative">
      {/* Gaming Icons Decorativos de Fondo */}
      <RandomGamingIcons 
        density="low" 
        minSize={40} 
        maxSize={80}
        className="opacity-10"
      />
      
      <Container className="py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
        <Breadcrumbs
          items={[
            { label: 'Home', to: routesConfig.home },
            { label: 'Products', to: routesConfig.products.search },
            { label: product.name },
          ]}
          className="mb-6"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ProductGallery images={product.images || []} productName={product.name} />
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            className="space-y-6 relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div>
              <Heading1 className="mb-3">{product.name}</Heading1>
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <Text size="base" weight="semibold">{product.rating.toFixed(1)}</Text>
                  <Text size="sm" muted>({product.reviewCount} reviews)</Text>
                </div>
                {product.tags && product.tags.length > 0 && (
                  <div className="flex gap-1 flex-wrap">
                    {product.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="text-4xl font-bold">${product.price.toFixed(2)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-2xl text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <Badge className="bg-destructive text-destructive-foreground">
                      -{product.discountPercent}% OFF
                    </Badge>
                  </>
                )}
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <Text size="sm" muted>
                  You save ${(product.originalPrice - product.price).toFixed(2)}
                </Text>
              )}
            </motion.div>

            <Separator />

            {/* Variants */}
            {product.variants && Object.keys(product.variants).length > 0 && (
              <VariantsSelector
                variants={product.variants}
                onVariantChange={setSelectedVariant}
              />
            )}

            {/* Stock Status */}
            <div>
              {product.stock > 0 ? (
                <Badge variant="outline" className="text-green-600 dark:text-green-400 border-green-600 dark:border-green-400">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  In Stock ({product.stock} available)
                </Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            {/* Add to Cart - Sticky on scroll */}
            <motion.div
              className={cn(
                "transition-all duration-300",
                isSticky && "lg:fixed lg:bottom-0 lg:left-0 lg:right-0 lg:z-50 lg:bg-background/95 lg:backdrop-blur lg:border-t lg:shadow-lg lg:p-4"
              )}
              initial={false}
              animate={{ 
                y: isSticky ? 0 : 0,
              }}
            >
              <div className={cn(isSticky && "container mx-auto max-w-7xl px-4")}>
                <AddToCart product={product} selectedVariant={selectedVariant} />
              </div>
            </motion.div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-muted-foreground" />
                <Text size="sm">Free Shipping</Text>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <Text size="sm">Fast Delivery</Text>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <Text size="sm">1 Year Warranty</Text>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-muted-foreground" />
                <Text size="sm">Verified Reviews</Text>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs defaultValue="description" className="mb-12">
            <TabsList className="grid w-full grid-cols-4 h-auto p-1">
              <TabsTrigger value="description" className="py-2">Description</TabsTrigger>
              <TabsTrigger value="specifications" className="py-2">Specifications</TabsTrigger>
              <TabsTrigger value="reviews" className="py-2">Reviews</TabsTrigger>
              <TabsTrigger value="price-history" className="py-2">Price History</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text className="whitespace-pre-line">{product.description}</Text>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  {product.specifications ? (
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="border-b pb-2">
                          <dt className="font-semibold text-sm text-muted-foreground uppercase">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </dt>
                          <dd className="mt-1">{String(value)}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <Text muted>No specifications available</Text>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <ReviewList productId={product.id} />
            </TabsContent>

            <TabsContent value="price-history" className="mt-6">
              <PriceHistoryChart productId={product.id} days={30} />
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* 3D Viewer */}
        {product.model3dUrl && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Product3DViewer modelUrl={product.model3dUrl} productName={product.name} />
          </motion.div>
        )}
      </motion.div>
      </Container>
    </div>
  );
}

