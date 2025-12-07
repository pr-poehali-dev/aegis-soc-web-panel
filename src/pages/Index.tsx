import { useState, useMemo } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
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
  const [activeTab, setActiveTab] = useState<string>('incidents');

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
      <DashboardHeader currentUser={currentUser} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="container mx-auto px-4 lg:px-6 py-4 lg:py-6">
        <MetricsCards />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 lg:space-y-6">
          <div className="hidden lg:flex justify-center">
            <div className="inline-flex items-center gap-2 bg-slate-900/50 border border-slate-800 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('incidents')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                  activeTab === 'incidents' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon name="AlertCircle" size={16} />
                <span className="font-medium">Инциденты</span>
              </button>
              <button
                onClick={() => setActiveTab('attack-graph')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                  activeTab === 'attack-graph' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon name="Network" size={16} />
                <span className="font-medium">График атаки</span>
              </button>
              <button
                onClick={() => setActiveTab('timeline')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                  activeTab === 'timeline' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon name="Activity" size={16} />
                <span className="font-medium">Таймлайн</span>
              </button>
              <button
                onClick={() => setActiveTab('recommendations')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                  activeTab === 'recommendations' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon name="Lightbulb" size={16} />
                <span className="font-medium">Рекомендации</span>
              </button>
            </div>
          </div>

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