import { Container } from '@/shared/components/ui/Container';
import { Section } from '@/shared/components/ui/Section';
import { Text } from '@/shared/components/ui/Typography';
import { motion } from 'framer-motion';
import { RandomGamingIcons } from '@/shared/components/ui/GamingDecoratives';
import { FileText } from 'lucide-react';

export function PoliciesTerms() {
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
            title="Términos y Condiciones"
            subtitle="Las reglas para usar nuestros servicios"
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
              title: 'Aceptación de los Términos',
              content: 'Al acceder y usar nuestro sitio web y servicios, aceptas estar sujeto a estos términos y condiciones. Si no estás de acuerdo, no debes usar nuestros servicios.',
            },
            {
              title: 'Uso del Sitio Web',
              content: 'Te concedemos una licencia limitada, no exclusiva y no transferible para acceder y usar nuestro sitio web para fines personales y no comerciales. No puedes reproducir, duplicar, copiar, vender o explotar nuestro sitio web sin nuestro permiso previo por escrito.',
            },
            {
              title: 'Productos y Precios',
              content: 'Nos reservamos el derecho de modificar precios, productos y disponibilidad en cualquier momento. Hacemos todo lo posible para asegurar que la información sea precisa, pero no garantizamos que todos los productos estén disponibles en todo momento.',
            },
            {
              title: 'Pedidos y Pagos',
              content: 'Todos los pedidos están sujetos a aceptación. Nos reservamos el derecho de rechazar cualquier pedido. El pago debe realizarse mediante los métodos de pago aceptados. Los precios son en USD a menos que se indique lo contrario.',
            },
            {
              title: 'Propiedad Intelectual',
              content: 'Todo el contenido de nuestro sitio web, incluyendo textos, gráficos, logotipos, iconos, imágenes y software, es propiedad de Neobit Infinity o sus proveedores de contenido y está protegido por leyes de propiedad intelectual.',
            },
          ].map((section, index) => (
            <Section
              key={section.title}
              variant={index % 2 === 0 ? 'default' : 'highlight'}
              withNeon={true}
              className="brutal-border"
            >
              <div className="flex items-start gap-4">
                <FileText className="h-8 w-8 text-primary neon-glow flex-shrink-0 mt-1" />
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

