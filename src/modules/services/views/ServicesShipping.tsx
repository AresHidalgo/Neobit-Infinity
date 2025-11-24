import { Container } from '@/shared/components/ui/Container';
import { Section } from '@/shared/components/ui/Section';
import { Text } from '@/shared/components/ui/Typography';
import { motion } from 'framer-motion';
import { RandomGamingIcons } from '@/shared/components/ui/GamingDecoratives';
import { Truck, Package, MapPin, Clock } from 'lucide-react';

const shippingOptions = [
  {
    icon: Truck,
    title: 'Envío Estándar',
    duration: '5-7 días',
    price: 'Gratis en compras mayores a $50',
    description: 'Entrega estándar a través de nuestro servicio de correo preferido.',
  },
  {
    icon: Package,
    title: 'Envío Express',
    duration: '2-3 días',
    price: '$15.99',
    description: 'Entrega rápida para cuando necesitas tus productos pronto.',
  },
  {
    icon: Clock,
    title: 'Envío Overnight',
    duration: '24 horas',
    price: '$29.99',
    description: 'Entrega al día siguiente para máxima urgencia.',
  },
];

export function ServicesShipping() {
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
            title="Envío y Entrega"
            subtitle="Opciones de envío rápidas y seguras"
            variant="accent"
            withNeon={true}
            className="brutal-border"
          >
            <Text size="lg" className="mb-6">
              Ofrecemos múltiples opciones de envío para que elijas la que mejor se adapte
              a tus necesidades.
            </Text>
          </Section>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {shippingOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Section
                variant="highlight"
                withNeon={true}
                className="brutal-border text-center p-6 h-full"
              >
                <option.icon className="h-12 w-12 mx-auto mb-4 text-primary neon-glow" />
                <h3 className="text-xl font-bold uppercase mb-2 neon-text">{option.title}</h3>
                <p className="text-2xl font-black text-primary mb-2 neon-text">{option.duration}</p>
                <p className="text-lg font-bold text-primary mb-3">{option.price}</p>
                <Text size="sm" muted>{option.description}</Text>
              </Section>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Section
            variant="default"
            withNeon={true}
            className="brutal-border"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <MapPin className="h-8 w-8 text-primary neon-glow mb-4" />
                <h3 className="text-xl font-bold uppercase mb-4 neon-text">Áreas de Cobertura</h3>
                <Text size="sm" muted className="mb-2">
                  • Envío a nivel nacional (USA)
                </Text>
                <Text size="sm" muted className="mb-2">
                  • Envío internacional disponible
                </Text>
                <Text size="sm" muted className="mb-2">
                  • Excluye algunas zonas remotas
                </Text>
                <Text size="sm" muted>
                  • Consulta disponibilidad antes de ordenar
                </Text>
              </div>
              <div>
                <Package className="h-8 w-8 text-primary neon-glow mb-4" />
                <h3 className="text-xl font-bold uppercase mb-4 neon-text">Seguimiento</h3>
                <Text size="sm" muted className="mb-2">
                  • Todos los envíos incluyen número de rastreo
                </Text>
                <Text size="sm" muted className="mb-2">
                  • Actualizaciones en tiempo real
                </Text>
                <Text size="sm" muted className="mb-2">
                  • Notificaciones por email y SMS
                </Text>
                <Text size="sm" muted>
                  • Seguimiento disponible en nuestra web
                </Text>
              </div>
            </div>
          </Section>
        </motion.div>
      </Container>
    </div>
  );
}

