import { Incident, TimelineEvent, GraphNode, Recommendation } from '@/types/security';

export const mockIncidents: Incident[] = [
  {
    id: 'INC-2024-001',
    title: 'Подозрительная активность учётной записи admin_user',
    description: 'Обнаружены множественные попытки доступа к критичным системам вне рабочих часов',
    risk: 'critical',
    status: 'active',
    timestamp: '2024-12-07 14:23:15',
    affectedAssets: 5,
    type: 'Unauthorized Access'
  },
  {
    id: 'INC-2024-002',
    title: 'Аномальный сетевой трафик с сервера DB-PROD-01',
    description: 'Зафиксирована передача большого объёма данных на внешний IP',
    risk: 'high',
    status: 'investigating',
    timestamp: '2024-12-07 13:45:22',
    affectedAssets: 3,
    type: 'Data Exfiltration'
  },
  {
    id: 'INC-2024-003',
    title: 'Запуск неизвестного процесса на хосте WS-USER-042',
    description: 'Обнаружен запуск процесса, не входящего в белый список',
    risk: 'medium',
    status: 'investigating',
    timestamp: '2024-12-07 12:10:05',
    affectedAssets: 1,
    type: 'Malware Detection'
  },
  {
    id: 'INC-2024-004',
    title: 'Изменение критичных системных файлов',
    description: 'Модификация файлов в директории /etc/ на сервере APP-PROD-03',
    risk: 'high',
    status: 'active',
    timestamp: '2024-12-07 11:30:41',
    affectedAssets: 2,
    type: 'System Integrity'
  },
  {
    id: 'INC-2024-005',
    title: 'Брутфорс SSH на пограничном сервере',
    description: 'Обнаружены 500+ неудачных попыток SSH-авторизации за последний час',
    risk: 'medium',
    status: 'resolved',
    timestamp: '2024-12-07 10:15:33',
    affectedAssets: 1,
    type: 'Brute Force Attack'
  }
];

export const mockTimeline: TimelineEvent[] = [
  { id: '1', timestamp: '14:23:15', action: 'Доступ к системе', user: 'admin_user', entity: 'DB-PROD-01', severity: 'critical' },
  { id: '2', timestamp: '14:20:02', action: 'Попытка авторизации', user: 'admin_user', entity: 'APP-PROD-03', severity: 'high' },
  { id: '3', timestamp: '14:15:45', action: 'Сканирование сети', user: 'unknown', entity: '192.168.1.0/24', severity: 'medium' },
  { id: '4', timestamp: '14:10:30', action: 'Запуск процесса', user: 'system', entity: 'suspicious.exe', severity: 'high' },
  { id: '5', timestamp: '14:05:12', action: 'Изменение файла', user: 'admin_user', entity: '/etc/passwd', severity: 'critical' },
  { id: '6', timestamp: '14:00:00', action: 'Сетевое подключение', user: 'service_account', entity: '203.0.113.5:443', severity: 'low' }
];

export const mockGraphNodes: GraphNode[] = [
  { id: 'user1', type: 'User', label: 'admin_user', risk: 'critical', connections: ['host1', 'process1'] },
  { id: 'host1', type: 'Host', label: 'DB-PROD-01', risk: 'high', connections: ['user1', 'file1', 'network1'] },
  { id: 'process1', type: 'Process', label: 'suspicious.exe', risk: 'critical', connections: ['user1', 'file1', 'network1'] },
  { id: 'file1', type: 'File', label: '/etc/passwd', risk: 'high', connections: ['host1', 'process1'] },
  { id: 'network1', type: 'Network', label: '203.0.113.5', risk: 'medium', connections: ['host1', 'process1'] },
  { id: 'host2', type: 'Host', label: 'APP-PROD-03', risk: 'medium', connections: ['user1'] }
];

export const recommendations: Recommendation[] = [
  { id: '1', priority: 'critical', action: 'Немедленно изолировать учётную запись admin_user', reason: 'Обнаружена подозрительная активность' },
  { id: '2', priority: 'high', action: 'Проверить целостность файлов на DB-PROD-01', reason: 'Возможна компрометация системных файлов' },
  { id: '3', priority: 'high', action: 'Заблокировать сетевое подключение к 203.0.113.5', reason: 'IP адрес находится в списке IOC' },
  { id: '4', priority: 'medium', action: 'Обновить правила firewall на пограничных серверах', reason: 'Обнаружены попытки брутфорса' }
];
