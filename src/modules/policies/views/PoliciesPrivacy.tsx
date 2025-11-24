import { Container } from '@/shared/components/ui/Container';
import { Section } from '@/shared/components/ui/Section';
import { Text } from '@/shared/components/ui/Typography';
import { motion } from 'framer-motion';
import { RandomGamingIcons } from '@/shared/components/ui/GamingDecoratives';
import { Shield } from 'lucide-react';

export function PoliciesPrivacy() {
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
            title="Política de Privacidad"
            subtitle="Cómo protegemos tu información"
            variant="accent"
            withNeon={true}
            className="brutal-border"
          >
            <Text size="lg" className="mb-6">
              Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Text>
          </Section>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {[
            {
              title: 'Información que Recopilamos',
              content: 'Recopilamos información que nos proporcionas directamente, como tu nombre, dirección de email, dirección postal, número de teléfono e información de pago cuando realizas una compra.',
            },
            {
              title: 'Cómo Usamos tu Información',
              content: 'Utilizamos tu información para procesar tus pedidos, comunicarnos contigo, mejorar nuestros servicios, personalizar tu experiencia y cumplir con nuestras obligaciones legales.',
            },
            {
              title: 'Compartir Información',
              content: 'No vendemos tu información personal. Podemos compartir tu información con proveedores de servicios que nos ayudan a operar nuestro negocio, siempre bajo estrictas medidas de seguridad.',
            },
            {
              title: 'Seguridad',
              content: 'Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra acceso no autorizado, alteración, divulgación o destrucción.',
            },
            {
              title: 'Tus Derechos',
              content: 'Tienes derecho a acceder, rectificar, eliminar o portar tus datos personales, así como a oponerte al procesamiento de los mismos. Puedes ejercer estos derechos contactándonos.',
            },
          ].map((section, index) => (
            <Section
              key={section.title}
              variant={index % 2 === 0 ? 'default' : 'highlight'}
              withNeon={true}
              className="brutal-border"
            >
              <div className="flex items-start gap-4">
                <Shield className="h-8 w-8 text-primary neon-glow flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold uppercase mb-3 neon-text">{section.title}</h3>
                  <Text>{section.content}</Text>
                </div>
              </div>
            </Section>
          ))}
        </motion.div>
      </Container>
    </div>
  );
}

