# Módulo de Marketplace

## 📋 Descripción

Módulo principal que muestra la página de inicio (Home) con productos destacados, categorías rápidas, últimos lanzamientos y promociones.

## 🏗️ Estructura

```
marketplace/
├── components/
│   ├── CategoryQuick.tsx      # Categorías rápidas
│   ├── FeaturedProducts.tsx  # Productos destacados
│   ├── HeroBanner.tsx         # Banner principal
│   ├── LatestReleases.tsx    # Últimos lanzamientos
│   └── PromoCarousel.tsx     # Carrusel de promociones
├── hooks/
│   └── useMarketplaceData.ts  # Hook para datos del marketplace
└── views/
    └── Home.tsx               # Vista principal
```

## 🔑 Funcionalidades

### Home
- Hero banner con promociones principales
- Productos destacados
- Categorías de acceso rápido
- Últimos lanzamientos
- Carrusel de promociones

## 🔌 Integraciones

- **API Backend**: `/api/products/featured`, `/api/products/latest`
- **Store**: `product.store.ts`

## 📝 Notas de Implementación

- Utiliza React Query para el fetching de datos
- Componentes reutilizables para diferentes secciones
- Optimizado para rendimiento con lazy loading
