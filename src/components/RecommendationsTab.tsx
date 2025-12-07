import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Recommendation, RiskLevel } from '@/types/security';
import { getRiskColor } from '@/utils/colorHelpers';

interface RecommendationsTabProps {
  recommendations: Recommendation[];
}

const RecommendationsTab = ({ recommendations }: RecommendationsTabProps) => {
  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader className="p-4 lg:p-6">
        <CardTitle className="text-white text-lg lg:text-xl">Рекомендации аналитика</CardTitle>
        <CardDescription className="text-xs lg:text-sm">Предлагаемые действия для реагирования на угрозы</CardDescription>
      </CardHeader>
      <CardContent className="p-4 lg:p-6">
        <div className="space-y-3 lg:space-y-4">
          {recommendations.map((rec, index) => (
            <Card 
              key={rec.id}
              className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all animate-fade-in active:scale-95"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-3 lg:p-4">
                <div className="flex flex-col sm:flex-row items-start gap-3 lg:gap-4">
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center flex-shrink-0
                                ${getRiskColor(rec.priority as RiskLevel)}`}>
                    <Icon name="AlertTriangle" size={20} className="lg:w-6 lg:h-6" />
                  </div>
                  <div className="flex-1 space-y-1.5 lg:space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`${getRiskColor(rec.priority as RiskLevel)} text-xs`}>
                        {rec.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <h3 className="text-white font-semibold text-sm lg:text-base">{rec.action}</h3>
                    <p className="text-slate-400 text-xs lg:text-sm">{rec.reason}</p>
                  </div>
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto text-sm">
                    Выполнить
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-4 lg:mt-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30">
          <CardContent className="p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row items-start gap-3 lg:gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Icon name="Lightbulb" size={20} className="text-blue-400 lg:w-6 lg:h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-2 text-sm lg:text-base">Автоматические рекомендации</h3>
                <p className="text-slate-300 text-xs lg:text-sm mb-4">
                  Система проанализировала текущие инциденты и предлагает создать новые правила корреляции
                  для автоматического обнаружения подобных атак в будущем.
                </p>
                <Button variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 w-full sm:w-auto text-sm">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Создать правила
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default RecommendationsTab;