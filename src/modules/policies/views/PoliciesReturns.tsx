import { Container } from '@/shared/components/ui/Container';
import { Section } from '@/shared/components/ui/Section';
import { Text } from '@/shared/components/ui/Typography';
import { motion } from 'framer-motion';
import { RandomGamingIcons } from '@/shared/components/ui/GamingDecoratives';
import { RefreshCw, Clock, Package, CheckCircle } from 'lucide-react';

const returnSteps = [
  {
    icon: Package,
    step: '1',
    title: 'Empaqueta el Producto',
    description: 'Empaqueta el producto en su embalaje original con todos los accesorios.',
  },
  {
    icon: RefreshCw,
    step: '2',
    title: 'Solicita la Devolución',
    description: 'Contacta a nuestro soporte para iniciar el proceso de devolución.',
  },
  {
    icon: Clock,
    step: '3',
    title: 'Envía el Producto',
    description: 'Envía el producto de vuelta usando el método de envío que te proporcionamos.',
  },
  {
    icon: CheckCircle,
    step: '4',
    title: 'Recibe tu Reembolso',
    description: 'Una vez recibido y verificado, procesaremos tu reembolso en 5-7 días hábiles.',
  },
];

export function PoliciesReturns() {
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
            title="Política de Devoluciones"
            subtitle="Cómo funcionan las devoluciones y reembolsos"
            variant="accent"
            withNeon={true}
            className="brutal-border"
          >
            <Text size="lg" className="mb-6">
              Entendemos que a veces necesitas devolver un producto. Hemos simplificado
              el proceso para que sea lo más fácil posible.
            </Text>
          </Section>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {returnSteps.map((step, index) => (
            <motion.div
              key={step.step}
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
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-3xl font-black text-primary neon-text">{step.step}</span>
                  <step.icon className="h-8 w-8 text-primary neon-glow" />
                </div>
                <h3 className="text-xl font-bold uppercase mb-3 neon-text">{step.title}</h3>
                <Text size="sm" muted>{step.description}</Text>
              </Section>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <Section
            variant="default"
            withNeon={true}
            className="brutal-border"
          >
            <h3 className="text-2xl font-bold uppercase mb-4 neon-text">Política de Devolución</h3>
            <div className="space-y-4">
              <div className="border-l-[6px] border-primary pl-4">
                <h4 className="font-bold uppercase mb-2">Período de Devolución</h4>
                <Text size="sm" muted>
                  Puedes devolver cualquier producto dentro de los 30 días posteriores a la recepción
                  en su condición original y con el empaque completo.
                </Text>
              </div>
              <div className="border-l-[6px] border-primary pl-4">
                <h4 className="font-bold uppercase mb-2">Condiciones</h4>
                <Text size="sm" muted>
                  Los productos deben estar en su condición original, sin usar y con todos los accesorios
                  y documentación incluidos. No aceptamos devoluciones de productos personalizados o
                  productos de software abiertos.
                </Text>
              </div>
              <div className="border-l-[6px] border-primary pl-4">
                <h4 className="font-bold uppercase mb-2">Reembolsos</h4>
                <Text size="sm" muted>
                  Procesaremos tu reembolso en el método de pago original dentro de 5-7 días hábiles
                  después de recibir y verificar el producto devuelto.
                </Text>
              </div>
            </div>
          </Section>
        </motion.div>
      </Container>
    </div>
  );
}

