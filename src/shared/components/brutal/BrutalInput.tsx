import React from 'react';
import { cn } from '@/shared/utils/cn';

interface BrutalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const BrutalInput = React.forwardRef<HTMLInputElement, BrutalInputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block font-mono text-sm font-bold uppercase mb-2 tracking-wider">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={cn(
              "w-full bg-white border-3 border-black px-4 py-3 font-mono text-base placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-neon-green/50 focus:border-black transition-all disabled:opacity-50 disabled:cursor-not-allowed",
              error && "border-red-600 focus:ring-red-200",
              icon && "pl-12",
              className
            )}
            {...props}
          />
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black">
              {icon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 font-mono text-sm text-red-600 font-bold uppercase">
            ! {error}
          </p>
        )}
      </div>
    );
  }
);

BrutalInput.displayName = 'BrutalInput';
