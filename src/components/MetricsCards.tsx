import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const MetricsCards = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-4 lg:mb-6">
      <Card className="bg-slate-900/50 border-slate-800 animate-fade-in">
        <CardHeader className="pb-2 p-3 lg:p-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs lg:text-sm font-medium text-slate-400">Активные инциденты</CardTitle>
            <Icon name="AlertTriangle" size={16} className="text-red-400 lg:w-5 lg:h-5" />
          </div>
        </CardHeader>
        <CardContent className="p-3 lg:p-6 pt-0">
          <div className="text-2xl lg:text-3xl font-bold text-white">12</div>
          <p className="text-xs text-red-400 mt-1">+3 за час</p>
        </CardContent>
      </Card>

      <Card className="bg-slate-900/50 border-slate-800 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <CardHeader className="pb-2 p-3 lg:p-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs lg:text-sm font-medium text-slate-400">Критичные угрозы</CardTitle>
            <Icon name="ShieldAlert" size={16} className="text-orange-400 lg:w-5 lg:h-5" />
          </div>
        </CardHeader>
        <CardContent className="p-3 lg:p-6 pt-0">
          <div className="text-2xl lg:text-3xl font-bold text-white">4</div>
          <p className="text-xs text-orange-400 mt-1">Требуют внимания</p>
        </CardContent>
      </Card>

      <Card className="bg-slate-900/50 border-slate-800 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <CardHeader className="pb-2 p-3 lg:p-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs lg:text-sm font-medium text-slate-400">Скомпрометировано</CardTitle>
            <Icon name="Users" size={16} className="text-yellow-400 lg:w-5 lg:h-5" />
          </div>
        </CardHeader>
        <CardContent className="p-3 lg:p-6 pt-0">
          <div className="text-2xl lg:text-3xl font-bold text-white">8</div>
          <p className="text-xs text-slate-400 mt-1">Учётных записей</p>
        </CardContent>
      </Card>

      <Card className="bg-slate-900/50 border-slate-800 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <CardHeader className="pb-2 p-3 lg:p-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs lg:text-sm font-medium text-slate-400">Время реакции</CardTitle>
            <Icon name="Clock" size={16} className="text-cyan-400 lg:w-5 lg:h-5" />
          </div>
        </CardHeader>
        <CardContent className="p-3 lg:p-6 pt-0">
          <div className="text-2xl lg:text-3xl font-bold text-white">15м</div>
          <p className="text-xs text-green-400 mt-1">Среднее за сутки</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsCards;
