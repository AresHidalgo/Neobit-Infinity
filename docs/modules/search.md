# Módulo de Búsqueda

## 📋 Descripción

Módulo que permite a los usuarios buscar productos con filtros avanzados, categorías, rangos de precio y más.

## 🏗️ Estructura

```
search/
├── components/
│   ├── FilterChip.tsx         # Chips de filtros activos
│   ├── FilterPanel.tsx        # Panel lateral de filtros
│   ├── ResultsGrid.tsx        # Grid de resultados
│   └── SearchBar.tsx          # Barra de búsqueda
├── hooks/
│   └── useSearch.ts           # Hook para búsqueda
└── views/
    └── Search.tsx             # Vista de búsqueda
```

## 🔑 Funcionalidades

### Búsqueda
- Búsqueda por texto
- Filtros por categoría
- Filtros por precio
- Filtros por disponibilidad
- Ordenamiento de resultados
- Paginación

## 🔌 Integraciones

- **API Backend**: `/api/products/search`
- **Store**: `product.store.ts`

## 📝 Notas de Implementación

- Debounce en la búsqueda para optimizar requests
- Filtros persistentes en URL params
- Resultados en tiempo real
