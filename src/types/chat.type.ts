export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    sessionId?: string;
    toolCalls?: Array<{
      name: string;
      arguments: Record<string, any>;
      result?: any;
    }>;
  };
}

export interface ChatResponse {
  message: string;
  sessionId: string;
  toolCalls?: Array<{
    name: string;
    arguments: Record<string, any>;
    result?: any;
  }>;
  suggestions?: string[];
}

export interface ChatHistory {
  sessionId: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

