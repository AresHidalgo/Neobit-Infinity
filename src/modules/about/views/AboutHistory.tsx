import { Container } from '@/shared/components/ui/Container';
import { Section } from '@/shared/components/ui/Section';
import { Text } from '@/shared/components/ui/Typography';
import { motion } from 'framer-motion';
import { RandomGamingIcons } from '@/shared/components/ui/GamingDecoratives';
import { Calendar, Rocket, Users, Trophy } from 'lucide-react';

const milestones = [
  {
    year: '2020',
    title: 'Fundación',
    description: 'Neobit Infinity nace con la visión de revolucionar el e-commerce gaming.',
    icon: Rocket,
  },
  {
    year: '2021',
    title: 'Expansión',
    description: 'Alcanzamos 10,000 clientes satisfechos y expandimos nuestro catálogo.',
    icon: Users,
  },
  {
    year: '2022',
    title: 'Reconocimiento',
    description: 'Ganamos el premio a la mejor tienda gaming online del año.',
    icon: Trophy,
  },
  {
    year: '2024',
    title: 'Presente',
    description: 'Continuamos creciendo, mejorando y sirviendo a nuestra comunidad.',
    icon: Calendar,
  },
];

export function AboutHistory() {
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
            title="Nuestra Historia"
            subtitle="Un viaje de innovación y pasión"
            variant="accent"
            withNeon={true}
            className="brutal-border"
          >
            <Text size="lg" className="mb-6">
              Desde nuestros humildes comienzos hasta convertirnos en líderes del sector,
              cada paso ha sido guiado por la pasión por el gaming y la tecnología.
            </Text>
          </Section>
        </motion.div>

        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <Section
                variant={index % 2 === 0 ? 'default' : 'highlight'}
                withNeon={true}
                className="brutal-border"
              >
                <div className="flex items-start gap-6">
                  <milestone.icon className="h-12 w-12 text-primary neon-glow flex-shrink-0" />
                  <div>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-3xl font-black text-primary neon-text">{milestone.year}</span>
                      <h3 className="text-2xl font-bold uppercase">{milestone.title}</h3>
                    </div>
                    <Text>{milestone.description}</Text>
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

