import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/Card';
import { Checkbox } from '@/shared/components/ui/Checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/Select';
import { Separator } from '@/shared/components/ui/Separator';
import { Input } from '@/shared/components/ui/Input';
import { Button } from '@/shared/components/ui/Button';
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
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div>
          <label className="text-sm font-medium mb-2 block">Category</label>
          <Select
            value={filters.category || 'all'}
            onValueChange={(value) => updateFilter('category', value === 'all' ? undefined : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Price Range */}
        <div>
          <label className="text-sm font-medium mb-2 block">Price Range</label>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.minPrice || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFilter('minPrice', e.target.value ? parseFloat(e.target.value) : undefined)}
                className="w-full"
              />
              <span className="text-muted-foreground">-</span>
              <Input
                type="number"
                placeholder="Max"
                value={filters.maxPrice || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFilter('maxPrice', e.target.value ? parseFloat(e.target.value) : undefined)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Rating Filter */}
        <div>
          <label className="text-sm font-medium mb-2 block">Minimum Rating</label>
          <Select
            value={filters.minRating?.toString() || 'all'}
            onValueChange={(value) => updateFilter('minRating', value === 'all' ? undefined : parseFloat(value))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="4">4+ Stars</SelectItem>
              <SelectItem value="3">3+ Stars</SelectItem>
              <SelectItem value="2">2+ Stars</SelectItem>
              <SelectItem value="1">1+ Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Stock Filter */}
        <div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock"
              checked={filters.inStock === true}
              onCheckedChange={(checked) => updateFilter('inStock', checked ? true : undefined)}
            />
            <label htmlFor="inStock" className="text-sm font-medium cursor-pointer">
              In Stock Only
            </label>
          </div>
        </div>

        <Separator />

        {/* Sort By */}
        <div>
          <label className="text-sm font-medium mb-2 block">Sort By</label>
          <Select
            value={filters.sortBy || 'createdAt'}
            onValueChange={(value) => updateFilter('sortBy', value as SearchFilters['sortBy'])}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Newest</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="soldCount">Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort Order */}
        <div>
          <label className="text-sm font-medium mb-2 block">Order</label>
          <Select
            value={filters.order || 'desc'}
            onValueChange={(value) => updateFilter('order', value as 'asc' | 'desc')}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Descending</SelectItem>
              <SelectItem value="asc">Ascending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => onFiltersChange({})}
        >
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  );
}

