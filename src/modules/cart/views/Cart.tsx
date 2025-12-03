import { Link } from 'react-router-dom';
import { useCartStore } from '@/store/cart.store';
import { routesConfig } from '@/config/app.config';
import { BrutalCard } from '@/shared/components/brutal/BrutalCard';
import { BrutalButton } from '@/shared/components/brutal/BrutalButton';
import { BrutalInput } from '@/shared/components/brutal/BrutalInput';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Cart() {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
        <div className="mb-8 p-8 border-4 border-black rounded-full bg-neon-yellow">
          <ShoppingBag className="w-16 h-16" />
        </div>
        <h1 className="font-heading text-4xl uppercase mb-4">Tu Carrito Está Vacío</h1>
        <p className="font-mono text-lg text-gray-500 mb-8 max-w-md">
          Parece que aún no has agregado ningún producto a tu inventario.
        </p>
        <Link to={routesConfig.products.search}>
          <BrutalButton size="lg">Comenzar a Comprar</BrutalButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="font-heading text-5xl uppercase mb-12 border-b-4 border-black inline-block">
        Tu Carrito ({items.length})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-8 space-y-6">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                layout
              >
                <BrutalCard className="flex flex-col md:flex-row gap-6 items-center p-4">
                  <div className="w-full md:w-32 aspect-square border-2 border-black bg-gray-100 shrink-0">
                    <img 
                      src={item.image || 'https://via.placeholder.com/150'} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="font-heading text-xl uppercase mb-1">{item.name}</h3>
                    <p className="font-mono text-sm text-gray-500 mb-2">Variante: Por defecto</p>
                    <p className="font-mono font-bold text-neon-blue text-lg">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border-2 border-black">
                      <button 
                        onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                        className="px-3 py-1 hover:bg-black hover:text-white transition-colors font-mono font-bold"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 font-mono font-bold border-x-2 border-black min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-black hover:text-white transition-colors font-mono font-bold"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.productId)}
                      className="p-2 border-2 border-red-500 hover:bg-red-500 hover:text-white transition-colors"
                      aria-label="Eliminar del carrito"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="font-heading text-2xl">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </BrutalCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <BrutalCard className="sticky top-24 bg-neon-yellow border-4 border-black p-8">
            <h2 className="font-heading text-3xl uppercase mb-8 border-b-4 border-black pb-4">
              Resumen
            </h2>
            
            <div className="space-y-4 mb-8 font-mono">
              <div className="flex justify-between text-lg">
                <span>Subtotal</span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Envío</span>
                <span className="font-bold">GRATIS</span>
              </div>
              <div className="border-t-4 border-black pt-4">
                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Link to={routesConfig.checkout}>
              <BrutalButton 
                fullWidth 
                size="lg" 
                className="bg-black text-white hover:bg-neon-pink hover:text-black mb-4"
              >
                Proceder al Pago
                <ArrowRight className="ml-2 w-5 h-5" />
              </BrutalButton>
            </Link>

            <Link to={routesConfig.products.search}>
              <BrutalButton 
                fullWidth 
                variant="outline"
                className="hover:bg-gray-100"
              >
                Continuar Comprando
              </BrutalButton>
            </Link>

            {/* Discount Code */}
            <div className="mt-8 pt-8 border-t-4 border-black">
              <label className="font-mono font-bold uppercase text-sm mb-2 block">
                Código de Descuento
              </label>
              <div className="flex gap-2">
                <BrutalInput placeholder="Ingresa código" className="flex-1" />
                <BrutalButton>Aplicar</BrutalButton>
              </div>
            </div>
          </BrutalCard>
        </div>
      </div>
    </div>
  );
}

export default Cart;
