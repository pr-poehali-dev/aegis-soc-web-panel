import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { TimelineEvent } from '@/types/security';
import { getRiskColor } from '@/utils/colorHelpers';

interface TimelineTabProps {
  events: TimelineEvent[];
}

const TimelineTab = ({ events }: TimelineTabProps) => {
  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white">Таймлайн событий</CardTitle>
        <CardDescription>Хронология действий и событий безопасности</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <div className="relative pl-8 space-y-6">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-700"></div>
            
            {events.map((event, index) => (
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
  );
};

export default TimelineTab;
