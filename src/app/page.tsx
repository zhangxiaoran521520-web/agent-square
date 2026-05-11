'use client';

import { useState, useEffect } from 'react';
import AgentCard from '@/components/AgentCard';
import type { Agent } from '@/types';

export default function HomePage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const mockAgents: Agent[] = [
      {
        id: '1',
        name: '日程助手',
        description: '帮你管理飞书日程，自动提醒会议',
        icon: '📅',
        systemPrompt: '你是一个日程管理助手...',
        tools: ['飞书日历'],
        authorId: 'user1',
        authorName: '李四',
        usageCount: 128,
        rating: 4.8,
        createdAt: '2025-01-01',
        updatedAt: '2025-01-15',
      },
      {
        id: '2',
        name: '数据查询助手',
        description: '查询内部数据并生成报表',
        icon: '📊',
        systemPrompt: '你是一个数据分析师...',
        tools: ['飞书多维表格'],
        authorId: 'user2',
        authorName: '王五',
        usageCount: 96,
        rating: 4.9,
        createdAt: '2025-01-02',
        updatedAt: '2025-01-16',
      },
      {
        id: '3',
        name: '文档生成器',
        description: '自动生成会议纪要、周报',
        icon: '📝',
        systemPrompt: '你是一个文档助手...',
        tools: ['飞书文档'],
        authorId: 'user3',
        authorName: '赵六',
        usageCount: 256,
        rating: 4.7,
        createdAt: '2025-01-03',
        updatedAt: '2025-01-17',
      },
      {
        id: '4',
        name: '审批助手',
        description: '处理审批流程，发送提醒通知',
        icon: '🤝',
        systemPrompt: '你是一个审批助手...',
        tools: ['飞书审批'],
        authorId: 'user4',
        authorName: '钱七',
        usageCount: 89,
        rating: 4.6,
        createdAt: '2025-01-04',
        updatedAt: '2025-01-18',
      },
    ];
    
    setAgents(mockAgents);
    setLoading(false);
  }, []);

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') {
      return matchesSearch;
    }
    
    return matchesSearch && agent.authorId === 'currentUser';
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-[var(--feishu-gray-4)]">加载中...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--feishu-gray-6)] mb-2">
          智能体广场
        </h1>
        <p className="text-[var(--feishu-gray-4)]">
          发现和使用企业内部AI智能体，提升工作效率
        </p>
      </div>

      <div className="mb-6 flex gap-4 items-center">
        <input
          type="text"
          placeholder="搜索智能体..."
          className="input flex-1 max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="tabs mb-6">
        <button
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          全部
        </button>
        <button
          className={`tab ${activeTab === 'mine' ? 'active' : ''}`}
          onClick={() => setActiveTab('mine')}
        >
          我的
        </button>
        <button
          className={`tab ${activeTab === 'recommended' ? 'active' : ''}`}
          onClick={() => setActiveTab('recommended')}
        >
          推荐
        </button>
      </div>

      {filteredAgents.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[var(--feishu-gray-4)]">暂无智能体</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      )}
    </div>
  );
}
