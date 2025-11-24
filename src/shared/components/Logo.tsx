import { Link } from 'react-router-dom';
import { routesConfig } from '@/config/app.config';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'compact';
  showText?: boolean;
}

export function Logo({ className = '', variant = 'default', showText = true }: LogoProps) {
  const logoContent = (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Icon/Symbol */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative w-10 h-10 md:w-12 md:h-12">
          {/* Infinity Symbol */}
          <svg
            viewBox="0 0 48 48"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--primary) / 0.7)" />
              </linearGradient>
            </defs>
            <path
              d="M24 16C20 12 16 12 13 15C10 18 10 22 13 25C16 28 20 28 24 24C28 28 32 28 35 25C38 22 38 18 35 15C32 12 28 12 24 16Z"
              stroke="url(#infinityGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M24 32C20 36 16 36 13 33C10 30 10 26 13 23C16 20 20 20 24 24C28 20 32 20 35 23C38 26 38 30 35 33C32 36 28 36 24 32Z"
              stroke="url(#infinityGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Accent pixels */}
            <circle cx="18" cy="20" r="1.5" fill="hsl(var(--primary))" opacity="0.8" />
            <circle cx="30" cy="28" r="1.5" fill="hsl(var(--primary))" opacity="0.8" />
          </svg>
        </div>
      </motion.div>

      {/* Logo Text */}
      {showText && (
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent tracking-tight leading-none">
            Neobit
          </span>
          <span className="text-xs md:text-sm font-medium text-muted-foreground tracking-wider uppercase leading-none">
            Infinity
          </span>
        </motion.div>
      )}
    </div>
  );

  if (variant === 'compact') {
    return (
      <Link to={routesConfig.home} className="inline-block transition-opacity hover:opacity-80">
        {logoContent}
      </Link>
    );
  }

  return (
    <Link to={routesConfig.home} className="inline-block transition-opacity hover:opacity-80">
      {logoContent}
    </Link>
  );
}

