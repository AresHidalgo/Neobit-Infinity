import { useState } from 'react';
import { Label } from '@/shared/components/ui/Label';
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/Radio';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/Select';
import { Separator } from '@/shared/components/ui/Separator';

interface VariantsSelectorProps {
  variants?: {
    color?: string[];
    size?: string[];
    material?: string[];
  };
  onVariantChange?: (variant: Record<string, string>) => void;
}

export function VariantsSelector({ variants, onVariantChange }: VariantsSelectorProps) {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  const updateVariant = (key: string, value: string) => {
    const newVariants = { ...selectedVariants, [key]: value };
    setSelectedVariants(newVariants);
    onVariantChange?.(newVariants);
  };

  if (!variants || Object.keys(variants).length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <Separator />
      {variants.color && variants.color.length > 0 && (
        <div>
          <Label className="text-base font-semibold mb-2 block">Color</Label>
          <RadioGroup
            value={selectedVariants.color || variants.color[0]}
            onValueChange={(value) => updateVariant('color', value)}
          >
            <div className="flex gap-2">
              {variants.color.map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <RadioGroupItem value={color} id={`color-${color}`} />
                  <Label htmlFor={`color-${color}`} className="cursor-pointer">
                    {color}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      )}

      {variants.size && variants.size.length > 0 && (
        <div>
          <Label className="text-base font-semibold mb-2 block">Size</Label>
          <RadioGroup
            value={selectedVariants.size || variants.size[0]}
            onValueChange={(value) => updateVariant('size', value)}
          >
            <div className="flex gap-2">
              {variants.size.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <RadioGroupItem value={size} id={`size-${size}`} />
                  <Label htmlFor={`size-${size}`} className="cursor-pointer">
                    {size}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      )}

      {variants.material && variants.material.length > 0 && (
        <div>
          <Label className="text-base font-semibold mb-2 block">Material</Label>
          <Select
            value={selectedVariants.material || variants.material[0]}
            onValueChange={(value) => updateVariant('material', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {variants.material.map((material) => (
                <SelectItem key={material} value={material}>
                  {material}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}

