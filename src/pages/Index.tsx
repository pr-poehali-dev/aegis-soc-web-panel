import { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import DashboardHeader from '@/components/DashboardHeader';
import MetricsCards from '@/components/MetricsCards';
import IncidentsTab from '@/components/IncidentsTab';
import AttackGraphTab from '@/components/AttackGraphTab';
import TimelineTab from '@/components/TimelineTab';
import RecommendationsTab from '@/components/RecommendationsTab';
import { mockIncidents, mockTimeline, mockGraphNodes, recommendations } from '@/data/mockData';
import { UserRole } from '@/types/security';

const Index = () => {
  const [currentUser] = useState<UserRole>('analyst');
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIncidents = useMemo(() => {
    return mockIncidents.filter(incident => {
      const matchesRisk = filterRisk === 'all' || incident.risk === filterRisk;
      const matchesStatus = filterStatus === 'all' || incident.status === filterStatus;
      const matchesSearch = incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            incident.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRisk && matchesStatus && matchesSearch;
    });
  }, [filterRisk, filterStatus, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <DashboardHeader currentUser={currentUser} />

      <div className="container mx-auto px-6 py-6">
        <MetricsCards />

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
            <IncidentsTab
              incidents={filteredIncidents}
              selectedIncident={selectedIncident}
              setSelectedIncident={setSelectedIncident}
              filterRisk={filterRisk}
              setFilterRisk={setFilterRisk}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </TabsContent>

          <TabsContent value="attack-graph" className="space-y-4">
            <AttackGraphTab nodes={mockGraphNodes} />
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <TimelineTab events={mockTimeline} />
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <RecommendationsTab recommendations={recommendations} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
