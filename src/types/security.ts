export type IncidentStatus = 'active' | 'investigating' | 'resolved' | 'false_positive';
export type RiskLevel = 'critical' | 'high' | 'medium' | 'low';
export type UserRole = 'admin' | 'analyst' | 'viewer';

export interface Incident {
  id: string;
  title: string;
  description: string;
  risk: RiskLevel;
  status: IncidentStatus;
  timestamp: string;
  affectedAssets: number;
  type: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  entity: string;
  severity: RiskLevel;
}

export interface GraphNode {
  id: string;
  type: 'User' | 'Host' | 'Process' | 'File' | 'Network';
  label: string;
  risk: RiskLevel;
  connections: string[];
}

export interface Recommendation {
  id: string;
  priority: string;
  action: string;
  reason: string;
}
