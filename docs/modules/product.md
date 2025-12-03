# Módulo de Producto

## 📋 Descripción

Módulo que muestra el detalle completo de un producto, incluyendo galería, información, variantes, reviews, historial de precios y visualización 3D.

## 🏗️ Estructura

```
product/
├── components/
│   ├── AddToCart.tsx          # Botón agregar al carrito
│   ├── PriceHistoryChart.tsx  # Gráfico de historial de precios
│   ├── Product3DViewer.tsx    # Visor 3D del producto
│   ├── ProductGallery.tsx      # Galería de imágenes
│   ├── ReviewList.tsx          # Lista de reviews
│   └── VariantsSelector.tsx   # Selector de variantes
├── hooks/
│   └── useProduct.ts          # Hook para datos del producto
├── services/
│   └── product.service.ts     # Servicio de productos
└── views/
    └── ProductDetail.tsx      # Vista de detalle
```

## 🔑 Funcionalidades

### Detalle de Producto
- Galería de imágenes
- Información completa del producto
- Selector de variantes (talla, color, etc.)
- Visualización 3D (Three.js)
- Historial de precios con gráfico
- Reviews y ratings
- Agregar al carrito
- Agregar a wishlist

## 🔌 Integraciones

- **API Backend**: `/api/products/:id`
- **Three.js**: Visualización 3D
- **Recharts**: Gráficos de precios
- **Store**: `product.store.ts`, `cart.store.ts`

## 📝 Notas de Implementación

- Carga lazy de componentes pesados (3D viewer)
- Optimización de imágenes
- Caché de productos vistos
