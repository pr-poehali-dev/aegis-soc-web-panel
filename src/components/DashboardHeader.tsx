import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { UserRole } from '@/types/security';

interface DashboardHeaderProps {
  currentUser: UserRole;
}

const DashboardHeader = ({ currentUser }: DashboardHeaderProps) => {
  return (
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
  );
};

export default DashboardHeader;
