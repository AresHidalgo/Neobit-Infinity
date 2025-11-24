import { Outlet } from 'react-router-dom';
import { ParticlesBackground } from '@/shared/particles/ParticlesBackground';
import { Logo } from '@/shared/components/Logo';
import { motion } from 'framer-motion';

export function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8">
      <ParticlesBackground
        particleCount={150}
        opacity={0.65}
      />
      <motion.div
        className="max-w-md w-full space-y-8 relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <Logo />
        </motion.div>
        <Outlet />
      </motion.div>
    </div>
  );
}

