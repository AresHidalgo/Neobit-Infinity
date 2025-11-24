export const apiConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:3000',
  apiPrefix: import.meta.env.VITE_API_PREFIX || 'api',
  apiVersion: import.meta.env.VITE_API_VERSION || 'v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getApiUrl = (path: string = '') => {
  const base = apiConfig.baseURL.endsWith('/') ? apiConfig.baseURL.slice(0, -1) : apiConfig.baseURL;
  const prefix = apiConfig.apiPrefix.startsWith('/') ? apiConfig.apiPrefix : `/${apiConfig.apiPrefix}`;
  const version = apiConfig.apiVersion.startsWith('/') ? apiConfig.apiVersion : `/${apiConfig.apiVersion}`;
  const endpoint = path.startsWith('/') ? path : `/${path}`;
  
  return `${base}${prefix}${version}${endpoint}`;
};

