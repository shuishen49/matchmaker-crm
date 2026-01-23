
export enum Page {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  RESOURCES = 'RESOURCES',
  SERVICE = 'SERVICE',
  FINANCE = 'FINANCE',
  RECORDS = 'RECORDS',
  MANAGE = 'MANAGE'
}

export interface SummaryCardProps {
  title: string;
  icon: string;
  colorClass: string;
  bgClass: string;
  stats: {
    label: string;
    value: string | number;
    subValue?: string;
  }[];
}

export interface ResourceData {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  stage: string;
  tags: string[];
  followUps: number;
  lastContact: string;
  assignedTo: string;
  source: string;
  createdAt: string;
}