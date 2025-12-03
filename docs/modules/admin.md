# Módulo de Administración

## 📋 Descripción

Módulo que proporciona un panel de administración para gestionar usuarios, productos, pedidos, analytics y vendedores.

## 🏗️ Estructura

```
admin/
├── analytics/
│   └── AnalyticsAdmin.tsx     # Analytics y métricas
├── products/
│   └── ProductsAdmin.tsx      # Gestión de productos
├── seller/
│   └── views/
│       ├── SellerDashboard.tsx # Dashboard de vendedor
│       ├── SellerOrders.tsx    # Pedidos del vendedor
│       └── SellerProducts.tsx # Productos del vendedor
├── users/
│   └── UsersAdmin.tsx         # Gestión de usuarios
└── views/
    └── AdminDashboard.tsx     # Dashboard principal
```

## 🔑 Funcionalidades

### Panel de Administración
- Dashboard con métricas generales
- Gestión de usuarios (CRUD)
- Gestión de productos (CRUD)
- Gestión de pedidos
- Analytics y reportes
- Panel de vendedores

### Panel de Vendedor
- Dashboard de vendedor
- Gestión de productos propios
- Gestión de pedidos propios
- Estadísticas de ventas

## 🔌 Integraciones

- **API Backend**: `/api/admin/*`, `/api/seller/*`
- **Guards**: Protección por roles (admin, seller)

## 📝 Notas de Implementación

- Acceso restringido por roles
- Guards de ruta para protección
- Permisos granulares
