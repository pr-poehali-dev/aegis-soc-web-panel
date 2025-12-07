import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

type IncidentStatus = 'active' | 'investigating' | 'resolved' | 'false_positive';
type RiskLevel = 'critical' | 'high' | 'medium' | 'low';
type UserRole = 'admin' | 'analyst' | 'viewer';

interface Incident {
  id: string;
  title: string;
  description: string;
  risk: RiskLevel;
  status: IncidentStatus;
  timestamp: string;
  affectedAssets: number;
  type: string;
}

interface TimelineEvent {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  entity: string;
  severity: RiskLevel;
}

interface GraphNode {
  id: string;
  type: 'User' | 'Host' | 'Process' | 'File' | 'Network';
  label: string;
  risk: RiskLevel;
  connections: string[];
}

const mockIncidents: Incident[] = [
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

const mockTimeline: TimelineEvent[] = [
  { id: '1', timestamp: '14:23:15', action: 'Доступ к системе', user: 'admin_user', entity: 'DB-PROD-01', severity: 'critical' },
  { id: '2', timestamp: '14:20:02', action: 'Попытка авторизации', user: 'admin_user', entity: 'APP-PROD-03', severity: 'high' },
  { id: '3', timestamp: '14:15:45', action: 'Сканирование сети', user: 'unknown', entity: '192.168.1.0/24', severity: 'medium' },
  { id: '4', timestamp: '14:10:30', action: 'Запуск процесса', user: 'system', entity: 'suspicious.exe', severity: 'high' },
  { id: '5', timestamp: '14:05:12', action: 'Изменение файла', user: 'admin_user', entity: '/etc/passwd', severity: 'critical' },
  { id: '6', timestamp: '14:00:00', action: 'Сетевое подключение', user: 'service_account', entity: '203.0.113.5:443', severity: 'low' }
];

const mockGraphNodes: GraphNode[] = [
  { id: 'user1', type: 'User', label: 'admin_user', risk: 'critical', connections: ['host1', 'process1'] },
  { id: 'host1', type: 'Host', label: 'DB-PROD-01', risk: 'high', connections: ['user1', 'file1', 'network1'] },
  { id: 'process1', type: 'Process', label: 'suspicious.exe', risk: 'critical', connections: ['user1', 'file1', 'network1'] },
  { id: 'file1', type: 'File', label: '/etc/passwd', risk: 'high', connections: ['host1', 'process1'] },
  { id: 'network1', type: 'Network', label: '203.0.113.5', risk: 'medium', connections: ['host1', 'process1'] },
  { id: 'host2', type: 'Host', label: 'APP-PROD-03', risk: 'medium', connections: ['user1'] }
];

const recommendations = [
  { id: '1', priority: 'critical', action: 'Немедленно изолировать учётную запись admin_user', reason: 'Обнаружена подозрительная активность' },
  { id: '2', priority: 'high', action: 'Проверить целостность файлов на DB-PROD-01', reason: 'Возможна компрометация системных файлов' },
  { id: '3', priority: 'high', action: 'Заблокировать сетевое подключение к 203.0.113.5', reason: 'IP адрес находится в списке IOC' },
  { id: '4', priority: 'medium', action: 'Обновить правила firewall на пограничных серверах', reason: 'Обнаружены попытки брутфорса' }
];

const Index = () => {
  const [currentUser] = useState<UserRole>('analyst');
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getRiskColor = (risk: RiskLevel) => {
    const colors = {
      critical: 'bg-red-500/20 text-red-400 border-red-500/50',
      high: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
      medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
      low: 'bg-blue-500/20 text-blue-400 border-blue-500/50'
    };
    return colors[risk];
  };

  const getStatusColor = (status: IncidentStatus) => {
    const colors = {
      active: 'bg-red-500/20 text-red-400',
      investigating: 'bg-yellow-500/20 text-yellow-400',
      resolved: 'bg-green-500/20 text-green-400',
      false_positive: 'bg-gray-500/20 text-gray-400'
    };
    return colors[status];
  };

  const getNodeIcon = (type: string) => {
    const icons = {
      User: 'User',
      Host: 'Server',
      Process: 'Cpu',
      File: 'FileText',
      Network: 'Globe'
    };
    return icons[type as keyof typeof icons] || 'Circle';
  };

  const filteredIncidents = mockIncidents.filter(incident => {
    const matchesRisk = filterRisk === 'all' || incident.risk === filterRisk;
    const matchesStatus = filterStatus === 'all' || incident.status === filterStatus;
    const matchesSearch = incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          incident.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRisk && matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Icon name="Shield" size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">AegisSOC</h1>
                  <p className="text-xs text-slate-400">Security Operations Center</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <Icon name="Bell" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <Icon name="Settings" size={20} />
              </Button>
              <div className="flex items-center gap-2 pl-4 border-l border-slate-800">
                <Avatar>
                  <AvatarFallback className="bg-blue-500 text-white">AN</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="text-white font-medium">Analyst User</p>
                  <p className="text-slate-400 text-xs capitalize">{currentUser}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-slate-900/50 border-slate-800 animate-fade-in">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-400">Активные инциденты</CardTitle>
                <Icon name="AlertTriangle" size={20} className="text-red-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">12</div>
              <p className="text-xs text-red-400 mt-1">+3 за последний час</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-400">Критичные угрозы</CardTitle>
                <Icon name="ShieldAlert" size={20} className="text-orange-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">4</div>
              <p className="text-xs text-orange-400 mt-1">Требуют внимания</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-400">Скомпрометировано</CardTitle>
                <Icon name="Users" size={20} className="text-yellow-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">8</div>
              <p className="text-xs text-slate-400 mt-1">Учётных записей</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-400">Время реакции</CardTitle>
                <Icon name="Clock" size={20} className="text-cyan-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">15м</div>
              <p className="text-xs text-green-400 mt-1">Среднее за сутки</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="incidents" className="space-y-6">
          <TabsList className="bg-slate-900/50 border border-slate-800">
            <TabsTrigger value="incidents" className="data-[state=active]:bg-blue-500">
              <Icon name="AlertCircle" size={16} className="mr-2" />
              Инциденты
            </TabsTrigger>
            <TabsTrigger value="attack-graph" className="data-[state=active]:bg-blue-500">
              <Icon name="Network" size={16} className="mr-2" />
              График атаки
            </TabsTrigger>
            <TabsTrigger value="timeline" className="data-[state=active]:bg-blue-500">
              <Icon name="Activity" size={16} className="mr-2" />
              Таймлайн
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="data-[state=active]:bg-blue-500">
              <Icon name="Lightbulb" size={16} className="mr-2" />
              Рекомендации
            </TabsTrigger>
          </TabsList>

          <TabsContent value="incidents" className="space-y-4">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-white">Список инцидентов</CardTitle>
                    <CardDescription>Мониторинг и управление событиями безопасности</CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Input 
                      placeholder="Поиск инцидентов..." 
                      className="w-64 bg-slate-800 border-slate-700 text-white"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Select value={filterRisk} onValueChange={setFilterRisk}>
                      <SelectTrigger className="w-40 bg-slate-800 border-slate-700 text-white">
                        <SelectValue placeholder="Риск" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все риски</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-40 bg-slate-800 border-slate-700 text-white">
                        <SelectValue placeholder="Статус" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все статусы</SelectItem>
                        <SelectItem value="active">Активные</SelectItem>
                        <SelectItem value="investigating">В работе</SelectItem>
                        <SelectItem value="resolved">Решённые</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-3">
                    {filteredIncidents.map((incident) => (
                      <Card 
                        key={incident.id}
                        className={`bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all cursor-pointer hover-scale ${
                          selectedIncident === incident.id ? 'border-blue-500 bg-slate-800' : ''
                        }`}
                        onClick={() => setSelectedIncident(incident.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge variant="outline" className={getRiskColor(incident.risk)}>
                                  {incident.risk.toUpperCase()}
                                </Badge>
                                <Badge className={getStatusColor(incident.status)}>
                                  {incident.status}
                                </Badge>
                                <span className="text-slate-400 text-sm">{incident.id}</span>
                              </div>
                              <h3 className="text-white font-semibold">{incident.title}</h3>
                              <p className="text-slate-400 text-sm">{incident.description}</p>
                              <div className="flex items-center gap-4 text-xs text-slate-500">
                                <span className="flex items-center gap-1">
                                  <Icon name="Clock" size={14} />
                                  {incident.timestamp}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Icon name="Server" size={14} />
                                  {incident.affectedAssets} активов
                                </span>
                                <span className="flex items-center gap-1">
                                  <Icon name="Tag" size={14} />
                                  {incident.type}
                                </span>
                              </div>
                            </div>
                            <Button size="sm" variant="outline" className="border-slate-700 text-slate-400 hover:text-white">
                              <Icon name="ExternalLink" size={16} />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attack-graph" className="space-y-4">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Граф атаки</CardTitle>
                <CardDescription>Визуализация связей между скомпрометированными объектами</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-[600px] bg-slate-950/50 rounded-lg border border-slate-800 p-8">
                  <svg className="w-full h-full">
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#475569" />
                      </marker>
                    </defs>
                    
                    <line x1="200" y1="100" x2="400" y2="300" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <line x1="200" y1="100" x2="600" y2="150" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <line x1="400" y1="300" x2="600" y2="300" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <line x1="400" y1="300" x2="400" y2="450" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <line x1="600" y1="150" x2="400" y2="450" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <line x1="600" y1="300" x2="400" y2="450" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <line x1="200" y1="100" x2="800" y2="250" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  </svg>

                  {[
                    { node: mockGraphNodes[0], x: 200, y: 100 },
                    { node: mockGraphNodes[1], x: 400, y: 300 },
                    { node: mockGraphNodes[2], x: 600, y: 150 },
                    { node: mockGraphNodes[3], x: 600, y: 300 },
                    { node: mockGraphNodes[4], x: 400, y: 450 },
                    { node: mockGraphNodes[5], x: 800, y: 250 }
                  ].map(({ node, x, y }) => (
                    <div 
                      key={node.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                      style={{ left: `${x}px`, top: `${y}px` }}
                    >
                      <div className={`
                        w-24 h-24 rounded-full flex flex-col items-center justify-center gap-1
                        border-2 backdrop-blur-sm transition-all cursor-pointer
                        ${getRiskColor(node.risk)} hover:scale-110
                      `}>
                        <Icon name={getNodeIcon(node.type)} size={24} />
                        <span className="text-xs font-medium">{node.type}</span>
                      </div>
                      <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 
                                    bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white
                                    opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {node.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-4 justify-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-slate-400">Critical</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-slate-400">High</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-slate-400">Medium</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-slate-400">Low</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Таймлайн событий</CardTitle>
                <CardDescription>Хронология действий и событий безопасности</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="relative pl-8 space-y-6">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-700"></div>
                    
                    {mockTimeline.map((event, index) => (
                      <div key={event.id} className="relative animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className={`absolute left-[-1.75rem] w-6 h-6 rounded-full border-2 flex items-center justify-center
                                      ${getRiskColor(event.severity)}`}>
                          <div className="w-2 h-2 rounded-full bg-current"></div>
                        </div>
                        
                        <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-colors">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-slate-400 text-sm font-mono">{event.timestamp}</span>
                                  <Badge variant="outline" className={getRiskColor(event.severity)}>
                                    {event.severity}
                                  </Badge>
                                </div>
                                <p className="text-white font-medium">{event.action}</p>
                                <div className="flex items-center gap-4 text-sm text-slate-400">
                                  <span className="flex items-center gap-1">
                                    <Icon name="User" size={14} />
                                    {event.user}
                                  </span>
                                  <Separator orientation="vertical" className="h-4" />
                                  <span className="flex items-center gap-1">
                                    <Icon name="Target" size={14} />
                                    {event.entity}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Рекомендации аналитика</CardTitle>
                <CardDescription>Предлагаемые действия для реагирования на угрозы</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <Card 
                      key={rec.id}
                      className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
                                        ${getRiskColor(rec.priority as RiskLevel)}`}>
                            <Icon name="AlertTriangle" size={24} />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className={getRiskColor(rec.priority as RiskLevel)}>
                                {rec.priority.toUpperCase()}
                              </Badge>
                            </div>
                            <h3 className="text-white font-semibold">{rec.action}</h3>
                            <p className="text-slate-400 text-sm">{rec.reason}</p>
                          </div>
                          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                            Выполнить
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="mt-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <Icon name="Lightbulb" size={24} className="text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-2">Автоматические рекомендации</h3>
                        <p className="text-slate-300 text-sm mb-4">
                          Система проанализировала текущие инциденты и предлагает создать новые правила корреляции
                          для автоматического обнаружения подобных атак в будущем.
                        </p>
                        <Button variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10">
                          <Icon name="Plus" size={16} className="mr-2" />
                          Создать правила
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
