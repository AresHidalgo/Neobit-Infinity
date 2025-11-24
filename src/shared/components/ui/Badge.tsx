import { HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const badgeVariants = cva(
  'inline-flex items-center brutal-border border-[3px] px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ease-out focus:outline-none focus:brutal-focus relative group',
  {
    variants: {
      variant: {
        default: 'border-primary bg-primary text-primary-foreground hover:neon-glow-hover hover:border-[4px] hover:scale-105',
        secondary: 'border-secondary bg-secondary text-secondary-foreground hover:border-primary hover:border-[4px] hover:neon-glow-hover hover:scale-105',
        destructive: 'border-destructive bg-destructive text-destructive-foreground hover:border-[4px] hover:shadow-[0_0_12px_hsl(var(--destructive)/0.5)] hover:scale-105',
        outline: 'border-foreground border-[3px] text-foreground bg-transparent hover:border-primary hover:border-[4px] hover:neon-border-hover hover:scale-105',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

