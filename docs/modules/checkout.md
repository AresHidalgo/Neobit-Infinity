# Módulo de Checkout

## 📋 Descripción

Módulo que gestiona el proceso de compra en múltiples pasos: revisión del carrito, información de envío, método de pago y confirmación.

## 🏗️ Estructura

```
checkout/
├── step1/
│   └── ReviewCart.tsx         # Paso 1: Revisar carrito
├── step2/
│   └── ShippingInfo.tsx      # Paso 2: Información de envío
├── step3/
│   └── PaymentMethod.tsx      # Paso 3: Método de pago
├── step4/
│   └── Confirmation.tsx      # Paso 4: Confirmación
└── views/
    └── Checkout.tsx           # Vista principal del checkout
```

## 🔑 Funcionalidades

### Proceso de Checkout (4 pasos)

1. **Revisión del Carrito**
   - Ver productos seleccionados
   - Modificar cantidades
   - Aplicar cupones

2. **Información de Envío**
   - Dirección de entrega
   - Método de envío
   - Costos de envío

3. **Método de Pago**
   - Selección de método de pago
   - Información de tarjeta
   - Validación de datos

4. **Confirmación**
   - Resumen del pedido
   - Confirmación de compra
   - Número de pedido

## 🔌 Integraciones

- **API Backend**: `/api/checkout/*`, `/api/orders/*`
- **Store**: `cart.store.ts`
- **Pasarelas de Pago**: Integración externa

## 📝 Notas de Implementación

- Flujo multi-paso con validación
- Persistencia del estado del checkout
- Integración con pasarelas de pago
