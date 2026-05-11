'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import type { Agent, Message } from '@/types';

export default function AgentDetailPage() {
  const params = useParams();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const mockAgent: Agent = {
      id: params.id as string,
      name: '日程助手',
      description: '帮你管理飞书日程，自动提醒会议',
      icon: '📅',
      systemPrompt: '你是一个专业的日程管理助手...',
      tools: ['飞书日历'],
      authorId: 'user1',
      authorName: '李四',
      usageCount: 128,
      rating: 4.8,
      createdAt: '2025-01-01',
      updatedAt: '2025-01-15',
    };
    
    setTimeout(() => {
      setAgent(mockAgent);
      setLoading(false);
    }, 500);
  }, [params.id]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || sending) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setSending(true);
    
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '好的，我已经收到您的请求。请问还有什么需要帮助的吗？',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setSending(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-[var(--feishu-gray-4)]">加载中...</div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-[var(--feishu-gray-4)]">智能体不存在</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="card sticky top-6">
            <div 
              className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center text-3xl"
              style={{ backgroundColor: '#e8f3ff' }}
            >
              {agent.icon}
            </div>
            
            <h1 className="text-xl font-bold text-[var(--feishu-gray-6)] mb-2">
              {agent.name}
            </h1>
            
            <p className="text-sm text-[var(--feishu-gray-4)] mb-4">
              {agent.description}
            </p>
            
            <div className="flex gap-4 text-sm text-[var(--feishu-gray-4)] mb-4">
              <span>👥 {agent.usageCount}人使用</span>
              <span>⭐ {agent.rating.toFixed(1)}</span>
            </div>
            
            <div className="pt-4 border-t border-[var(--feishu-gray-2)]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-[var(--feishu-gray-2)] flex items-center justify-center text-sm font-semibold">
                  {agent.authorName.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium text-[var(--feishu-gray-6)]">
                    {agent.authorName}
                  </div>
                  <div className="text-xs text-[var(--feishu-gray-4)]">
                    创建者
                  </div>
                </div>
              </div>
            </div>
            
            {agent.tools.length > 0 && (
              <div className="pt-4 border-t border-[var(--feishu-gray-2)]">
                <div className="text-sm font-medium text-[var(--feishu-gray-6)] mb-2">
                  可用工具
                </div>
                <div className="flex flex-wrap gap-2">
                  {agent.tools.map((tool, index) => (
                    <span 
                      key={index}
                      className="text-xs px-2.5 py-1 bg-[var(--feishu-gray-1)] rounded text-[var(--feishu-gray-5)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-lg font-semibold text-[var(--feishu-gray-6)] mb-4">
              开始对话
            </h2>
            
            <div 
              className="border border-[var(--feishu-gray-2)] rounded-lg mb-4 p-4"
              style={{ minHeight: '400px', maxHeight: '500px', overflowY: 'auto' }}
            >
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-[var(--feishu-gray-4)]">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{agent.icon}</div>
                    <p>开始与 {agent.name} 对话吧</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-3 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-[var(--feishu-blue)] text-white'
                            : 'bg-[var(--feishu-gray-1)] text-[var(--feishu-gray-6)]'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {sending && (
                    <div className="flex justify-start">
                      <div className="bg-[var(--feishu-gray-1)] px-4 py-3 rounded-lg">
                        <p className="text-sm text-[var(--feishu-gray-4)]">思考中...</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              <input
                type="text"
                className="input flex-1"
                placeholder={`给 ${agent.name} 发送消息...`}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={sending}
              />
              <button
                className="btn btn-primary"
                onClick={handleSendMessage}
                disabled={sending || !inputMessage.trim()}
              >
                发送
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
