export const agentConfig = {
  baseURL: import.meta.env.VITE_AGENT_URL || 'http://localhost:8000',
  timeout: 60000, // 60 seconds for AI responses
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getAgentUrl = (path: string = '') => {
  const base = agentConfig.baseURL.endsWith('/') ? agentConfig.baseURL.slice(0, -1) : agentConfig.baseURL;
  const endpoint = path.startsWith('/') ? path : `/${path}`;
  
  return `${base}${endpoint}`;
};

