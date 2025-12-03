import { Link } from 'react-router-dom';
import { useLatestProducts } from '@/core/query/queries/products.queries';
import { routesConfig } from '@/config/app.config';
import { BrutalCard } from '@/shared/components/brutal/BrutalCard';
import { BrutalButton } from '@/shared/components/brutal/BrutalButton';
import { BrutalBadge } from '@/shared/components/brutal/BrutalBadge';
import { LoadingSpinner } from '@/shared/components/ui/LoadingSpinner';
import { Product } from '@/types/product.type';
import { Star, ArrowUpRight } from 'lucide-react';

function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={routesConfig.products.detail(product.id)} className="block h-full">
      <BrutalCard 
        hoverable 
        className="h-full flex flex-col p-0 overflow-hidden group bg-white hover:bg-neon-blue/10 transition-colors"
      >
        <div className="relative aspect-square border-b-3 border-black overflow-hidden">
          <img
            src={product.images?.[0] || 'https://via.placeholder.com/400'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          {product.discountPercent && (
            <div className="absolute top-2 left-2">
              <BrutalBadge variant="hot" className="text-sm font-bold">
                SALE
              </BrutalBadge>
            </div>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-heading text-lg leading-tight uppercase line-clamp-2">
              {product.name}
            </h3>
            <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <div className="mt-auto flex justify-between items-end">
            <div>
              <span className="font-mono text-xs text-gray-500 uppercase block mb-1">Price</span>
              <span className="font-heading text-2xl">${product.price.toFixed(0)}</span>
            </div>
            <div className="flex items-center gap-1 bg-black text-white px-2 py-1 font-mono text-xs font-bold">
              <Star className="w-3 h-3 fill-white" />
              {product.rating.toFixed(1)}
            </div>
          </div>
        </div>
      </BrutalCard>
    </Link>
  );
}

export function LatestReleases() {
  const { data, isLoading, error } = useLatestProducts(8);

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
