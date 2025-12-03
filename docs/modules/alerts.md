# Módulo de Alertas

## 📋 Descripción

Módulo que permite a los usuarios crear alertas de precio para productos, recibiendo notificaciones cuando el precio cambia.

## 🏗️ Estructura

```
alerts/
├── components/
│   └── AlertCard.tsx          # Tarjeta de alerta
└── views/
    └── Alerts.tsx             # Vista de alertas
```

## 🔑 Funcionalidades

### Alertas de Precio
- Crear alertas para productos
- Establecer umbral de precio
- Ver alertas activas
- Editar alertas
- Eliminar alertas
- Notificaciones automáticas

## 🔌 Integraciones

- **API Backend**: `/api/alerts/*`
- **WebSockets**: Notificaciones en tiempo real
- **Store**: `alerts.store.ts` (si existe)

## 📝 Notas de Implementación

- Alertas persistentes en backend
- Notificaciones push/email
- Monitoreo automático de precios
