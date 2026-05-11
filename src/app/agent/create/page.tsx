'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AVAILABLE_TOOLS } from '@/types';

export default function CreateAgentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '🤖',
    systemPrompt: '',
    tools: [] as string[],
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      console.log('Creating agent:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('智能体创建成功！');
      router.push('/');
    } catch (error) {
      console.error('Error creating agent:', error);
      alert('创建失败，请重试');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToolToggle = (toolName: string) => {
    setFormData(prev => ({
      ...prev,
      tools: prev.tools.includes(toolName)
        ? prev.tools.filter(t => t !== toolName)
        : [...prev.tools, toolName]
    }));
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-[var(--feishu-gray-6)] mb-6">
        创建智能体
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-[var(--feishu-gray-6)] mb-4">
            基本信息
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--feishu-gray-6)] mb-2">
                智能体名称 *
              </label>
              <input
                type="text"
                className="input"
                placeholder="例如：日程助手"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--feishu-gray-6)] mb-2">
                描述 *
              </label>
              <textarea
                className="textarea"
                placeholder="描述一下这个智能体能做什么"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--feishu-gray-6)] mb-2">
                选择图标
              </label>
              <div className="flex flex-wrap gap-2">
                {['🤖', '📅', '📊', '📝', '🤝', '✅', '👥', '🔍'].map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    className={`w-12 h-12 rounded-lg text-2xl flex items-center justify-center transition-all ${
                      formData.icon === icon
                        ? 'bg-[var(--feishu-blue-light)] ring-2 ring-[var(--feishu-blue)]'
                        : 'bg-[var(--feishu-gray-1)] hover:bg-[var(--feishu-gray-2)]'
                    }`}
                    onClick={() => setFormData({ ...formData, icon })}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-[var(--feishu-gray-6)] mb-4">
            系统提示词
          </h2>

          <div>
            <label className="block text-sm font-medium text-[var(--feishu-gray-6)] mb-2">
              定义智能体的行为和角色
            </label>
            <textarea
              className="textarea"
              style={{ minHeight: '150px' }}
              placeholder={`例如：你是一个专业的日程管理助手。你可以：
1. 查询用户的日历日程
2. 创建和编辑日程事件
3. 发送会议提醒
4. 帮助用户合理安排时间

请用友好、专业的语气与用户交流。`}
              value={formData.systemPrompt}
              onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
            />
            <p className="text-xs text-[var(--feishu-gray-4)] mt-2">
              提示词决定了智能体的行为方式、能力和对话风格
            </p>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-[var(--feishu-gray-6)] mb-4">
            可用工具
          </h2>

          <p className="text-sm text-[var(--feishu-gray-4)] mb-4">
            选择智能体可以使用的工具
          </p>

          <div className="grid grid-cols-2 gap-3">
            {AVAILABLE_TOOLS.map((tool) => (
              <label
                key={tool.id}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  formData.tools.includes(tool.name)
                    ? 'border-[var(--feishu-blue)] bg-[var(--feishu-blue-light)]'
                    : 'border-[var(--feishu-gray-2)] hover:border-[var(--feishu-blue)]'
                }`}
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[var(--feishu-blue)] rounded"
                  checked={formData.tools.includes(tool.name)}
                  onChange={() => handleToolToggle(tool.name)}
                />
                <span className="text-xl">{tool.icon}</span>
                <div>
                  <div className="text-sm font-medium text-[var(--feishu-gray-6)]">
                    {tool.name}
                  </div>
                  <div className="text-xs text-[var(--feishu-gray-4)]">
                    {tool.description}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            className="btn btn-secondary flex-1"
            onClick={() => router.push('/')}
          >
            取消
          </button>
          <button
            type="submit"
            className="btn btn-primary flex-1"
            disabled={submitting}
          >
            {submitting ? '发布中...' : '发布智能体'}
          </button>
        </div>
      </form>
    </div>
  );
}
