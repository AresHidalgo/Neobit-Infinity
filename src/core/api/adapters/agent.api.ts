import httpClient from '../axios.client';
import { getApiUrl } from '@/config/api.config';
import { agentConfig } from '@/config/agent.config';
import { ApiResponse } from '@/types/api.types';
import { ChatResponse } from '@/types/chat.type';

// Agent API goes through backend proxy at /api/v1/agent/*
// For direct communication (if needed), use agentConfig.baseURL

export interface ChatRequest {
  message: string;
  sessionId?: string;
  context?: Record<string, any>;
}

export interface QueryRequest {
  query: string;
  filters?: Record<string, any>;
}

export const agentApi = {
  // Direct agent endpoints (via backend proxy)
  chat: async (data: ChatRequest): Promise<ApiResponse<ChatResponse>> => {
    return httpClient.post<ChatResponse>(getApiUrl('/agent/chat'), data);
  },

  query: async (data: QueryRequest): Promise<ApiResponse<ChatResponse>> => {
    return httpClient.post<ChatResponse>(getApiUrl('/agent/query'), data);
  },

  // Direct agent endpoints (if direct communication is needed)
  chatDirect: async (data: ChatRequest): Promise<ChatResponse> => {
    const base = agentConfig.baseURL || 'http://localhost:8000';
    const endpoint = '/api/v1/chat';
    const response = await fetch(`${base}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
