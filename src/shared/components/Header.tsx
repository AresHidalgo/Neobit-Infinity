
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useAuth } from '@/core/hooks/useAuth';
import { routesConfig } from '@/config/app.config';
import { Button } from '@/shared/components/ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/Avatar';
import { Badge } from '@/shared/components/ui/Badge';
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
    <header className="sticky top-0 z-50 w-full border-b-[4px] border-foreground/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative shadow-[0_4px_0px_hsl(var(--foreground)/0.08)]">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <div className="flex items-center space-x-6">
          <Logo />
          <NavigationMenu />
          {isAuthenticated && (
            <nav className="hidden lg:flex items-center space-x-4 ml-4 pl-4 border-l-[3px] border-foreground/20">
              <Link 
                to={routesConfig.wishlist} 
                className="text-sm font-bold uppercase tracking-wide text-foreground/80 hover:text-primary hover:neon-text transition-all duration-200 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[3px] after:bg-primary after:transition-all after:duration-200 hover:after:w-full hover:after:neon-glow"
              >
                Wishlist
              </Link>
              <Link 
                to={routesConfig.orders.list} 
                className="text-sm font-bold uppercase tracking-wide text-foreground/80 hover:text-primary hover:neon-text transition-all duration-200 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[3px] after:bg-primary after:transition-all after:duration-200 hover:after:w-full hover:after:neon-glow"
              >
                Orders
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Link 
            to={routesConfig.products.search} 
            className="p-2 hover:bg-accent rounded-md transition-colors"
            aria-label="Search products"
          >
            <Search className="h-5 w-5" />
          </Link>

          <ThemeSelector />

          {isAuthenticated ? (
            <>
              <Link 
                to={routesConfig.cart} 
                className="relative p-2 hover:bg-accent rounded-md transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground">
                    {itemCount}
                  </Badge>
                )}
              </Link>
              <div className="hidden md:flex items-center space-x-2">
                <Link to={routesConfig.profile} className="hover:opacity-80 transition-opacity">
                  <Avatar>
                    <AvatarImage src={user?.avatarUrl} alt={user?.firstName} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" onClick={() => navigate(routesConfig.auth.login)}>
                Login
              </Button>
              <Button onClick={() => navigate(routesConfig.auth.register)}>
                Sign Up
              </Button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
            className="md:hidden border-t bg-background/95 backdrop-blur"
          >
            <nav className="container mx-auto px-4 py-4 space-y-3">
              {/* Main Navigation Items */}
              <div className="space-y-2 pb-4 border-b-[4px] border-foreground/20">
                <Link
                  to={routesConfig.products.categories}
                  className="block py-2 text-sm font-bold uppercase tracking-wide text-foreground/80 hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Productos - Categorías
                </Link>
                <Link
                  to={routesConfig.about.index}
                  className="block py-2 text-sm font-bold uppercase tracking-wide text-foreground/80 hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sobre Nosotros
                </Link>
                <Link
                  to={routesConfig.services.index}
                  className="block py-2 text-sm font-bold uppercase tracking-wide text-foreground/80 hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Servicios
                </Link>
                <Link
                  to={routesConfig.policies.index}
                  className="block py-2 text-sm font-bold uppercase tracking-wide text-foreground/80 hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Políticas
                </Link>
                <Link
                  to={routesConfig.contact.index}
                  className="block py-2 text-sm font-bold uppercase tracking-wide text-foreground/80 hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contacto
                </Link>
              </div>
              
              {/* User-specific Links */}
              {isAuthenticated && (
                <>
                  <Link
                    to={routesConfig.wishlist}
                    className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Wishlist
                  </Link>
                  <Link
                    to={routesConfig.orders.list}
                    className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  <Link
                    to={routesConfig.profile}
                    className="flex items-center gap-2 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user?.avatarUrl} alt={user?.firstName} />
                      <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                    </Avatar>
                    Profile
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </>
              )}
              {!isAuthenticated && (
                <div className="pt-2 space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full" 
                    onClick={() => {
                      navigate(routesConfig.auth.login);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button 
                    className="w-full" 
                    onClick={() => {
                      navigate(routesConfig.auth.register);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign Up
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

