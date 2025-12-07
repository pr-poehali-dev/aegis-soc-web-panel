import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { Incident } from '@/types/security';
import { getRiskColor, getStatusColor } from '@/utils/colorHelpers';

interface IncidentsTabProps {
  incidents: Incident[];
  selectedIncident: string | null;
  setSelectedIncident: (id: string | null) => void;
  filterRisk: string;
  setFilterRisk: (risk: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const IncidentsTab = ({
  incidents,
  selectedIncident,
  setSelectedIncident,
  filterRisk,
  setFilterRisk,
  filterStatus,
  setFilterStatus,
  searchQuery,
  setSearchQuery
}: IncidentsTabProps) => {
  return (
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
            {incidents.map((incident) => (
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
  );
};

export default IncidentsTab;
