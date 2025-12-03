import { BrutalCard } from '@/shared/components/brutal/BrutalCard';
import { BrutalButton } from '@/shared/components/brutal/BrutalButton';
import { BrutalInput } from '@/shared/components/brutal/BrutalInput';
import { Checkbox } from '@/shared/components/ui/Checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/Select';
import { Separator } from '@/shared/components/ui/Separator';
import { categories } from '@/data/categories.mock';
import { SearchFilters } from '@/types/search.type';

interface FilterPanelProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
}

export function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  const updateFilter = <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <BrutalCard className="sticky top-4 border-4 border-black bg-white p-6">
      <div className="mb-6">
        <h2 className="font-heading text-2xl uppercase">Filtros</h2>
      </div>
      <div className="space-y-8">
        {/* Category Filter */}
        <div>
          <label className="font-mono font-bold uppercase text-sm mb-3 block">Categoría</label>
          <Select
            value={filters.category || 'all'}
            onValueChange={(value) => updateFilter('category', value === 'all' ? undefined : value)}
          >
            <SelectTrigger className="border-3 border-black rounded-none font-mono focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Todas las Categorías" />
            </SelectTrigger>
            <SelectContent className="border-3 border-black rounded-none">
              <SelectItem value="all" className="font-mono">Todas las Categorías</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id} className="font-mono">
                  {cat.icon} {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator className="bg-black/10" />

        {/* Price Range */}
        <div>
          <label className="font-mono font-bold uppercase text-sm mb-3 block">Rango de Precio</label>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BrutalInput
                type="number"
                placeholder="Min"
                value={filters.minPrice || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFilter('minPrice', e.target.value ? parseFloat(e.target.value) : undefined)}
                className="w-full text-sm"
              />
              <span className="font-mono font-bold">-</span>
              <BrutalInput
                type="number"
                placeholder="Max"
                value={filters.maxPrice || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFilter('maxPrice', e.target.value ? parseFloat(e.target.value) : undefined)}
                className="w-full text-sm"
              />
            </div>
          </div>
        </div>

        <Separator className="bg-black/10" />

        {/* Rating Filter */}
        <div>
          <label className="font-mono font-bold uppercase text-sm mb-3 block">Calificación Mínima</label>
          <Select
            value={filters.minRating?.toString() || 'all'}
            onValueChange={(value) => updateFilter('minRating', value === 'all' ? undefined : parseFloat(value))}
          >
            <SelectTrigger className="border-3 border-black rounded-none font-mono focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Cualquier Calificación" />
            </SelectTrigger>
            <SelectContent className="border-3 border-black rounded-none">
              <SelectItem value="all" className="font-mono">Cualquiera</SelectItem>
              <SelectItem value="4" className="font-mono">4+ Estrellas</SelectItem>
              <SelectItem value="3" className="font-mono">3+ Estrellas</SelectItem>
              <SelectItem value="2" className="font-mono">2+ Estrellas</SelectItem>
              <SelectItem value="1" className="font-mono">1+ Estrellas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator className="bg-black/10" />

        {/* Brand Filter (Mocked) */}
        <div>
          <label className="font-mono font-bold uppercase text-sm mb-3 block">Marcas</label>
          <div className="space-y-2">
            {['NeoTech', 'CyberSystems', 'RetroFuture', 'GlitchCorp'].map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox id={`brand-${brand}`} className="border-2 border-black rounded-none data-[state=checked]:bg-neon-pink data-[state=checked]:text-white" />
                <label htmlFor={`brand-${brand}`} className="font-mono text-sm cursor-pointer hover:text-neon-blue transition-colors">
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-black/10" />

        {/* Stock Filter */}
        <div>
          <div className="flex items-center space-x-2 p-3 border-2 border-black bg-gray-50 hover:bg-neon-green/20 transition-colors">
            <Checkbox
              id="inStock"
              checked={filters.inStock === true}
              onCheckedChange={(checked) => updateFilter('inStock', checked ? true : undefined)}
              className="border-2 border-black rounded-none data-[state=checked]:bg-black data-[state=checked]:text-white"
            />
            <label htmlFor="inStock" className="font-mono font-bold uppercase text-sm cursor-pointer flex-1">
              Solo en Stock
            </label>
          </div>
        </div>

        <Separator className="bg-black/10" />

        {/* Sort By */}
        <div>
          <label className="font-mono font-bold uppercase text-sm mb-3 block">Ordenar Por</label>
          <Select
            value={filters.sortBy || 'createdAt'}
            onValueChange={(value) => updateFilter('sortBy', value as SearchFilters['sortBy'])}
          >
            <SelectTrigger className="border-3 border-black rounded-none font-mono focus:ring-0 focus:ring-offset-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-3 border-black rounded-none">
              <SelectItem value="createdAt" className="font-mono">Más Recientes</SelectItem>
              <SelectItem value="price" className="font-mono">Precio</SelectItem>
              <SelectItem value="rating" className="font-mono">Calificación</SelectItem>
              <SelectItem value="soldCount" className="font-mono">Populares</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort Order */}
        <div>
          <label className="font-mono font-bold uppercase text-sm mb-3 block">Orden</label>
          <Select
            value={filters.order || 'desc'}
            onValueChange={(value) => updateFilter('order', value as 'asc' | 'desc')}
          >
            <SelectTrigger className="border-3 border-black rounded-none font-mono focus:ring-0 focus:ring-offset-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-3 border-black rounded-none">
              <SelectItem value="desc" className="font-mono">Descendente</SelectItem>
              <SelectItem value="asc" className="font-mono">Ascendente</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters */}
        <BrutalButton
          variant="outline"
          fullWidth
          onClick={() => onFiltersChange({})}
          className="hover:bg-red-500 hover:text-white hover:border-black"
        >
          Limpiar Filtros
        </BrutalButton>
      </div>
    </BrutalCard>
  );
}

