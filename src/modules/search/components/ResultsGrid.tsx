
import { Link } from 'react-router-dom';
import { Product } from '@/types/product.type';
import { routesConfig } from '@/config/app.config';
import { BrutalCard } from '@/shared/components/brutal/BrutalCard';
import { BrutalBadge } from '@/shared/components/brutal/BrutalBadge';
import { AspectRatio } from '@/shared/components/ui/AspectRatio';
import { Skeleton } from '@/shared/components/ui/Skeleton';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Eye } from 'lucide-react';

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
          <BrutalCard key={i} className="animate-pulse h-[400px]">
            <Skeleton className="w-full h-48 mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </BrutalCard>
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
        <p className="font-heading text-2xl mb-2 uppercase">No se encontraron productos</p>
        <p className="font-mono text-gray-500">Intenta ajustar tu búsqueda o filtros</p>
      </motion.div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link to={routesConfig.products.detail(product.id)}>
              <BrutalCard className="hover:shadow-brutal-lg transition-all duration-300 cursor-pointer group flex flex-col md:flex-row gap-6 p-6">
                {/* Image Section */}
                <div className="w-full md:w-64 flex-shrink-0">
                  <AspectRatio ratio={1}>
                    <img
                      src={product.images?.[0] || 'https://via.placeholder.com/400'}
                      alt={product.name}
                      className="w-full h-full object-cover border-2 border-black"
                      loading="lazy"
                    />
                  </AspectRatio>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-heading text-2xl uppercase group-hover:text-neon-blue transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-black text-white px-2 py-0.5 font-mono text-sm font-bold">
                          <Star className="h-3 w-3 fill-white" />
                          {product.rating.toFixed(1)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-heading text-3xl text-neon-green">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="font-mono text-lg text-gray-400 line-through decoration-2 decoration-red-500">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                      {product.discountPercent && (
                        <BrutalBadge variant="neon" size="sm">-{product.discountPercent}%</BrutalBadge>
                      )}
                    </div>

                    <p className="font-mono text-gray-600 mb-4 line-clamp-2 border-l-2 border-neon-yellow pl-3">
                      {product.description}
                    </p>

                    {/* Specs Preview (Mocked if not present) */}
                    <div className="grid grid-cols-2 gap-2 mb-4 font-mono text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-black"></span>
                        <span>Envío Rápido Disponible</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-black"></span>
                        <span>Garantía de 1 Año</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-auto pt-4 border-t-2 border-gray-100">
                    <button className="flex items-center gap-2 font-heading uppercase text-sm hover:text-neon-pink transition-colors">
                      <Eye className="w-4 h-4" /> Ver Detalles
                    </button>
                    {product.stock > 0 ? (
                      <span className="font-mono text-xs text-green-600 font-bold uppercase ml-auto">
                        {product.stock} Disponibles
                      </span>
                    ) : (
                      <span className="font-mono text-xs text-red-600 font-bold uppercase ml-auto">
                        Agotado
                      </span>
                    )}
                  </div>
                </div>
              </BrutalCard>
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
            <BrutalCard className="hover:shadow-brutal-lg transition-all duration-300 cursor-pointer h-full group p-0 overflow-hidden bg-white">
              <div className="relative border-b-4 border-black">
                <AspectRatio ratio={1}>
                  <img
                    src={product.images?.[0] || 'https://via.placeholder.com/400'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </AspectRatio>
                {product.discountPercent && (
                  <div className="absolute top-2 right-2">
                    <BrutalBadge variant="neon" size="sm">-{product.discountPercent}%</BrutalBadge>
                  </div>
                )}
                {product.stock === 0 && (
                  <div className="absolute top-2 left-2">
                    <BrutalBadge variant="outline" className="bg-red-500 text-white border-black">Agotado</BrutalBadge>
                  </div>
                )}
              </div>
              
              <div className="p-4 flex flex-col h-[180px]">
                <h3 className="font-heading text-lg uppercase leading-tight mb-2 line-clamp-2 group-hover:text-neon-blue transition-colors">
                  {product.name}
                </h3>
                
                <div className="mt-auto">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-heading text-2xl">${product.price.toFixed(2)}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="font-mono text-xs text-gray-400 line-through decoration-2 decoration-red-500">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between border-t-2 border-gray-100 pt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-black" />
                      <span className="font-mono text-sm font-bold">{product.rating.toFixed(1)}</span>
                      <span className="font-mono text-xs text-gray-400">({product.reviewCount})</span>
                    </div>
                    <ShoppingCart className="w-5 h-5 hover:text-neon-green transition-colors" />
                  </div>
                </div>
              </div>
            </BrutalCard>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

