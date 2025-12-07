import { RiskLevel, IncidentStatus } from '@/types/security';

export const getRiskColor = (risk: RiskLevel): string => {
  const colors = {
    critical: 'bg-red-500/20 text-red-400 border-red-500/50',
    high: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    low: 'bg-blue-500/20 text-blue-400 border-blue-500/50'
  };
  return colors[risk];
};

export const getStatusColor = (status: IncidentStatus): string => {
  const colors = {
    active: 'bg-red-500/20 text-red-400',
    investigating: 'bg-yellow-500/20 text-yellow-400',
    resolved: 'bg-green-500/20 text-green-400',
    false_positive: 'bg-gray-500/20 text-gray-400'
  };
  return colors[status];
};

export const getNodeIcon = (type: string): string => {
  const icons = {
    User: 'User',
    Host: 'Server',
    Process: 'Cpu',
    File: 'FileText',
    Network: 'Globe'
  };
  return icons[type as keyof typeof icons] || 'Circle';
};
