# Módulo de Contacto

## 📋 Descripción

Módulo que permite a los usuarios contactar con la empresa a través de diferentes canales: soporte, ventas y partners.

## 🏗️ Estructura

```
contact/
└── views/
    ├── Contact.tsx            # Vista principal
    ├── ContactPartner.tsx     # Contacto para partners
    ├── ContactSales.tsx       # Contacto de ventas
    └── ContactSupport.tsx     # Contacto de soporte
```

## 🔑 Funcionalidades

### Contacto
- Formulario de contacto general
- Contacto de soporte técnico
- Contacto de ventas
- Contacto para partners
- Información de contacto

## 🔌 Integraciones

- **API Backend**: `/api/contact/*`
- **Email Service**: Envío de emails

## 📝 Notas de Implementación

- Formularios validados
- Envío de emails automático
- Diferentes canales según necesidad
