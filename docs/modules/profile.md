# Módulo de Perfil

## 📋 Descripción

Módulo que gestiona el perfil del usuario, incluyendo información personal, pedidos, reviews, puntos y configuraciones.

## 🏗️ Estructura

```
profile/
├── components/
│   └── ProfileCard.tsx        # Tarjeta de perfil
├── dashboard/
│   ├── Orders.tsx             # Pedidos del usuario
│   ├── Points.tsx             # Puntos y gamificación
│   ├── Reviews.tsx            # Reviews del usuario
│   └── Settings.tsx           # Configuraciones
└── views/
    └── Profile.tsx            # Vista principal del perfil
```

## 🔑 Funcionalidades

### Perfil de Usuario
- Información personal
- Historial de pedidos
- Reviews realizadas
- Puntos y badges (gamificación)
- Configuraciones de cuenta
- Preferencias

## 🔌 Integraciones

- **API Backend**: `/api/users/profile/*`, `/api/orders/*`
- **Store**: `user.store.ts`, `auth.store.ts`

## 📝 Notas de Implementación

- Perfil editable
- Integración con gamificación
- Historial completo de actividad
