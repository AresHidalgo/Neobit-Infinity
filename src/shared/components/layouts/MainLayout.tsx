import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { ParticlesBackground } from '@/shared/particles/ParticlesBackground';
import { ThemeTransition } from '@/shared/components/ThemeTransition';

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <ThemeTransition />
      <ParticlesBackground
        particleCount={200}
        opacity={0.65}
      />
      <Header />
      <main className="flex-1 relative z-10"><Outlet /></main>
      <Footer />
    </div>
  );
}

