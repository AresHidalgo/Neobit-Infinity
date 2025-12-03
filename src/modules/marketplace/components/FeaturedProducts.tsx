import { Link } from "react-router-dom";
import { useFeaturedProducts } from "@/core/query/queries/products.queries";
import { routesConfig } from "@/config/app.config";
import { BrutalCard } from "@/shared/components/brutal/BrutalCard";
import { BrutalButton } from "@/shared/components/brutal/BrutalButton";
import { BrutalBadge } from "@/shared/components/brutal/BrutalBadge";
import { LoadingSpinner } from "@/shared/components/ui/LoadingSpinner";
import { Product } from "@/types/product.type";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingCart } from "lucide-react";

function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={routesConfig.products.detail(product.id)} className="block h-full">
      <BrutalCard 
        hoverable 
        className="h-full flex flex-col p-0 overflow-hidden group border-3 border-white bg-black text-white"
      >
        <div className="relative aspect-square border-b-3 border-white overflow-hidden">
          <img
            src={product.images?.[0] || "https://via.placeholder.com/400"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
            loading="lazy"
          />
          {product.discountPercent && (
            <div className="absolute top-2 right-2">
              <BrutalBadge variant="neon" className="text-lg font-bold">
                -{product.discountPercent}%
              </BrutalBadge>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-neon-pink flex justify-between items-center">
            <span className="font-mono font-bold text-black uppercase text-xs">Quick Add</span>
            <ShoppingCart className="w-4 h-4 text-black" />
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-mono font-bold text-lg leading-tight mb-2 group-hover:text-neon-green transition-colors line-clamp-2">
            {product.name}
          </h3>
          
          <div className="mt-auto pt-4 border-t-2 border-white/20 flex justify-between items-end">
            <div>
              <div className="flex items-center gap-1 mb-1">
                <Star className="w-3 h-3 text-neon-yellow fill-neon-yellow" />
                <span className="font-mono text-xs text-gray-400">{product.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-2xl text-neon-green">${product.price.toFixed(0)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="font-mono text-xs text-gray-500 line-through">${product.originalPrice.toFixed(0)}</span>
                )}
              </div>
            </div>
            <BrutalButton size="sm" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              View
            </BrutalButton>
          </div>
        </div>
      </BrutalCard>
    </Link>
  );
}

export function FeaturedProducts() {
  const { data, isLoading, error } = useFeaturedProducts(4); // Show 4 top products

  if (isLoading) return <div className="flex justify-center py-12"><LoadingSpinner /></div>;
  if (error || !data?.success || !data.data) return null;

  const products = data.data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
