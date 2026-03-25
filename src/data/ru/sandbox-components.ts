import type { SandboxComponentDef } from '../../types';

export const sandboxComponentDefs: SandboxComponentDef[] = [
  { type: 'client', label: 'Клиент/Браузер', icon: '🖥️', category: 'compute' },
  { type: 'load-balancer', label: 'Балансировщик нагрузки', icon: '⚖️', category: 'network' },
  { type: 'web-server', label: 'Веб-сервер', icon: '🌐', category: 'compute' },
  { type: 'app-server', label: 'Сервер приложений', icon: '⚙️', category: 'compute' },
  { type: 'sql-db', label: 'SQL база данных', icon: '🗄️', category: 'storage' },
  { type: 'nosql-db', label: 'NoSQL база данных', icon: '📦', category: 'storage' },
  { type: 'cache', label: 'Кэш (Redis)', icon: '⚡', category: 'storage' },
  { type: 'message-queue', label: 'Очередь сообщений', icon: '📨', category: 'messaging' },
  { type: 'cdn', label: 'CDN', icon: '🌍', category: 'network' },
  { type: 'api-gateway', label: 'API-шлюз', icon: '🚪', category: 'network' },
  { type: 'object-storage', label: 'Объектное хранилище', icon: '💾', category: 'storage' },
  { type: 'dns', label: 'DNS', icon: '📡', category: 'network' },
  { type: 'search-engine', label: 'Поисковый движок', icon: '🔍', category: 'compute' },
  { type: 'rate-limiter', label: 'Ограничитель запросов', icon: '🚦', category: 'network' },
  { type: 'notification', label: 'Сервис уведомлений', icon: '🔔', category: 'messaging' },
];
