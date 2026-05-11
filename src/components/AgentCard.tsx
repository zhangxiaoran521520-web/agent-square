'use client';

import Link from 'next/link';
import type { Agent } from '@/types';

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <Link href={`/agent/${agent.id}`}>
      <div className="card cursor-pointer">
        <div 
          className="w-12 h-12 rounded-xl mb-3 flex items-center justify-center text-2xl"
          style={{ backgroundColor: getIconBackground(agent.icon) }}
        >
          {agent.icon}
        </div>
        
        <h3 className="text-base font-semibold text-[var(--feishu-gray-6)] mb-2">
          {agent.name}
        </h3>
        
        <p className="text-sm text-[var(--feishu-gray-4)] mb-3 line-clamp-2">
          {agent.description}
        </p>
        
        <div className="flex gap-4 text-xs text-[var(--feishu-gray-4)] mb-3">
          <span>👥 {agent.usageCount}人使用</span>
          <span>⭐ {agent.rating.toFixed(1)}</span>
        </div>
        
        <div className="pt-3 border-t border-[var(--feishu-gray-1)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[var(--feishu-gray-2)] flex items-center justify-center text-xs font-semibold">
              {agent.authorName.charAt(0)}
            </div>
            <span className="text-xs text-[var(--feishu-gray-5)]">{agent.authorName}</span>
          </div>
          
          {agent.tools.length > 0 && (
            <span className="text-xs px-2.5 py-1 bg-[var(--feishu-gray-1)] rounded text-[var(--feishu-gray-5)]">
              {agent.tools[0]}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

function getIconBackground(icon: string): string {
  const colorMap: Record<string, string> = {
    '📅': '#e8f3ff',
    '📊': '#e8ffea',
    '📝': '#fff7e8',
    '🤝': '#ffe8f3',
    '✅': '#f0fdf4',
    '👥': '#fef3f2',
  };
  
  return colorMap[icon] || '#f5f7fa';
}
