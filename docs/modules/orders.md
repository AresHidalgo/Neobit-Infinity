# Módulo de Pedidos

## 📋 Descripción

Módulo que gestiona el historial de pedidos del usuario, permitiendo ver detalles, estados y tracking.

## 🏗️ Estructura

```
orders/
└── views/
    ├── OrderDetail.tsx        # Detalle de un pedido
    └── Orders.tsx            # Lista de pedidos
```

## 🔑 Funcionalidades

### Pedidos
- Ver historial de pedidos
- Detalle de pedido individual
- Estado del pedido
- Tracking de envío
- Factura/recibo
- Cancelación de pedidos

## 🔌 Integraciones

- **API Backend**: `/api/orders/*`
- **Store**: `orders.store.ts` (si existe)

## 📝 Notas de Implementación

- Pedidos ordenados por fecha
- Estados en tiempo real
- Integración con tracking de envío
