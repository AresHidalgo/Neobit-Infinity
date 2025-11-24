import { Container } from '@/shared/components/ui/Container';
import { Section } from '@/shared/components/ui/Section';
import { Text } from '@/shared/components/ui/Typography';
import { motion } from 'framer-motion';
import { RandomGamingIcons } from '@/shared/components/ui/GamingDecoratives';
import { Shield, FileText, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { routesConfig } from '@/config/app.config';

const policies = [
  {
    icon: Shield,
    title: 'Política de Privacidad',
    description: 'Cómo protegemos y utilizamos tu información personal.',
    link: routesConfig.policies.privacy,
  },
  {
    icon: FileText,
    title: 'Términos y Condiciones',
    description: 'Las reglas y condiciones para usar nuestros servicios.',
    link: routesConfig.policies.terms,
  },
  {
    icon: RefreshCw,
    title: 'Política de Devoluciones',
    description: 'Cómo funcionan las devoluciones y reembolsos.',
    link: routesConfig.policies.returns,
  },
];

export function Policies() {
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
            title="Políticas"
            subtitle="Términos, privacidad y devoluciones"
            variant="accent"
            withNeon={true}
            className="brutal-border"
          >
            <Text size="lg" className="mb-6">
              En Neobit Infinity, valoramos la transparencia y la confianza. Aquí puedes
              encontrar todas nuestras políticas para que sepas exactamente cómo funcionamos.
            </Text>
          </Section>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {policies.map((policy, index) => (
            <motion.div
              key={policy.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Link to={policy.link}>
                <Section
                  variant="highlight"
                  withNeon={true}
                  className="brutal-border text-center p-6 cursor-pointer h-full"
                >
                  <policy.icon className="h-12 w-12 mx-auto mb-4 text-primary neon-glow" />
                  <h3 className="text-xl font-bold uppercase mb-3 neon-text">{policy.title}</h3>
                  <Text size="sm" muted>{policy.description}</Text>
                </Section>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}

