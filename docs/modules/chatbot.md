# Módulo de Chatbot

## 📋 Descripción

Módulo que integra un chatbot con IA para asistir a los usuarios en tiempo real, respondiendo preguntas sobre productos, pedidos y más.

## 🏗️ Estructura

```
chatbot/
├── components/
│   ├── ChatButton.tsx         # Botón flotante del chat
│   ├── ChatDrawer.tsx         # Drawer del chat
│   └── ChatMessage.tsx       # Componente de mensaje
├── services/
│   └── chat.service.ts        # Servicio de chat
└── store/
    └── chat.store.ts         # Store del chat (Zustand)
```

## 🔑 Funcionalidades

### Chatbot IA
- Chat en tiempo real
- Respuestas inteligentes sobre productos
- Consulta de pedidos
- Búsqueda de productos
- Historial de conversaciones
- Integración con agente IA

## 🔌 Integraciones

- **API Agent**: `/api/agent/chat` (WebSocket)
- **Socket.io**: Comunicación en tiempo real
- **Store**: `chat.store.ts` (Zustand)

## 📝 Notas de Implementación

- WebSocket para comunicación bidireccional
- Memoria de conversación
- Integración con LangChain/agente IA
- UI flotante no intrusiva
