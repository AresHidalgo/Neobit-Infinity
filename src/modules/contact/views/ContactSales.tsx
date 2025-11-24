import { Container } from '@/shared/components/ui/Container';
import { Section } from '@/shared/components/ui/Section';
import { Heading1, Text, Label } from '@/shared/components/ui/Typography';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { motion } from 'framer-motion';
import { RandomGamingIcons } from '@/shared/components/ui/GamingDecoratives';
import { TrendingUp, Mail, Phone } from 'lucide-react';
import { useState } from 'react';

export function ContactSales() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar envío
    console.log('Sales form submitted:', formData);
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
            title="Ventas"
            subtitle="Conecta con nuestro equipo comercial"
            variant="accent"
            withNeon={true}
            className="brutal-border"
          >
            <Text size="lg" className="mb-6">
              ¿Eres una empresa buscando productos al por mayor o necesitas un presupuesto
              personalizado? Nuestro equipo de ventas puede ayudarte.
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
                  <Label htmlFor="company">Empresa (opcional)</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
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
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Contactar Ventas
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
              <h3 className="text-xl font-bold uppercase mb-2 neon-text">Email de Ventas</h3>
              <a href="mailto:sales@neobitinfinity.com" className="text-muted-foreground hover:text-primary transition-colors">
                sales@neobitinfinity.com
              </a>
            </Section>
            
            <Section variant="highlight" withNeon={true} className="brutal-border">
              <Phone className="h-8 w-8 text-primary neon-glow mb-4" />
              <h3 className="text-xl font-bold uppercase mb-2 neon-text">Teléfono</h3>
              <a href="tel:+15551234568" className="text-muted-foreground hover:text-primary transition-colors">
                +1 (555) 123-4568
              </a>
              <Text size="sm" muted className="mt-2">Lunes a Viernes, 8am - 7pm EST</Text>
            </Section>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}

