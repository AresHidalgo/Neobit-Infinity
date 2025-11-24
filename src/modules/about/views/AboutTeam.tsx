import { Container } from '@/shared/components/ui/Container';
import { Section } from '@/shared/components/ui/Section';
import { Heading1, Text } from '@/shared/components/ui/Typography';
import { motion } from 'framer-motion';
import { RandomGamingIcons } from '@/shared/components/ui/GamingDecoratives';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/Avatar';
import { Github, Linkedin, Mail } from 'lucide-react';

const teamMembers = [
  {
    name: 'Alex Tech',
    role: 'CEO & Founder',
    avatar: 'https://i.pravatar.cc/150?img=12',
    bio: 'Visionario del gaming y tecnología con 15+ años de experiencia.',
  },
  {
    name: 'Sara Game',
    role: 'CTO',
    avatar: 'https://i.pravatar.cc/150?img=47',
    bio: 'Ingeniera de software apasionada por crear experiencias únicas.',
  },
  {
    name: 'Mike Pro',
    role: 'Head of Gaming',
    avatar: 'https://i.pravatar.cc/150?img=33',
    bio: 'Ex-profesional gamer, ahora conecta a la comunidad con el mejor gear.',
  },
  {
    name: 'Luna Design',
    role: 'Creative Director',
    avatar: 'https://i.pravatar.cc/150?img=45',
    bio: 'Diseñadora que transforma ideas en experiencias visuales impactantes.',
  },
];

export function AboutTeam() {
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
            title="Nuestro Equipo"
            subtitle="Los gamers detrás de Neobit Infinity"
            variant="accent"
            withNeon={true}
            className="brutal-border"
          >
            <Text size="lg" className="mb-6">
              Somos un equipo diverso de apasionados por el gaming, la tecnología
              y la innovación, trabajando juntos para ofrecerte la mejor experiencia.
            </Text>
          </Section>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Section
                variant="highlight"
                withNeon={true}
                className="brutal-border text-center p-6"
              >
                <Avatar className="h-24 w-24 mx-auto mb-4 brutal-border border-[6px] border-primary">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="text-2xl font-black">{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold uppercase mb-1 neon-text">{member.name}</h3>
                <p className="text-sm font-bold text-primary mb-3 uppercase">{member.role}</p>
                <Text size="sm" muted className="mb-4">{member.bio}</Text>
                <div className="flex justify-center gap-3">
                  <Github className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                  <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                  <Mail className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                </div>
              </Section>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}

