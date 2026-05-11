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
        description: '智能管理飞书日程，自动提醒会议',
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
        description: '查询内部数据并生成可视化报表',
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
        description: '自动生成会议纪要、周报月报',
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
      {
        id: '5',
        name: '团队协作助手',
        description: '协助团队协作，分配任务',
        icon: '👥',
        systemPrompt: '你是一个团队协作助手...',
        tools: ['飞书即时通讯'],
        authorId: 'user5',
        authorName: '孙八',
        usageCount: 167,
        rating: 4.8,
        createdAt: '2025-01-05',
        updatedAt: '2025-01-19',
      },
      {
        id: '6',
        name: '知识库助手',
        description: '智能搜索知识库，快速定位信息',
        icon: '📚',
        systemPrompt: '你是一个知识库助手...',
        tools: ['飞书知识库'],
        authorId: 'user6',
        authorName: '周九',
        usageCount: 143,
        rating: 4.5,
        createdAt: '2025-01-06',
        updatedAt: '2025-01-20',
      },
    ];
    
    setTimeout(() => {
      setAgents(mockAgents);
      setLoading(false);
    }, 300);
  }, []);

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'recommended') return matchesSearch && agent.rating >= 4.7;
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">正在加载智能体广场...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full mb-6 border border-white/10">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-text-secondary text-sm">已有 {agents.length} 个智能体</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              智能体广场
            </span>
          </h1>
          <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
            发现和使用企业内部AI智能体，让AI成为你的得力助手
          </p>
          
          <div className="max-w-xl mx-auto relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="搜索智能体..."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all text-white placeholder:text-text-muted"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
            <button
              className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'all' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30' : 'text-text-muted hover:text-text-primary'}`}
              onClick={() => setActiveTab('all')}
            >
              全部
            </button>
            <button
              className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'recommended' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30' : 'text-text-muted hover:text-text-primary'}`}
              onClick={() => setActiveTab('recommended')}
            >
              推荐
            </button>
            <button
              className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'mine' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30' : 'text-text-muted hover:text-text-primary'}`}
              onClick={() => setActiveTab('mine')}
            >
              我的
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAgents.map((agent, index) => (
            <div 
              key={agent.id}
              className="transform transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <AgentCard agent={agent} isHovered={false} />
            </div>
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <svg className="w-10 h-10 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">暂无智能体</h3>
            <p className="text-text-muted">成为第一个创建智能体的人吧！</p>
          </div>
        )}
      </div>
    </div>
  );
}
