import { Container } from '@/shared/components/ui/Container';
import { Section } from '@/shared/components/ui/Section';
import { Heading1, Text } from '@/shared/components/ui/Typography';
import { motion } from 'framer-motion';
import { RandomGamingIcons } from '@/shared/components/ui/GamingDecoratives';
import { Users, Target, Award, Zap } from 'lucide-react';

export function About() {
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
            title="Sobre Neobit Infinity"
            subtitle="Tu destino gaming y tecnológico"
            variant="accent"
            withNeon={true}
            className="brutal-border"
          >
            <Text size="lg" className="mb-6">
              Neobit Infinity es más que una tienda: es el punto de encuentro para gamers,
              tech enthusiasts y creadores que buscan la última tecnología y gaming gear.
            </Text>
            <Text>
              Fundada con la visión de democratizar el acceso a la tecnología gaming de élite,
              nos especializamos en productos que transforman la experiencia digital.
            </Text>
          </Section>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Users, title: 'Comunidad', description: 'Conectamos a millones de gamers' },
            { icon: Target, title: 'Innovación', description: 'Siempre al día con las últimas tendencias' },
            { icon: Award, title: 'Calidad', description: 'Productos verificados y garantizados' },
            { icon: Zap, title: 'Velocidad', description: 'Entrega rápida y servicio excepcional' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Section
                variant="highlight"
                withNeon={true}
                className="brutal-border h-full text-center p-6"
              >
                <item.icon className="h-12 w-12 mx-auto mb-4 text-primary neon-glow" />
                <h3 className="text-xl font-bold uppercase mb-2 neon-text">{item.title}</h3>
                <Text size="sm" muted>{item.description}</Text>
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
            title="Nuestra Misión"
            subtitle="Transformar la experiencia gaming"
            variant="default"
            withNeon={true}
            className="brutal-border"
          >
            <Text size="lg" className="mb-4">
              Creemos que cada gamer merece tener acceso a las mejores herramientas
              para alcanzar su máximo potencial.
            </Text>
            <Text>
              Trabajamos día a día para ofrecer productos de alta calidad, precios competitivos
              y un servicio al cliente que realmente marca la diferencia.
            </Text>
          </Section>
        </motion.div>
      </Container>
    </div>
  );
}

