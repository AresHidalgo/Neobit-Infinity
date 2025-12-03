# Módulo de Gamificación

## 📋 Descripción

Módulo que implementa un sistema de puntos, badges y logros para incentivar la participación de los usuarios.

## 🏗️ Estructura

```
gamification/
├── components/
│   ├── Badges.tsx             # Componente de badges
│   └── PointsProgress.tsx    # Barra de progreso de puntos
```

## 🔑 Funcionalidades

### Gamificación
- Sistema de puntos
- Badges y logros
- Progreso visual
- Recompensas por acciones
- Ranking de usuarios (futuro)

## 🔌 Integraciones

- **API Backend**: `/api/gamification/*`
- **Store**: `user.store.ts` (puntos del usuario)

## 📝 Notas de Implementación

- Puntos por compras, reviews, etc.
- Badges desbloqueables
- Progreso persistente
