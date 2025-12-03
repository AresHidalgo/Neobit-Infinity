# Módulo de Carrito

## 📋 Descripción

Módulo que gestiona el carrito de compras del usuario, permitiendo agregar, modificar y eliminar productos antes del checkout.

## 🏗️ Estructura

```
cart/
├── components/
│   └── CartItem.tsx           # Item individual del carrito
└── views/
    └── Cart.tsx               # Vista del carrito
```

## 🔑 Funcionalidades

### Carrito
- Ver productos en el carrito
- Modificar cantidades
- Eliminar productos
- Calcular totales
- Aplicar cupones/descuentos
- Proceder al checkout

## 🔌 Integraciones

- **API Backend**: `/api/cart/*`
- **Store**: `cart.store.ts` (Zustand)
- **React Query**: Sincronización con servidor

## 📝 Notas de Implementación

- Carrito persistente en localStorage
- Sincronización con backend
- Cálculo automático de totales
