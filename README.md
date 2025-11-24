# NeoBit Frontend

Frontend de NeoBit - Plataforma de e-commerce con IA integrada, construido con React, TypeScript, Vite y Tailwind CSS.

## 🚀 Stack Tecnológico

- **React 18** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router** - Enrutamiento
- **Zustand** - State management
- **React Query (@tanstack/react-query)** - Server state management
- **Axios** - HTTP client
- **Tailwind CSS** - Estilos utility-first
- **Framer Motion** - Animaciones
- **Three.js + React Three Fiber** - Visualización 3D de productos
- **Recharts** - Gráficos y visualizaciones
- **Radix UI** - Componentes accesibles
- **Socket.io Client** - WebSockets para chatbot
- **Zod** - Validación de esquemas
- **React Hook Form** - Manejo de formularios

## 📁 Estructura del Proyecto

```
neobit-frontend/
├── src/
│   ├── main.tsx                     # Punto de entrada
│   ├── App.tsx                      # Configuración principal
│   ├── index.css                    # Estilos globales
│   │
│   ├── config/                      # Configuración global
│   │   ├── app.config.ts
│   │   ├── api.config.ts            # BaseURL Backend
│   │   ├── agent.config.ts          # BaseURL Agente IA
│   │   ├── theme.config.ts          # Definición de temas
│   │   └── routes.config.ts         # Rutas públicas/privadas
│   │
│   ├── core/                        # Infraestructura clave
│   │   ├── api/                     # Axios + React Query
│   │   ├── providers/               # ReactQuery + Zustand + Theme
│   │   ├── guards/                  # Rutas protegidas
│   │   └── hooks/                   # Hooks globales
│   │
│   ├── store/                       # Global State (Zustand)
│   │   ├── auth.store.ts
│   │   ├── user.store.ts
│   │   ├── cart.store.ts
│   │   ├── wishlist.store.ts
│   │   ├── compare.store.ts
│   │   ├── product.store.ts
│   │   └── ui.store.ts
│   │
│   ├── modules/                      # Feature Modules
│   │   ├── auth/                    # Autenticación
│   │   ├── marketplace/             # Home y marketplace
│   │   ├── search/                  # Búsqueda y filtros
│   │   ├── product/                 # Detalle de productos
│   │   ├── cart/                    # Carrito de compras
│   │   ├── checkout/                # Proceso de checkout
│   │   ├── wishlist/                # Lista de deseos
│   │   ├── comparisons/             # Comparación de productos
│   │   ├── alerts/                  # Alertas de precio
│   │   ├── profile/                 # Perfil de usuario
│   │   ├── admin/                   # Panel administrativo
│   │   ├── chatbot/                 # Chatbot con IA
│   │   └── gamification/            # Sistema de puntos y badges
│   │
│   ├── shared/                      # UI global + helpers
│   │   ├── components/              # Componentes reutilizables
│   │   ├── hooks/                   # Hooks compartidos
│   │   ├── utils/                   # Utilidades
│   │   ├── animations/              # Animaciones
│   │   └── particles/               # Efectos de partículas
│   │
│   ├── assets/                      # Recursos estáticos
│   ├── data/                        # Datos mock
│   ├── types/                       # TypeScript types
│   └── styles/                      # Estilos globales
│
├── index.html
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install
# o
yarn install
# o
pnpm install
```

## 🏃 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build de producción
npm run preview

# Linting
npm run lint

# Formateo de código
npm run format
```

## 🌐 Variables de Entorno

Crear archivo `.env`:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_AGENT_API_URL=http://localhost:8000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

## 📦 Módulos Principales

### Autenticación
- Login y registro
- Gestión de sesiones
- Guards de rutas (privadas, admin, seller)

### Marketplace
- Home con productos destacados
- Categorías rápidas
- Últimos lanzamientos
- Carousel de promociones

### Productos
- Detalle con galería 3D
- Historial de precios
- Reviews y ratings
- Selector de variantes

### Carrito y Checkout
- Carrito persistente
- Proceso de checkout en 4 pasos
- Integración con pasarelas de pago

### Chatbot IA
- Chat en tiempo real con WebSockets
- Integración con agente IA
- Historial de conversaciones

### Gamificación
- Sistema de puntos
- Badges y logros
- Progreso visual

## 🎨 Temas

Soporte para múltiples temas (light/dark) con configuración persistente.

## 🔒 Seguridad

- Validación de formularios con Zod
- Guards de rutas basados en roles
- Interceptores de Axios para autenticación
- Manejo seguro de tokens

## 📱 Responsive

Diseño responsive con Tailwind CSS y breakpoints móvil-first.

## 🚀 Deployment

El proyecto está optimizado para deployment en:
- Vercel
- Netlify
- AWS Amplify
- Cualquier servidor estático

```bash
npm run build
# Los archivos estarán en /dist
```

