import React from 'react';
import { cn } from '@/shared/utils/cn';

interface BrutalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
  variant?: 'default' | 'neon' | 'dark';
}

export const BrutalCard = React.forwardRef<HTMLDivElement, BrutalCardProps>(
  ({ className, children, hoverable = false, variant = 'default', ...props }, ref) => {
    const baseStyles = "border-3 border-black p-6 bg-white shadow-brutal";
    
    const variants = {
      default: "bg-white",
      neon: "bg-neon-green",
      dark: "bg-black text-white border-white shadow-[4px_4px_0px_0px_#ffffff]",
    };

    const hoverStyles = hoverable 
      ? "transition-all duration-200 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-brutal-lg cursor-pointer" 
      : "";

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          hoverStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

BrutalCard.displayName = 'BrutalCard';
