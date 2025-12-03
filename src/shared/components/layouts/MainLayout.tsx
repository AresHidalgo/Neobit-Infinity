import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { ParticlesBackground } from '../ParticlesBackground';
import { ThemeTransition } from '@/shared/components/ThemeTransition';
import { BrutalChatbot } from '@/shared/components/brutal/BrutalChatbot';

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <ParticlesBackground />
      <ThemeTransition />
      {/* Brutalist Exposed Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }} />
      <div className="fixed inset-0 z-0 pointer-events-none border-[20px] border-transparent border-l-neon-green/20 border-r-neon-pink/20 mix-blend-multiply" />
      <Header />
      <main className="flex-1 relative z-10"><Outlet /></main>
      <Footer />
      <BrutalChatbot />
    </div>
  );
}

