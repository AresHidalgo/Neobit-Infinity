import { Container } from '@/shared/components/ui/Container';
import { Section } from '@/shared/components/ui/Section';
import { Text, Label } from '@/shared/components/ui/Typography';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { motion } from 'framer-motion';
import { RandomGamingIcons } from '@/shared/components/ui/GamingDecoratives';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar envío de formulario
    console.log('Form submitted:', formData);
  };

  return (
    <div className="relative min-h-screen py-12">
      <RandomGamingIcons density="medium" minSize={40} maxSize={80} className="opacity-5" />
      
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Section
            title="Contáctanos"
            subtitle="Estamos aquí para ayudarte"
            variant="accent"
            withNeon={true}
            className="brutal-border"
          >
            <Text size="lg" className="mb-6">
              ¿Tienes alguna pregunta, sugerencia o necesitas ayuda? Nuestro equipo
              está listo para asistirte.
            </Text>
          </Section>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Section
              variant="default"
              withNeon={true}
              className="brutal-border"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" required>Nombre</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
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
                    rows={6}
                    className="flex w-full brutal-border border-[6px] border-input bg-background px-5 py-3 text-base font-medium transition-all duration-300 focus-visible:outline-none focus-visible:border-primary focus-visible:border-[8px] focus-visible:neon-glow-strong hover:border-[7px] hover:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  <Send className="h-5 w-5 mr-2" />
                  Enviar Mensaje
                </Button>
              </form>
            </Section>
          </motion.div>

          {/* Información de Contacto */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {[
              { icon: Mail, title: 'Email', content: 'support@neobitinfinity.com', link: 'mailto:support@neobitinfinity.com' },
              { icon: Phone, title: 'Teléfono', content: '+1 (555) 123-4567', link: 'tel:+15551234567' },
              { icon: MapPin, title: 'Dirección', content: '123 Gaming Street, Tech City, TC 12345', link: null },
            ].map((contact, index) => (
              <motion.div
                key={contact.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Section
                  variant="highlight"
                  withNeon={true}
                  className="brutal-border"
                >
                  <div className="flex items-start gap-4">
                    <contact.icon className="h-8 w-8 text-primary neon-glow flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold uppercase mb-2 neon-text">{contact.title}</h3>
                      {contact.link ? (
                        <a href={contact.link} className="text-muted-foreground hover:text-primary transition-colors">
                          {contact.content}
                        </a>
                      ) : (
                        <Text muted>{contact.content}</Text>
                      )}
                    </div>
                  </div>
                </Section>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </div>
  );
}

