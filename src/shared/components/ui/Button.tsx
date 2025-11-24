import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center brutal-border-minimal text-sm font-bold uppercase tracking-wider transition-all duration-300 ease-out focus-visible:outline-none focus-visible:brutal-focus disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground border-primary border-[4px] hover:neon-glow-hover hover:border-[6px] active:brutal-shadow-pressed hover:scale-[1.02] hover:-translate-y-1',
        destructive: 'bg-destructive text-destructive-foreground border-destructive border-[4px] hover:shadow-[0_0_15px_hsl(var(--destructive)/0.5)] active:brutal-shadow-pressed hover:scale-[1.02] hover:-translate-y-1',
        outline: 'border-[4px] border-foreground bg-background text-foreground hover:border-primary hover:border-[6px] hover:neon-border-hover hover:text-primary hover:scale-[1.02] hover:-translate-y-1',
        secondary: 'bg-secondary text-secondary-foreground border-secondary border-[4px] hover:border-primary hover:border-[6px] hover:neon-glow-hover hover:scale-[1.02] hover:-translate-y-1',
        ghost: 'border-[2px] border-transparent hover:border-primary hover:border-[4px] hover:neon-border-hover hover:text-primary hover:scale-[1.02]',
        link: 'border-0 text-primary underline-offset-4 hover:underline hover:neon-text hover:scale-[1.05]',
      },
      size: {
        default: 'h-12 px-6 py-3 text-base',
        sm: 'h-10 px-5 py-2 text-sm',
        lg: 'h-14 px-8 py-4 text-lg',
        icon: 'h-12 w-12 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };

