import { BrutalCard } from '@/shared/components/brutal/BrutalCard';
import { Container } from '@/shared/components/ui/Container';
import { motion } from 'framer-motion';

export function TermsOfService() {
  return (
    <Container className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-8 text-center">
          <h1 className="font-heading text-4xl lg:text-6xl uppercase mb-4">Términos de Servicio</h1>
          <p className="font-mono text-xl text-gray-600">Última actualización: Diciembre 2025</p>
        </div>

        <BrutalCard className="bg-white border-4 border-black p-8 lg:p-12 space-y-8">
          <section>
            <h2 className="font-heading text-2xl uppercase mb-4 border-b-4 border-neon-green inline-block">1. Aceptación de Términos</h2>
            <p className="font-mono text-lg leading-relaxed">
              Al acceder y usar la plataforma Neobit Infinity, aceptas estar legalmente vinculado por estos Términos de Servicio. Si no estás de acuerdo con alguna parte de estos términos, no debes usar nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl uppercase mb-4 border-b-4 border-neon-pink inline-block">2. Uso de la Plataforma</h2>
            <div className="font-mono text-lg space-y-3">
              <p className="font-bold">Debes:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Ser mayor de 18 años para crear una cuenta.</li>
                <li>Proporcionar información precisa y actualizada.</li>
                <li>Mantener la confidencialidad de tus credenciales.</li>
                <li>Usar la plataforma de manera legal y ética.</li>
              </ul>
              <p className="font-bold mt-4">No debes:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Publicar contenido falso, engañoso o ilegal.</li>
                <li>Intentar acceder a áreas restringidas de la plataforma.</li>
                <li>Realizar actividades que puedan dañar o sobrecargar nuestros sistemas.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl uppercase mb-4 border-b-4 border-neon-blue inline-block">3. Compras y Pagos</h2>
            <p className="font-mono text-lg leading-relaxed">
              Todas las compras están sujetas a disponibilidad. Nos reservamos el derecho de rechazar o cancelar pedidos. Los precios pueden cambiar sin previo aviso. Los pagos se procesan de forma segura a través de proveedores de pago certificados.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl uppercase mb-4 border-b-4 border-neon-yellow inline-block">4. Vendedores</h2>
            <p className="font-mono text-lg leading-relaxed">
              Los vendedores deben cumplir con todas las leyes aplicables. Neobit Infinity actúa como intermediario y no es responsable de las transacciones entre compradores y vendedores. Nos reservamos el derecho de suspender o eliminar cuentas de vendedores que violen nuestras políticas.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl uppercase mb-4 border-b-4 border-black inline-block">5. Propiedad Intelectual</h2>
            <p className="font-mono text-lg leading-relaxed">
              Todo el contenido de Neobit Infinity, incluyendo diseño, logos, gráficos y código fuente, está protegido por derechos de autor y es propiedad de DevsCode. No está permitida la reproducción sin autorización expresa.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl uppercase mb-4 border-b-4 border-neon-pink inline-block">6. Limitación de Responsabilidad</h2>
            <p className="font-mono text-lg leading-relaxed">
              Neobit Infinity no será responsable por daños indirectos, incidentales o consecuentes derivados del uso de la plataforma. Nuestra responsabilidad máxima está limitada al monto pagado por el producto o servicio en cuestión.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl uppercase mb-4 border-b-4 border-neon-green inline-block">7. Modificaciones</h2>
            <p className="font-mono text-lg leading-relaxed">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación. Tu uso continuado de la plataforma constituye aceptación de los términos modificados.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl uppercase mb-4 border-b-4 border-neon-blue inline-block">8. Contacto</h2>
            <p className="font-mono text-lg leading-relaxed">
              Para preguntas sobre estos términos, contáctanos en <a href="mailto:legal@neobitinfinity.com" className="text-neon-blue font-bold hover:underline">legal@neobitinfinity.com</a>.
            </p>
          </section>
        </BrutalCard>
      </motion.div>
    </Container>
  );
}
