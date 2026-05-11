export interface Agent {
  id: string;
  name: string;
  description: string;
  icon: string;
  systemPrompt: string;
  tools: string[];
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  usageCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
}

export const AVAILABLE_TOOLS: Tool[] = [
  {
    id: 'calendar',
    name: '飞书日历',
    description: '查询和管理日程、会议',
    icon: '📅',
    enabled: true,
  },
  {
    id: 'doc',
    name: '飞书文档',
    description: '读取和编辑飞书文档',
    icon: '📝',
    enabled: true,
  },
  {
    id: 'approval',
    name: '飞书审批',
    description: '发起和审批流程',
    icon: '🤝',
    enabled: true,
  },
  {
    id: 'task',
    name: '飞书任务',
    description: '管理任务和待办',
    icon: '✅',
    enabled: true,
  },
  {
    id: 'contact',
    name: '飞书通讯录',
    description: '查询员工信息',
    icon: '👥',
    enabled: true,
  },
  {
    id: 'base',
    name: '飞书多维表格',
    description: '读写多维表格数据',
    icon: '📊',
    enabled: true,
  },
];
