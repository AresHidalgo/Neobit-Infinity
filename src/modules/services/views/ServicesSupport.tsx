import { Container } from '@/shared/components/ui/Container';
import { Section } from '@/shared/components/ui/Section';
import { Text } from '@/shared/components/ui/Typography';
import { motion } from 'framer-motion';
import { RandomGamingIcons } from '@/shared/components/ui/GamingDecoratives';
import { Headphones, MessageSquare, Clock, Mail } from 'lucide-react';

const supportFeatures = [
  {
    icon: Clock,
    title: 'Disponible 24/7',
    description: 'Nuestro equipo está disponible en todo momento para ayudarte.',
  },
  {
    icon: MessageSquare,
    title: 'Chat en Vivo',
    description: 'Habla directamente con nuestros agentes de soporte en tiempo real.',
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Envíanos un email y te responderemos en menos de 24 horas.',
  },
  {
    icon: Headphones,
    title: 'Soporte Telefónico',
    description: 'Llámanos y habla directamente con nuestro equipo de soporte.',
  },
];

export function ServicesSupport() {
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
            title="Soporte Técnico"
            subtitle="Estamos aquí para ayudarte siempre"
            variant="accent"
            withNeon={true}
            className="brutal-border"
          >
            <Text size="lg" className="mb-6">
              Nuestro equipo de soporte está disponible las 24 horas del día, los 7 días
              de la semana para ayudarte con cualquier pregunta o problema que tengas.
            </Text>
          </Section>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {supportFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Section
                variant="highlight"
                withNeon={true}
                className="brutal-border text-center p-6 h-full"
              >
                <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary neon-glow" />
                <h3 className="text-xl font-bold uppercase mb-3 neon-text">{feature.title}</h3>
                <Text size="sm" muted>{feature.description}</Text>
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
            <h3 className="text-2xl font-bold uppercase mb-4 neon-text">Preguntas Frecuentes</h3>
            <div className="space-y-4">
              <div className="border-l-[6px] border-primary pl-4">
                <h4 className="font-bold uppercase mb-2">¿Cómo puedo contactar al soporte?</h4>
                <Text size="sm" muted>
                  Puedes contactarnos a través de chat en vivo, email o teléfono. Todos los canales
                  están disponibles las 24 horas del día.
                </Text>
              </div>
              <div className="border-l-[6px] border-primary pl-4">
                <h4 className="font-bold uppercase mb-2">¿Cuál es el tiempo de respuesta?</h4>
                <Text size="sm" muted>
                  En chat en vivo respondemos instantáneamente. Para emails, el tiempo de respuesta
                  es de menos de 24 horas.
                </Text>
              </div>
              <div className="border-l-[6px] border-primary pl-4">
                <h4 className="font-bold uppercase mb-2">¿Puedo solicitar soporte para productos usados?</h4>
                <Text size="sm" muted>
                  Sí, ofrecemos soporte para todos los productos comprados en Neobit Infinity,
                  independientemente de su estado.
                </Text>
              </div>
            </div>
          </Section>
        </motion.div>
      </Container>
    </div>
  );
}

