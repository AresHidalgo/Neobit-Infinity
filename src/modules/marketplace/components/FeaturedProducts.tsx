import { Link } from "react-router-dom";
import { useFeaturedProducts } from "@/core/query/queries/products.queries";
import { routesConfig } from "@/config/app.config";
import { Card, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { LoadingSpinner } from "@/shared/components/ui/LoadingSpinner";
import { Heading2, Text } from "@/shared/components/ui/Typography";
import { Badge } from "@/shared/components/ui/Badge";
import { AspectRatio } from "@/shared/components/ui/AspectRatio";
import { MasonryGrid, LayoutBlock } from "@/shared/components/ui/Layouts";
import { GamingIcon } from "@/shared/components/ui/GamingIcons";
import { getRandomGamingIconType } from "@/shared/utils/gamingIcons";
import { Product } from "@/types/product.type";
import { motion } from "framer-motion";
import { Star, Heart } from "lucide-react";
import { getRandomRotation } from "@/shared/utils/gamingIcons";
import { cn } from "@/shared/utils/cn";

function ProductCard({ product, index }: { product: Product; index: number }) {
  // Tamaños variables: small (1x1), medium (1x2), large (2x2)
  const size = index % 4 === 0 ? "large" : index % 3 === 0 ? "medium" : "small";

  // Rotación aleatoria leve (-3° a +3°)
  const rotation = getRandomRotation() % 7; // Limitar a -3° a +3°

  // Icono gaming decorativo aleatorio
  const gamingIconType = getRandomGamingIconType();

  return (
    <LayoutBlock size={size} randomRotation={false} className="mb-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20, rotate: rotation }}
        animate={{ opacity: 1, scale: 1, y: 0, rotate: rotation }}
        transition={{
          duration: 0.4,
          delay: index * 0.05,
          type: "spring",
          stiffness: 200,
        }}
        whileHover={{
          rotate: rotation + 2,
          scale: 1.05,
          transition: { duration: 0.3 },
        }}
        className="h-full"
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
                ratio={size === "large" ? 4 / 3 : 1}
                className={cn(
                  "bg-muted brutal-border border-b-[4px]",
                  size === "large" && "h-[300px]",
                  size === "medium" && "h-[250px]",
                  size === "small" && "h-[200px]"
                )}
              >
                <motion.img
                  src={product.images?.[0] || "https://via.placeholder.com/400"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
                  loading="lazy"
                />
              </AspectRatio>
              {product.discountPercent && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <Badge className="absolute top-4 right-4 z-20 neon-glow-hover">
                    -{product.discountPercent}%
                  </Badge>
                </motion.div>
              )}
              <motion.button
                className="absolute top-4 left-10 p-3 brutal-border bg-background/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 hover:neon-glow"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault();
                  // TODO: Add to wishlist
                }}
              >
                <Heart className="h-5 w-5" />
              </motion.button>
            </div>
            <CardHeader className={cn("p-6", size === "large" && "p-8")}>
              <CardTitle
                className={cn(
                  "line-clamp-2 group-hover:text-primary group-hover:neon-text transition-all duration-300",
                  size === "large"
                    ? "text-xl lg:text-2xl"
                    : "text-lg sm:text-xl"
                )}
              >
                {product.name}
              </CardTitle>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-baseline gap-2">
                  <motion.span
                    className={cn(
                      "font-black neon-primary",
                      size === "large" ? "text-3xl" : "text-2xl"
                    )}
                    whileHover={{ scale: 1.1 }}
                  >
                    ${product.price.toFixed(2)}
                  </motion.span>
                  {product.originalPrice &&
                    product.originalPrice > product.price && (
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
    </LayoutBlock>
  );
}

export function FeaturedProducts() {
  const { data, isLoading, error } = useFeaturedProducts(8);

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
          <p className="text-muted-foreground">
            Failed to load featured products
          </p>
        </div>
      </section>
    );
  }

  const products = data.data;

  return (
    <div>
      <div className="flex items-center justify-between mb-8 pb-6 border-b-[8px] border-foreground/20">
        <Heading2 className="neon-text">Featured Products</Heading2>
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
