
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useAuth } from '@/core/hooks/useAuth';
import { routesConfig } from '@/config/app.config';
import { Button } from '@/shared/components/ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/Avatar';
import { useCartStore } from '@/store/cart.store';
import { useLogout } from '@/modules/auth/hooks/useLogout';
import { ThemeSelector } from './ThemeSelector';
import { Logo } from './Logo';
import { NavigationMenu } from './NavigationMenu';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { logout: handleLogout } = useLogout();
  const { itemCount } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const initials = user?.firstName && user?.lastName
    ? `${user.firstName[0]}${user.lastName[0]}`
    : 'U';

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-black bg-white relative">
      <div className="container mx-auto flex h-24 items-center justify-between px-6">
        <div className="flex items-center space-x-8">
          <Logo className="scale-125" />
          <NavigationMenu />
          {isAuthenticated && (
            <nav className="hidden lg:flex items-center space-x-6 ml-6 pl-6 border-l-4 border-black h-12">
              <Link 
                to={routesConfig.wishlist} 
                className="text-base font-heading uppercase tracking-wider text-black hover:text-neon-pink hover:underline decoration-4 underline-offset-4 transition-all"
              >
                Deseos
              </Link>
              <Link 
                to={routesConfig.orders.list} 
                className="text-base font-heading uppercase tracking-wider text-black hover:text-neon-blue hover:underline decoration-4 underline-offset-4 transition-all"
              >
                Pedidos
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <Link 
            to={routesConfig.products.search} 
            className="p-3 border-3 border-transparent hover:border-black hover:bg-neon-yellow transition-all"
            aria-label="Buscar productos"
          >
            <Search className="h-6 w-6 stroke-[3]" />
          </Link>

          <ThemeSelector />

          {isAuthenticated ? (
            <>
              <Link 
                to={routesConfig.cart} 
                className="relative p-3 border-3 border-transparent hover:border-black hover:bg-neon-green transition-all group"
                aria-label="Carrito de compras"
              >
                <ShoppingCart className="h-6 w-6 stroke-[3]" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center font-mono font-bold text-xs bg-black text-white border-2 border-white">
                    {itemCount}
                  </span>
                )}
              </Link>
              <div className="hidden md:flex items-center space-x-4">
                <Link to={routesConfig.profile} className="hover:opacity-80 transition-opacity border-3 border-black p-0.5">
                  <Avatar className="h-10 w-10 rounded-none">
                    <AvatarImage src={user?.avatarUrl} alt={user?.firstName} />
                    <AvatarFallback className="rounded-none font-bold bg-neon-pink text-white">{initials}</AvatarFallback>
                  </Avatar>
                </Link>
                <Button variant="ghost" className="font-mono font-bold uppercase border-3 border-transparent hover:border-black" onClick={handleLogout}>
                  Salir
                </Button>
              </div>
            </>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link to={routesConfig.auth.login}>
                <Button variant="ghost" className="font-mono font-bold uppercase border-3 border-transparent hover:border-black hover:bg-gray-100">
                  Entrar
                </Button>
              </Link>
              <Link to={routesConfig.auth.register}>
                <Button className="font-heading uppercase bg-black text-white border-3 border-black hover:bg-neon-green hover:text-black hover:shadow-brutal transition-all">
                  Registro
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden border-3 border-black rounded-none hover:bg-neon-yellow"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6 stroke-[3]" /> : <Menu className="h-6 w-6 stroke-[3]" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t-4 border-black bg-white"
          >
            <nav className="container mx-auto px-6 py-6 space-y-4">
              {/* Main Navigation Items */}
              <div className="space-y-3 pb-6 border-b-4 border-black">
                <Link
                  to={routesConfig.products.categories}
                  className="block py-2 text-xl font-heading uppercase text-black hover:text-neon-pink hover:translate-x-2 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Productos
                </Link>
                <Link
                  to={routesConfig.about.index}
                  className="block py-2 text-xl font-heading uppercase text-black hover:text-neon-blue hover:translate-x-2 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Nosotros
                </Link>
                <Link
                  to={routesConfig.services.index}
                  className="block py-2 text-xl font-heading uppercase text-black hover:text-neon-green hover:translate-x-2 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Servicios
                </Link>
                <Link
                  to={routesConfig.contact.index}
                  className="block py-2 text-xl font-heading uppercase text-black hover:text-neon-yellow hover:translate-x-2 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contacto
                </Link>
              </div>
              
              {/* User-specific Links */}
              {isAuthenticated && (
                <div className="space-y-3">
                  <Link
                    to={routesConfig.wishlist}
                    className="block py-2 text-lg font-mono font-bold uppercase text-black hover:underline"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Lista de Deseos
                  </Link>
                  <Link
                    to={routesConfig.orders.list}
                    className="block py-2 text-lg font-mono font-bold uppercase text-black hover:underline"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mis Pedidos
                  </Link>
                  <Link
                    to={routesConfig.profile}
                    className="flex items-center gap-3 py-2 text-lg font-mono font-bold uppercase text-black hover:underline"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Avatar className="h-8 w-8 rounded-none border-2 border-black">
                      <AvatarImage src={user?.avatarUrl} alt={user?.firstName} />
                      <AvatarFallback className="rounded-none bg-neon-pink text-white">{initials}</AvatarFallback>
                    </Avatar>
                    Perfil
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start font-mono font-bold uppercase text-red-600 hover:bg-red-50" 
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Cerrar Sesión
                  </Button>
                </div>
              )}
              {!isAuthenticated && (
                <div className="pt-4 space-y-4">
                  <Button 
                    variant="ghost" 
                    className="w-full font-mono font-bold uppercase border-3 border-black hover:bg-gray-100" 
                    onClick={() => {
                      navigate(routesConfig.auth.login);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Iniciar Sesión
                  </Button>
                  <Button 
                    className="w-full font-heading uppercase bg-neon-green text-black border-3 border-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all" 
                    onClick={() => {
                      navigate(routesConfig.auth.register);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Registrarse
                  </Button>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

