import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { UserRole } from '@/types/security';
import MobileSidebar from './MobileSidebar';

interface DashboardHeaderProps {
  currentUser: UserRole;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DashboardHeader = ({ currentUser, activeTab, onTabChange }: DashboardHeaderProps) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-6 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 lg:gap-4">
            <MobileSidebar activeTab={activeTab} onTabChange={onTabChange} />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Icon name="Shield" size={20} className="text-white lg:w-6 lg:h-6" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg lg:text-xl font-bold text-white">AegisSOC</h1>
                <p className="text-xs text-slate-400">Security Operations Center</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 lg:gap-4">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
              <Icon name="Bell" size={18} className="lg:w-5 lg:h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hidden sm:flex">
              <Icon name="Settings" size={18} className="lg:w-5 lg:h-5" />
            </Button>
            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-slate-800">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-blue-500 text-white text-xs">AN</AvatarFallback>
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
  );
};

export default DashboardHeader;