# Arquitectura de NeoBit Frontend

## 🏗️ Arquitectura General

NeoBit Frontend está construido con una arquitectura modular basada en React, TypeScript y Vite.

## 📐 Principios de Diseño

### Modularidad
- Cada módulo es independiente y autocontenido
- Separación clara de responsabilidades
- Reutilización de componentes compartidos

### Estado Global
- **Zustand**: Para estado global del cliente
- **React Query**: Para estado del servidor
- Stores separados por dominio

### Routing
- React Router para navegación
- Guards de ruta para protección
- Rutas públicas y privadas

## 🗂️ Estructura de Directorios

```
src/
├── config/          # Configuración global
├── core/            # Infraestructura clave
├── modules/         # Módulos de negocio
├── shared/          # Componentes y utilidades compartidas
├── store/           # Estado global (Zustand)
├── assets/          # Recursos estáticos
└── types/           # Tipos TypeScript
```

## 🔄 Flujo de Datos

1. **Componentes** → Hacen requests a través de hooks
2. **Hooks** → Usan React Query para fetching
3. **Services** → Llaman a la API
4. **API** → Comunicación con backend
5. **Store** → Estado global persistente

## 🛠️ Tecnologías Clave

- **React 18**: UI Library
- **TypeScript**: Tipado estático
- **Vite**: Build tool
- **React Router**: Routing
- **Zustand**: State management
- **React Query**: Server state
- **Tailwind CSS**: Estilos
- **Framer Motion**: Animaciones

## 📦 Patrones Utilizados

- **Feature-based modules**: Organización por funcionalidad
- **Custom hooks**: Lógica reutilizable
- **Component composition**: Componentes compuestos
- **Provider pattern**: Context providers
