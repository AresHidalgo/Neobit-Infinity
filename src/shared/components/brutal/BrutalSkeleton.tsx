import { cn } from '@/shared/utils/cn';

interface BrutalSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'dark' | 'neon';
}

export function BrutalSkeleton({ className, variant = 'default', ...props }: BrutalSkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse",
        variant === 'default' && "bg-gray-200",
        variant === 'dark' && "bg-gray-800",
        variant === 'neon' && "bg-neon-green/20",
        className
      )}
      {...props}
    />
  );
}
