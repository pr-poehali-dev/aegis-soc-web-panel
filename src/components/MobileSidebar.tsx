import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MobileSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MobileSidebar = ({ activeTab, onTabChange }: MobileSidebarProps) => {
  const menuItems = [
    { id: 'incidents', label: 'Инциденты', icon: 'AlertCircle' },
    { id: 'attack-graph', label: 'График атаки', icon: 'Network' },
    { id: 'timeline', label: 'Таймлайн', icon: 'Activity' },
    { id: 'recommendations', label: 'Рекомендации', icon: 'Lightbulb' }
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden text-slate-400 hover:text-white"
        >
          <Icon name="Menu" size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className="w-80 bg-slate-950 border-slate-800 p-0"
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Icon name="Shield" size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">AegisSOC</h2>
                <p className="text-xs text-slate-400">Навигация</p>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {menuItems.map((item) => (
                <SheetTrigger asChild key={item.id}>
                  <Button
                    variant={activeTab === item.id ? 'default' : 'ghost'}
                    className={`w-full justify-start gap-3 h-12 ${
                      activeTab === item.id
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                    onClick={() => onTabChange(item.id)}
                  >
                    <Icon name={item.icon} size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Button>
                </SheetTrigger>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-slate-800">
            <div className="text-xs text-slate-500 text-center">
              AegisSOC v1.0
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
