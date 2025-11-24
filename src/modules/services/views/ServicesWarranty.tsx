import { Container } from '@/shared/components/ui/Container';
import { Section } from '@/shared/components/ui/Section';
import { Text } from '@/shared/components/ui/Typography';
import { motion } from 'framer-motion';
import { RandomGamingIcons } from '@/shared/components/ui/GamingDecoratives';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';

const warrantyTypes = [
  {
    icon: Shield,
    title: 'Garantía Estándar',
    duration: '1 Año',
    description: 'Cubre defectos de fabricación y mal funcionamiento.',
  },
  {
    icon: Shield,
    title: 'Garantía Extendida',
    duration: '2-3 Años',
    description: 'Protección adicional para tus productos más valiosos.',
  },
  {
    icon: CheckCircle,
    title: 'Garantía de Satisfacción',
    duration: '30 Días',
    description: 'Si no estás satisfecho, te devolvemos tu dinero.',
  },
];

const warrantyConditions = [
  { icon: CheckCircle, text: 'Cobertura contra defectos de fabricación' },
  { icon: CheckCircle, text: 'Reparación o reemplazo gratuito' },
  { icon: CheckCircle, text: 'Soporte técnico incluido' },
  { icon: AlertCircle, text: 'No cubre daños por mal uso o accidentes' },
  { icon: AlertCircle, text: 'Se requiere factura de compra válida' },
];

export function ServicesWarranty() {
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
            title="Garantías"
            subtitle="Protege tus compras con nuestras garantías"
            variant="accent"
            withNeon={true}
            className="brutal-border"
          >
            <Text size="lg" className="mb-6">
              Todas nuestras garantías están diseñadas para darte tranquilidad y asegurar
              que obtengas el máximo valor de tus compras.
            </Text>
          </Section>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {warrantyTypes.map((warranty, index) => (
            <motion.div
              key={warranty.title}
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
                <warranty.icon className="h-12 w-12 mx-auto mb-4 text-primary neon-glow" />
                <h3 className="text-xl font-bold uppercase mb-2 neon-text">{warranty.title}</h3>
                <p className="text-2xl font-black text-primary mb-3 neon-text">{warranty.duration}</p>
                <Text size="sm" muted>{warranty.description}</Text>
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
            <h3 className="text-2xl font-bold uppercase mb-6 neon-text">Condiciones de la Garantía</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {warrantyConditions.map((condition, index) => (
                <div key={index} className="flex items-start gap-3">
                  <condition.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <Text size="sm">{condition.text}</Text>
                </div>
              ))}
            </div>
          </Section>
        </motion.div>
      </Container>
    </div>
  );
}

