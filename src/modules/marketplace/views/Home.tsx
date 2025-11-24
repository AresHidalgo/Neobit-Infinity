import { HeroBanner } from '../components/HeroBanner';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { LatestReleases } from '../components/LatestReleases';
import { CategoryQuick } from '../components/CategoryQuick';
import { Section } from '@/shared/components/ui/Section';
import { Container } from '@/shared/components/ui/Container';
import { RandomGamingIcons } from '@/shared/components/ui/GamingDecoratives';
import { motion } from 'framer-motion';

export function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Gaming Icons Decorativos de Fondo Globales */}
      <RandomGamingIcons 
        density="medium" 
        minSize={50} 
        maxSize={100}
        className="opacity-10"
      />
      
      {/* Main Content Container - Cohesive Layout */}
      <div className="relative z-10">
        {/* Hero Section - Full Width */}
        <Container className="py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <HeroBanner />
          </motion.div>
        </Container>

        {/* Main Store Content - Cohesive Grid */}
        <Container className="py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Categories & Promotions */}
            <div className="lg:col-span-3 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5 }}
              >
                <Section
                  title="Categories"
                  subtitle="Browse by category"
                  variant="default"
                  withNeon={true}
                  className="brutal-border-thick h-full"
                >
                  <CategoryQuick />
                </Section>
              </motion.div>
            </div>

            {/* Main Content Area - Featured & Latest */}
            <div className="lg:col-span-9 space-y-6">
              {/* Featured Products - Main Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5 }}
              >
                <Section
                  title="Featured Products"
                  subtitle="Handpicked for you"
                  variant="accent"
                  withNeon={true}
                  className="brutal-border-thick"
                >
                  <FeaturedProducts />
                </Section>
              </motion.div>

              {/* Latest Releases - Below Featured */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Section
                  title="Latest Releases"
                  subtitle="New arrivals"
                  variant="default"
                  withNeon={true}
                  className="brutal-border-thick"
                >
                  <LatestReleases />
                </Section>
              </motion.div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

