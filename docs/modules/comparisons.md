# Módulo de Comparaciones

## 📋 Descripción

Módulo que permite a los usuarios comparar múltiples productos lado a lado en una tabla comparativa.

## 🏗️ Estructura

```
comparisons/
├── components/
│   └── ComparisonTable.tsx    # Tabla comparativa
└── views/
    └── Compare.tsx           # Vista de comparación
```

## 🔑 Funcionalidades

### Comparación
- Agregar productos a comparar
- Tabla comparativa con características
- Eliminar productos de la comparación
- Guardar comparaciones (futuro)

## 🔌 Integraciones

- **API Backend**: `/api/comparisons/*`
- **Store**: `compare.store.ts` (Zustand)

## 📝 Notas de Implementación

- Máximo de productos comparables (configurable)
- Comparación persistente en sesión
- Tabla responsive
