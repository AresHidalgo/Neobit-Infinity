# Módulo de Autenticación

## 📋 Descripción

Módulo responsable de la autenticación y autorización de usuarios en la plataforma NeoBit. Maneja el login, registro, logout y gestión de sesiones.

## 🏗️ Estructura

```
auth/
├── hooks/
│   ├── useLogin.ts          # Hook para login
│   ├── useLogout.ts          # Hook para logout
│   └── useRegister.ts        # Hook para registro
├── services/
│   └── auth.service.ts       # Servicio de autenticación
├── types/
│   └── auth.types.ts         # Tipos TypeScript
└── views/
    ├── Login.tsx             # Vista de login
    └── Register.tsx          # Vista de registro
```

## 🔑 Funcionalidades

### Login
- Autenticación con email/username y contraseña
- Manejo de tokens JWT (access y refresh)
- Persistencia de sesión
- Redirección post-login

### Registro
- Creación de nuevas cuentas
- Validación de datos
- Verificación de email (si aplica)

### Logout
- Invalidación de tokens
- Limpieza de estado local
- Redirección a login

## 🔌 Integraciones

- **API Backend**: `/api/auth/*`
- **Store**: `auth.store.ts` (Zustand)
- **React Query**: Mutations para operaciones async

## 📝 Notas de Implementación

- Los tokens se almacenan en localStorage
- Se utiliza React Query para el manejo de estado del servidor
- Guards de ruta protegen las rutas privadas
