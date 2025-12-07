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
  );
};

export default RecommendationsTab;
