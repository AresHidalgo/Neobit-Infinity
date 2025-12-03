import { BrutalCard } from '@/shared/components/brutal/BrutalCard';
import { Container } from '@/shared/components/ui/Container';
import { motion } from 'framer-motion';

export function PrivacyPolicy() {
  return (
    <Container className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-8 text-center">
          <h1 className="font-heading text-4xl lg:text-6xl uppercase mb-4">Política de Privacidad</h1>
          <p className="font-mono text-xl text-gray-600">Última actualización: Diciembre 2025</p>
        </div>

        <BrutalCard className="bg-white border-4 border-black p-8 lg:p-12 space-y-8">
          <section>
            <h2 className="font-heading text-2xl uppercase mb-4 border-b-4 border-neon-green inline-block">1. Introducción</h2>
            <p className="font-mono text-lg leading-relaxed">
              En Neobit Infinity, nos tomamos muy en serio tu privacidad. Esta política describe cómo recopilamos, usamos y protegemos tu información personal cuando utilizas nuestra plataforma.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl uppercase mb-4 border-b-4 border-neon-pink inline-block">2. Información que Recopilamos</h2>
            <ul className="list-disc list-inside font-mono text-lg space-y-2 ml-4">
              <li>Información de registro (nombre, correo electrónico, contraseña).</li>
              <li>Información de transacciones (detalles de pago, historial de compras).</li>
              <li>Información de uso (interacciones con la plataforma, preferencias).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl uppercase mb-4 border-b-4 border-neon-blue inline-block">3. Uso de la Información</h2>
            <p className="font-mono text-lg leading-relaxed">
              Utilizamos tu información para procesar pedidos, mejorar nuestros servicios, personalizar tu experiencia y comunicarnos contigo sobre actualizaciones y ofertas relevantes.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl uppercase mb-4 border-b-4 border-neon-yellow inline-block">4. Seguridad de Datos</h2>
            <p className="font-mono text-lg leading-relaxed">
              Implementamos medidas de seguridad robustas, incluyendo encriptación y protocolos seguros, para proteger tus datos contra accesos no autorizados.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl uppercase mb-4 border-b-4 border-black inline-block">5. Contacto</h2>
            <p className="font-mono text-lg leading-relaxed">
              Si tienes preguntas sobre nuestra política de privacidad, contáctanos en <a href="mailto:privacy@neobitinfinity.com" className="text-neon-blue font-bold hover:underline">privacy@neobitinfinity.com</a>.
            </p>
          </section>
        </BrutalCard>
      </motion.div>
    </Container>
  );
}
