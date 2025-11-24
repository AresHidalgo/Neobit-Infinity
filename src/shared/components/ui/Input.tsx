import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-foreground mb-1">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'flex h-12 w-full brutal-border border-[4px] border-input bg-background px-5 py-3 text-base font-normal transition-all duration-300 ease-out file:border-0 file:bg-transparent file:text-base file:font-normal placeholder:text-muted-foreground/70 placeholder:font-normal focus-visible:outline-none focus-visible:border-primary focus-visible:border-[6px] focus-visible:neon-glow-hover hover:border-[5px] hover:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-destructive border-[6px] focus-visible:shadow-[0_0_15px_hsl(var(--destructive)/0.5)]',
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-destructive">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };

