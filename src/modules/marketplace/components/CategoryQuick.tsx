import { Link } from 'react-router-dom';
import { categories } from '@/data/categories.mock';
import { routesConfig } from '@/config/app.config';
import { motion } from 'framer-motion';
import { StackedBlocks, LayoutBlock } from '@/shared/components/ui/Layouts';
import { GamingIcon, GamingIconType } from '@/shared/components/ui/GamingIcons';
import { cn } from '@/shared/utils/cn';

// Mapeo de categorías a iconos gaming
const categoryToGamingIcon: Record<string, GamingIconType> = {
  electronics: 'cpu',
  computers: 'monitor',
  gaming: 'gamepad',
  accessories: 'keyboard',
  audio: 'headphones',
  peripherals: 'mouse',
};

export function CategoryQuick() {
  return (
    <StackedBlocks gap="md" randomRotation={true}>
      {categories.map((category, index) => {
        // Obtener icono gaming basado en el nombre de la categoría
        const gamingIconType = categoryToGamingIcon[category.id] || 
                               categoryToGamingIcon[category.name.toLowerCase()] || 
                               'gamepad';
        
        // Alturas variables: small, medium, large
        const size = index % 3 === 0 ? 'small' : index % 3 === 1 ? 'medium' : 'large';
        
        return (
          <Link key={category.id} to={`${routesConfig.products.search}?category=${category.id}`}>
            <LayoutBlock 
              size={size}
              randomRotation={true}
              className="group"
            >
              <motion.div
                className={cn(
                  'brutal-card border-[4px] p-8 brutal-card-hover h-full flex flex-col justify-between',
                  index % 2 === 0 ? 'bg-card' : 'bg-primary/10',
                  'transition-all duration-300 ease-out'
                )}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.3, ease: "easeOut" }}
                whileHover={{
                  borderWidth: '6px',
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                {/* Icono Gaming Grande */}
                <div className="flex items-center justify-center mb-4">
                  <motion.div
                    whileHover={{ 
                      scale: 1.3, 
                      rotate: [0, -10, 10, -10, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    <GamingIcon
                      type={gamingIconType}
                      size="xl"
                      solid={true}
                      randomRotation={true}
                      className="text-primary neon-text group-hover:neon-glow"
                    />
                  </motion.div>
                </div>
                
                {/* Nombre de Categoría */}
                <div className="text-center">
                  <h3 className="text-lg lg:text-xl font-black uppercase tracking-wide group-hover:neon-text transition-all duration-300">
                    {category.name}
                  </h3>
                </div>
                
                {/* Neon Accent Line Bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-[6px] bg-primary opacity-0 group-hover:opacity-100 neon-glow transition-opacity duration-300"></div>
              </motion.div>
            </LayoutBlock>
          </Link>
        );
      })}
    </StackedBlocks>
  );
}

