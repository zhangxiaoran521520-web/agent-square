'use client';

import { useState, useEffect } from 'react';
import AgentCard from '@/components/AgentCard';
import type { Agent } from '@/types';

export default function HomePage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const mockAgents: Agent[] = [
      {
        id: '1',
        name: '日程助手',
        description: '智能管理飞书日程，自动提醒会议，智能安排空闲时间',
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
        description: '查询内部数据并生成可视化报表，支持多种数据格式导出',
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
        description: '自动生成会议纪要、周报月报，支持多种格式模板',
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
        description: '处理审批流程，发送提醒通知，跟踪审批进度',
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
        description: '协助团队协作，分配任务，跟进进度',
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
        description: '智能搜索知识库，快速定位所需信息',
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
    
    setAgents(mockAgents);
    setLoading(false);
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
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">正在加载智能体广场...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <section className="mb-12">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-12 md:p-16">
            <div className="absolute inset-0 bg-white/10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-white text-sm">已有 {agents.length} 个智能体</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                智能体广场
              </h1>
              <p className="text-lg text-white/80 max-w-2xl mb-8">
                发现和使用企业内部AI智能体，提升工作效率，让AI成为你的得力助手
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-md">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="搜索智能体..."
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/95 backdrop-blur-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">发现智能体</h2>
              <p className="text-gray-500 mt-1">探索由同事创建的AI智能体</p>
            </div>
            
            <div className="tabs">
              <button
                className={`tab ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                全部
              </button>
              <button
                className={`tab ${activeTab === 'recommended' ? 'active' : ''}`}
                onClick={() => setActiveTab('recommended')}
              >
                推荐
              </button>
              <button
                className={`tab ${activeTab === 'mine' ? 'active' : ''}`}
                onClick={() => setActiveTab('mine')}
              >
                我的
              </button>
            </div>
          </div>

          {filteredAgents.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">暂无智能体</h3>
              <p className="text-gray-500">成为第一个创建智能体的人吧！</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAgents.map((agent, index) => (
                <div 
                  key={agent.id}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="animate-[fadeInUp_0.5s_ease-out_forwards opacity-0"
                  onMouseEnter={() => setHoveredCard(agent.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <AgentCard agent={agent} isHovered={hoveredCard === agent.id} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
