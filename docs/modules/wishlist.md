# Módulo de Wishlist

## 📋 Descripción

Módulo que permite a los usuarios crear y gestionar su lista de deseos, guardando productos para comprar más tarde.

## 🏗️ Estructura

```
wishlist/
├── components/
│   └── WishlistItem.tsx       # Item de la wishlist
└── views/
    └── Wishlist.tsx           # Vista de la wishlist
```

## 🔑 Funcionalidades

### Wishlist
- Ver productos guardados
- Agregar productos desde cualquier página
- Eliminar productos
- Mover a carrito
- Compartir wishlist (futuro)

## 🔌 Integraciones

- **API Backend**: `/api/wishlist/*`
- **Store**: `wishlist.store.ts` (Zustand)

## 📝 Notas de Implementación

- Wishlist persistente por usuario
- Sincronización con backend
- Acceso rápido desde cualquier producto
