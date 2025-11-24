
import { X } from 'lucide-react';
import { Badge } from '@/shared/components/ui/Badge';

interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

export function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <Badge variant="secondary" className="flex items-center gap-1 cursor-pointer" onClick={onRemove}>
      {label}
      <X className="h-3 w-3" />
    </Badge>
  );
}

