import { useState } from 'react';
import { useSearch } from '../hooks/useSearch';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { ResultsGrid } from '../components/ResultsGrid';
import { FilterChip } from '../components/FilterChip';
import { Pagination } from '@/shared/components/ui/Pagination';
import { Container } from '@/shared/components/ui/Container';
import { Breadcrumbs } from '@/shared/components/Breadcrumbs';
import { Text } from '@/shared/components/ui/Typography';
import { RandomGamingIcons } from '@/shared/components/ui/GamingDecoratives';
import { categories } from '@/data/categories.mock';
import { Separator } from '@/shared/components/ui/Separator';
import { Button } from '@/shared/components/ui/Button';
import { routesConfig } from '@/config/app.config';
import { SlidersHorizontal, Grid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Search() {
  const { query, setQuery, filters, setFilters, products, pagination, isLoading } = useSearch();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const activeFilters = [
    filters.category && {
      key: 'category',
      label: `Category: ${categories.find((c) => c.id === filters.category)?.name || filters.category}`,
      onRemove: () => setFilters({ ...filters, category: undefined }),
    },
    filters.minPrice && {
      key: 'minPrice',
      label: `Min Price: $${filters.minPrice}`,
      onRemove: () => setFilters({ ...filters, minPrice: undefined }),
    },
    filters.maxPrice && {
      key: 'maxPrice',
      label: `Max Price: $${filters.maxPrice}`,
      onRemove: () => setFilters({ ...filters, maxPrice: undefined }),
    },
    filters.minRating && {
      key: 'minRating',
      label: `Rating: ${filters.minRating}+ stars`,
      onRemove: () => setFilters({ ...filters, minRating: undefined }),
    },
    filters.inStock && {
      key: 'inStock',
      label: 'In Stock Only',
      onRemove: () => setFilters({ ...filters, inStock: undefined }),
    },
  ].filter(Boolean) as Array<{ key: string; label: string; onRemove: () => void }>;

  return (
    <div className="relative">
      {/* Gaming Icons Decorativos de Fondo */}
      <RandomGamingIcons 
        density="medium" 
        minSize={50} 
        maxSize={100}
        className="opacity-10"
      />
      
      <Container className="py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
        <Breadcrumbs
          items={[
            { label: 'Inicio', to: routesConfig.home },
            { label: 'Búsqueda' },
          ]}
          className="mb-6"
        />

      {/* Search Bar */}
      <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
        <SearchBar value={query} onChange={setQuery} />
          </motion.div>
      </div>

      <div className="flex gap-6">
        {/* Filters Sidebar - Desktop */}
          <motion.aside
            className="hidden lg:block w-64 flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
          <FilterPanel filters={filters} onFiltersChange={setFilters} />
          </motion.aside>

        {/* Main Content */}
        <main className="flex-1">
            {/* Mobile Filter Toggle & View Mode */}
            <div className="flex gap-2 mb-4 lg:hidden">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
                className="flex-1"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filtros
            </Button>
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Desktop View Mode Toggle */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                {!isLoading && pagination && (
                  <Text size="sm" muted>
                    {pagination.total} {pagination.total === 1 ? 'producto' : 'productos'} encontrados
                  </Text>
                )}
              </div>
              <div className="flex border-2 border-black">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className={`rounded-none border-r-2 border-black ${viewMode === 'grid' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className={`rounded-none ${viewMode === 'list' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
          </div>

          {/* Mobile Filters */}
            <AnimatePresence>
          {showFilters && (
                <motion.div
                  className="lg:hidden mb-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
              <FilterPanel filters={filters} onFiltersChange={setFilters} />
                </motion.div>
          )}
            </AnimatePresence>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
              <motion.div
                className="mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
              <div className="flex flex-wrap gap-2 items-center">
                  <Text size="sm" weight="medium">Filtros Activos:</Text>
                {activeFilters.map((filter) => (
                  <FilterChip key={filter.key} label={filter.label} onRemove={filter.onRemove} />
                ))}
              </div>
              </motion.div>
          )}

          <Separator className="mb-6" />

          {/* Results Grid */}
            <ResultsGrid products={products} isLoading={isLoading} viewMode={viewMode} />

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
              <motion.div
                className="mt-8 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={(_page) => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
              </motion.div>
          )}
        </main>
      </div>
      </motion.div>
    </Container>
    </div>
  );
}

