import React from 'react';
import { cn } from '@/shared/utils/cn';

interface BrutalBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'neon' | 'hot' | 'dark';
  size?: 'sm' | 'md';
}

export const BrutalBadge = React.forwardRef<HTMLSpanElement, BrutalBadgeProps>(
  ({ className, children, variant = 'default', size = 'sm', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-mono font-bold uppercase tracking-wide border-2 border-black";
    
    const variants = {
      default: "bg-gray-200 text-black",
      outline: "bg-transparent text-black border-black",
      neon: "bg-neon-green text-black",
      hot: "bg-neon-pink text-white",
      dark: "bg-black text-white border-black",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
    };

    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

BrutalBadge.displayName = 'BrutalBadge';
