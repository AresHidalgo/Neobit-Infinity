import React from 'react';
import { cn } from '@/shared/utils/cn';
import { motion, HTMLMotionProps } from 'framer-motion';

interface BrutalButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

export const BrutalButton = React.forwardRef<HTMLButtonElement, BrutalButtonProps>(
  ({ className, children, variant = 'primary', size = 'md', fullWidth = false, ...props }, ref) => {
    const baseStyles = "font-heading uppercase tracking-wider transition-all duration-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-neon-green text-black border-3 border-black shadow-brutal hover:bg-neon-yellow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg",
      secondary: "bg-neon-pink text-white border-3 border-black shadow-brutal hover:bg-pink-500 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg",
      outline: "bg-white text-black border-3 border-black shadow-brutal hover:bg-brutal-gray hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg",
      ghost: "bg-transparent text-black border-3 border-transparent hover:bg-brutal-gray/20 hover:border-black",
      danger: "bg-red-600 text-white border-3 border-black shadow-brutal hover:bg-red-500 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg",
    };

    const sizes = {
      sm: "px-3 py-1 text-sm border-2 shadow-brutal-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
      xl: "px-10 py-5 text-xl",
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

BrutalButton.displayName = 'BrutalButton';
