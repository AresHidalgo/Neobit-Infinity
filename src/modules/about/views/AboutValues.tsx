import { Container } from '@/shared/components/ui/Container';
import { Section } from '@/shared/components/ui/Section';
import { Text } from '@/shared/components/ui/Typography';
import { motion } from 'framer-motion';
import { RandomGamingIcons } from '@/shared/components/ui/GamingDecoratives';
import { Heart, Shield, Zap, Users } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Pasión',
    description: 'Amamos el gaming y la tecnología tanto como tú. Cada producto que seleccionamos pasa por nuestro filtro de calidad y pasión.',
  },
  {
    icon: Shield,
    title: 'Confianza',
    description: 'Transparencia total en precios, políticas y procesos. Tu confianza es nuestro activo más valioso.',
  },
  {
    icon: Zap,
    title: 'Innovación',
    description: 'Siempre buscamos lo último y lo mejor. Nuestro equipo está constantemente explorando nuevas tecnologías y tendencias.',
  },
  {
    icon: Users,
    title: 'Comunidad',
    description: 'No solo vendemos productos, construimos comunidad. Escuchamos a nuestros clientes y crecemos juntos.',
  },
];

export function AboutValues() {
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
            title="Nuestros Valores"
            subtitle="Los principios que guían cada decisión"
            variant="accent"
            withNeon={true}
            className="brutal-border"
          >
            <Text size="lg" className="mb-6">
              En Neobit Infinity, nuestros valores no son solo palabras:
              son el fundamento de todo lo que hacemos.
            </Text>
          </Section>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Section
                variant={index % 2 === 0 ? 'default' : 'highlight'}
                withNeon={true}
                className="brutal-border h-full p-6"
              >
                <div className="flex items-start gap-4">
                  <value.icon className="h-12 w-12 text-primary neon-glow flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold uppercase mb-3 neon-text">{value.title}</h3>
                    <Text>{value.description}</Text>
                  </div>
                </div>
              </Section>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}

