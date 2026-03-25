import type { SandboxComponentDef } from '../types';

export const sandboxComponentDefs: SandboxComponentDef[] = [
  { type: 'client', label: 'Client/Browser', icon: '🖥️', category: 'compute' },
  { type: 'load-balancer', label: 'Load Balancer', icon: '⚖️', category: 'network' },
  { type: 'web-server', label: 'Web Server', icon: '🌐', category: 'compute' },
  { type: 'app-server', label: 'App Server', icon: '⚙️', category: 'compute' },
  { type: 'sql-db', label: 'SQL Database', icon: '🗄️', category: 'storage' },
  { type: 'nosql-db', label: 'NoSQL Database', icon: '📦', category: 'storage' },
  { type: 'cache', label: 'Cache (Redis)', icon: '⚡', category: 'storage' },
  { type: 'message-queue', label: 'Message Queue', icon: '📨', category: 'messaging' },
  { type: 'cdn', label: 'CDN', icon: '🌍', category: 'network' },
  { type: 'api-gateway', label: 'API Gateway', icon: '🚪', category: 'network' },
  { type: 'object-storage', label: 'Object Storage', icon: '💾', category: 'storage' },
  { type: 'dns', label: 'DNS', icon: '📡', category: 'network' },
  { type: 'search-engine', label: 'Search Engine', icon: '🔍', category: 'compute' },
  { type: 'rate-limiter', label: 'Rate Limiter', icon: '🚦', category: 'network' },
  { type: 'notification', label: 'Notification Service', icon: '🔔', category: 'messaging' },
];
