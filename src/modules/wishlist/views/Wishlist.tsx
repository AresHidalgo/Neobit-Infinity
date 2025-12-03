import { Link } from 'react-router-dom';
import { BrutalCard } from '@/shared/components/brutal/BrutalCard';
import { BrutalButton } from '@/shared/components/brutal/BrutalButton';
import { BrutalBadge } from '@/shared/components/brutal/BrutalBadge';
import { routesConfig } from '@/config/app.config';
import { Heart, Trash2, ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export function Wishlist() {
  // Mock wishlist data
  const wishlistItems = [
    {
      id: '1',
      productId: 'prod-1',
      name: 'Gaming Keyboard RGB Elite',
      price: 129.99,
      originalPrice: 159.99,
      image: '/placeholder-product.jpg',
      rating: 4.8,
      stock: 15
    },
    {
      id: '2',
      productId: 'prod-2',
      name: 'Wireless Mouse Pro X',
      price: 79.99,
      image: '/placeholder-product.jpg',
      rating: 4.5,
      stock: 0
    },
  ];

  const isEmpty = wishlistItems.length === 0;

  if (isEmpty) {
    return (
      <div className="container mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
        <div className="mb-8 p-8 border-4 border-black rounded-full bg-neon-pink">
          <Heart className="w-16 h-16 text-white" />
        </div>
        <h1 className="font-heading text-4xl uppercase mb-4">Tu Lista de Deseos Está Vacía</h1>
        <p className="font-mono text-lg text-gray-500 mb-8 max-w-md">
          Aún no has guardado ningún producto favorito. ¡Comienza a explorar!
        </p>
        <Link to={routesConfig.products.search}>
          <BrutalButton size="lg">Explorar Productos</BrutalButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="font-heading text-5xl uppercase border-b-4 border-black inline-block mb-2">
          Lista de Deseos
        </h1>
        <p className="font-mono text-lg text-gray-600">{wishlistItems.length} productos guardados</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <BrutalCard className="hover:shadow-brutal-lg transition-all h-full flex flex-col">
              <div className="relative">
                <Link to={routesConfig.products.detail(item.productId)}>
                  <div className="aspect-square border-b-4 border-black bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <button
                  className="absolute top-3 right-3 p-2 bg-neon-pink border-2 border-black hover:bg-red-500 transition-colors"
                  aria-label="Eliminar de favoritos"
                >
                  <Heart className="w-5 h-5 fill-white text-white" />
                </button>
                {item.originalPrice && (
                  <div className="absolute top-3 left-3">
                    <BrutalBadge variant="neon" size="sm">
                      -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                    </BrutalBadge>
                  </div>
                )}
                {item.stock === 0 && (
                  <div className="absolute bottom-3 left-3">
                    <BrutalBadge className="bg-red-600 text-white">Agotado</BrutalBadge>
                  </div>
                )}
              </div>

              <div className="p-4 flex flex-col flex-1">
                <Link to={routesConfig.products.detail(item.productId)}>
                  <h3 className="font-heading text-lg uppercase mb-2 hover:text-neon-blue transition-colors line-clamp-2">
                    {item.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-black" />
                  <span className="font-mono text-sm font-bold">{item.rating}</span>
                </div>

                <div className="mt-auto">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-heading text-2xl">${item.price.toFixed(2)}</span>
                    {item.originalPrice && (
                      <span className="font-mono text-sm text-gray-400 line-through">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <BrutalButton
                      fullWidth
                      size="sm"
                      className="bg-black text-white hover:bg-neon-green hover:text-black"
                      disabled={item.stock === 0}
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      {item.stock === 0 ? 'Agotado' : 'Agregar'}
                    </BrutalButton>
                    <button
                      className="p-2 border-2 border-red-500 hover:bg-red-500 hover:text-white transition-colors"
                      aria-label="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </BrutalCard>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link to={routesConfig.products.search}>
          <BrutalButton variant="outline" size="lg">
            Seguir Explorando
          </BrutalButton>
        </Link>
      </div>
    </div>
  );
}

export default Wishlist;
