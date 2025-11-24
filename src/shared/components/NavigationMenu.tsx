import { useState } from 'react';
import { Link } from 'react-router-dom';
import { routesConfig } from '@/config/app.config';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/shared/utils/cn';

interface MenuItem {
  label: string;
  to?: string;
  subItems?: {
    label: string;
    to: string;
  }[];
}

const menuItems: MenuItem[] = [
  {
    label: 'Productos',
    to: routesConfig.products.search,
    subItems: [
      { label: 'Categorías', to: routesConfig.products.categories },
      { label: 'Nuevos', to: routesConfig.products.new },
      { label: 'Ofertas', to: routesConfig.products.offers },
      { label: 'Pre-orders', to: routesConfig.products.preOrders },
    ],
  },
  {
    label: 'Sobre Nosotros',
    to: routesConfig.about.index,
    subItems: [
      { label: 'Historia', to: routesConfig.about.history },
      { label: 'Equipo', to: routesConfig.about.team },
      { label: 'Valores', to: routesConfig.about.values },
    ],
  },
  {
    label: 'Servicios',
    to: routesConfig.services.index,
    subItems: [
      { label: 'Soporte', to: routesConfig.services.support },
      { label: 'Garantía', to: routesConfig.services.warranty },
      { label: 'Envío', to: routesConfig.services.shipping },
    ],
  },
  {
    label: 'Políticas',
    to: routesConfig.policies.index,
    subItems: [
      { label: 'Privacidad', to: routesConfig.policies.privacy },
      { label: 'Términos', to: routesConfig.policies.terms },
      { label: 'Devoluciones', to: routesConfig.policies.returns },
    ],
  },
  {
    label: 'Contacto',
    to: routesConfig.contact.index,
    subItems: [
      { label: 'Soporte', to: routesConfig.contact.support },
      { label: 'Ventas', to: routesConfig.contact.sales },
      { label: 'Partner', to: routesConfig.contact.partner },
    ],
  },
];

interface NavigationMenuProps {
  className?: string;
}

export function NavigationMenu({ className }: NavigationMenuProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleMouseEnter = (label: string) => {
    setOpenMenu(label);
  };

  const handleMouseLeave = () => {
    setOpenMenu(null);
  };

  return (
    <nav className={cn('hidden md:flex items-center space-x-1', className)}>
      {menuItems.map((item) => (
        <div
          key={item.label}
          className="relative"
          onMouseEnter={() => handleMouseEnter(item.label)}
          onMouseLeave={handleMouseLeave}
        >
          {item.subItems ? (
            <>
              <Link
                to={item.to || '#'}
                className={cn(
                  'flex items-center gap-1 px-4 py-2 text-sm font-bold uppercase tracking-wide transition-all duration-200 relative group',
                  'text-foreground/80 hover:text-primary hover:neon-text',
                  openMenu === item.label && 'text-primary neon-text'
                )}
              >
                <span>{item.label}</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform duration-200',
                    openMenu === item.label && 'rotate-180'
                  )}
                />
                <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-primary transition-all duration-200 group-hover:w-full neon-glow"></span>
              </Link>

              <AnimatePresence>
                {openMenu === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 w-56 brutal-border-thick bg-card border-primary shadow-lg z-50"
                  >
                    <div className="py-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.to}
                          className="block px-4 py-3 text-sm font-bold uppercase tracking-wide transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:neon-text relative group"
                          onClick={() => setOpenMenu(null)}
                        >
                          <span className="relative z-10">{subItem.label}</span>
                          <span className="absolute left-0 top-0 bottom-0 w-0 bg-primary/20 group-hover:w-full transition-all duration-200"></span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <Link
              to={item.to || '#'}
              className="flex items-center px-4 py-2 text-sm font-bold uppercase tracking-wide transition-all duration-200 relative group text-foreground/80 hover:text-primary hover:neon-text"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-primary transition-all duration-200 group-hover:w-full neon-glow"></span>
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}

