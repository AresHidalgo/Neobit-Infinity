import { HeroBanner } from '../components/HeroBanner';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { LatestReleases } from '../components/LatestReleases';
import { CategoryQuick } from '../components/CategoryQuick';
import { Container } from '@/shared/components/ui/Container';
import { motion } from 'framer-motion';
import { BrutalCard } from '@/shared/components/brutal/BrutalCard';

export function Home() {
  return (
    <div className="relative min-h-screen pb-20">
      
      {/* Marquee Section */}
      <div className="bg-neon-green border-b-4 border-black overflow-hidden py-3">
        <div className="animate-marquee whitespace-nowrap font-heading uppercase text-2xl tracking-wider">
          Nuevos Lanzamientos • Más Vendidos • Edición Limitada • Envío Gratis Mundial • Ofertas Cyber • Nuevos Lanzamientos • Más Vendidos • Edición Limitada • Envío Gratis Mundial •
        </div>
      </div>

      {/* Hero Section */}
      <Container className="py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <HeroBanner />
        </motion.div>

        {/* Categories Grid */}
        <div className="mb-20">
          <h2 className="font-heading text-4xl uppercase mb-8 border-b-4 border-black inline-block">Comprar por Categoría</h2>
          <CategoryQuick />
        </div>

        {/* Featured Products */}
        <div className="mb-20">
          <div className="flex justify-between items-end mb-8">
            <h2 className="font-heading text-4xl uppercase border-b-4 border-neon-pink inline-block">Productos Destacados</h2>
            <span className="font-mono font-bold hidden md:block">/// SELECCIÓN CURADA</span>
          </div>
          <BrutalCard className="bg-black p-8 border-neon-pink shadow-[8px_8px_0px_0px_#FF0099]">
            <FeaturedProducts />
          </BrutalCard>
        </div>

        {/* Latest Releases */}
        <div>
          <div className="flex justify-between items-end mb-8">
            <h2 className="font-heading text-4xl uppercase border-b-4 border-neon-blue inline-block">Nuevos Lanzamientos</h2>
            <span className="font-mono font-bold hidden md:block">/// RECIÉN LLEGADOS</span>
          </div>
          <LatestReleases />
        </div>
      </Container>
    </div>
  );
}

