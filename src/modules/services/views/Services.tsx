import { Container } from '@/shared/components/ui/Container';
import { Section } from '@/shared/components/ui/Section';
import { Text } from '@/shared/components/ui/Typography';
import { motion } from 'framer-motion';
import { RandomGamingIcons } from '@/shared/components/ui/GamingDecoratives';
import { Headphones, Shield, Truck, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { routesConfig } from '@/config/app.config';

const services = [
  {
    icon: Headphones,
    title: 'Soporte 24/7',
    description: 'Atención al cliente disponible las 24 horas del día, los 7 días de la semana.',
    link: routesConfig.services.support,
  },
  {
    icon: Shield,
    title: 'Garantía Extendida',
    description: 'Protege tus compras con nuestra garantía extendida en todos los productos.',
    link: routesConfig.services.warranty,
  },
  {
    icon: Truck,
    title: 'Envío Rápido',
    description: 'Entrega rápida y segura a cualquier parte del mundo con seguimiento en tiempo real.',
    link: routesConfig.services.shipping,
  },
  {
    icon: Settings,
    title: 'Servicios Técnicos',
    description: 'Instalación, configuración y mantenimiento profesional de tus productos.',
    link: routesConfig.services.index,
  },
];

export function Services() {
  return (
    <div className="relative min-h-screen py-12">
      <RandomGamingIcons density="low" minSize={40} maxSize={80} className="opacity-5" />
      
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Section
            title="Nuestros Servicios"
            subtitle="Todo lo que necesitas para tu experiencia gaming"
            variant="accent"
            withNeon={true}
            className="brutal-border"
          >
            <Text size="lg" className="mb-6">
              En Neobit Infinity no solo vendemos productos, ofrecemos servicios completos
              para asegurar que tengas la mejor experiencia posible.
            </Text>
          </Section>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Link to={service.link}>
                <Section
                  variant="highlight"
                  withNeon={true}
                  className="brutal-border text-center p-6 cursor-pointer h-full"
                >
                  <service.icon className="h-12 w-12 mx-auto mb-4 text-primary neon-glow" />
                  <h3 className="text-xl font-bold uppercase mb-3 neon-text">{service.title}</h3>
                  <Text size="sm" muted>{service.description}</Text>
                </Section>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}

