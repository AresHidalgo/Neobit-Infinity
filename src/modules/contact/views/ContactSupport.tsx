import { Container } from '@/shared/components/ui/Container';
import { Section } from '@/shared/components/ui/Section';
import { Heading1, Text, Label } from '@/shared/components/ui/Typography';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { motion } from 'framer-motion';
import { RandomGamingIcons } from '@/shared/components/ui/GamingDecoratives';
import { MessageSquare, Mail, Phone } from 'lucide-react';
import { useState } from 'react';

export function ContactSupport() {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar envío
    console.log('Support form submitted:', formData);
  };

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
            subtitle="Estamos aquí para resolver tus problemas"
            variant="accent"
            withNeon={true}
            className="brutal-border"
          >
            <Text size="lg" className="mb-6">
              ¿Necesitas ayuda con tu pedido, producto o cuenta? Nuestro equipo de soporte
              está disponible para asistirte.
            </Text>
          </Section>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Section variant="default" withNeon={true} className="brutal-border">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email" required>Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="subject" required>Asunto</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message" required>Mensaje</Label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={8}
                    className="flex w-full brutal-border border-[6px] border-input bg-background px-5 py-3 text-base font-medium transition-all duration-300 focus-visible:outline-none focus-visible:border-primary focus-visible:border-[8px] focus-visible:neon-glow-strong hover:border-[7px] hover:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Enviar Solicitud de Soporte
                </Button>
              </form>
            </Section>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Section variant="highlight" withNeon={true} className="brutal-border">
              <Mail className="h-8 w-8 text-primary neon-glow mb-4" />
              <h3 className="text-xl font-bold uppercase mb-2 neon-text">Email</h3>
              <a href="mailto:support@neobitinfinity.com" className="text-muted-foreground hover:text-primary transition-colors">
                support@neobitinfinity.com
              </a>
            </Section>
            
            <Section variant="highlight" withNeon={true} className="brutal-border">
              <Phone className="h-8 w-8 text-primary neon-glow mb-4" />
              <h3 className="text-xl font-bold uppercase mb-2 neon-text">Teléfono</h3>
              <a href="tel:+15551234567" className="text-muted-foreground hover:text-primary transition-colors">
                +1 (555) 123-4567
              </a>
              <Text size="sm" muted className="mt-2">Lunes a Viernes, 9am - 6pm EST</Text>
            </Section>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}

