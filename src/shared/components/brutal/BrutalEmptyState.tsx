import { ReactNode } from 'react';
import { BrutalButton } from './BrutalButton';
import { BrutalCard } from './BrutalCard';
import { LucideIcon } from 'lucide-react';

interface BrutalEmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
  children?: ReactNode;
}

export function BrutalEmptyState({
  title,
  description,
  icon: Icon,
  actionLabel,
  onAction,
  children
}: BrutalEmptyStateProps) {
  return (
    <BrutalCard className="flex flex-col items-center justify-center text-center py-12 px-6 border-dashed border-4 border-gray-300">
      {Icon && (
        <div className="mb-6 p-6 bg-gray-100 border-4 border-black rounded-full">
          <Icon className="w-12 h-12 text-black" />
        </div>
      )}
      
      <h3 className="font-heading text-3xl uppercase mb-4">{title}</h3>
      <p className="font-mono text-gray-500 max-w-md mb-8 text-lg">
        {description}
      </p>

      {children}

      {actionLabel && onAction && (
        <BrutalButton onClick={onAction}>
          {actionLabel}
        </BrutalButton>
      )}
    </BrutalCard>
  );
}
