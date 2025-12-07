import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { GraphNode } from '@/types/security';
import { getRiskColor, getNodeIcon } from '@/utils/colorHelpers';

interface AttackGraphTabProps {
  nodes: GraphNode[];
}

const AttackGraphTab = ({ nodes }: AttackGraphTabProps) => {
  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader className="p-4 lg:p-6">
        <CardTitle className="text-white text-lg lg:text-xl">Граф атаки</CardTitle>
        <CardDescription className="text-xs lg:text-sm">Визуализация связей между скомпрометированными объектами</CardDescription>
      </CardHeader>
      <CardContent className="p-4 lg:p-6">
        <div className="relative h-[400px] lg:h-[600px] bg-slate-950/50 rounded-lg border border-slate-800 p-4 lg:p-8 overflow-hidden">
          <svg className="w-full h-full">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#475569" />
              </marker>
            </defs>
            
            <line x1="200" y1="100" x2="400" y2="300" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <line x1="200" y1="100" x2="600" y2="150" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <line x1="400" y1="300" x2="600" y2="300" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <line x1="400" y1="300" x2="400" y2="450" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <line x1="600" y1="150" x2="400" y2="450" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <line x1="600" y1="300" x2="400" y2="450" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <line x1="200" y1="100" x2="800" y2="250" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)" />
          </svg>

          {[
            { node: nodes[0], x: 200, y: 100 },
            { node: nodes[1], x: 400, y: 300 },
            { node: nodes[2], x: 600, y: 150 },
            { node: nodes[3], x: 600, y: 300 },
            { node: nodes[4], x: 400, y: 450 },
            { node: nodes[5], x: 800, y: 250 }
          ].map(({ node, x, y }) => (
            <div 
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${x}px`, top: `${y}px` }}
            >
              <div className={`
                w-16 h-16 lg:w-24 lg:h-24 rounded-full flex flex-col items-center justify-center gap-0.5 lg:gap-1
                border-2 backdrop-blur-sm transition-all cursor-pointer active:scale-95
                ${getRiskColor(node.risk)} lg:hover:scale-110
              `}>
                <Icon name={getNodeIcon(node.type)} size={18} className="lg:w-6 lg:h-6" />
                <span className="text-[10px] lg:text-xs font-medium">{node.type}</span>
              </div>
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 
                            bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white
                            opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {node.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2 lg:gap-4 justify-center text-xs lg:text-sm flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-slate-400">Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-slate-400">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-slate-400">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-slate-400">Low</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttackGraphTab;