'use client';

import Link from 'next/link';
import type { Agent } from '@/types';

interface AgentCardProps {
  agent: Agent;
  isHovered: boolean;
}

const gradientColors = [
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-pink-500',
  'from-amber-500 to-orange-500',
  'from-emerald-500 to-teal-500',
  'from-indigo-500 to-purple-500',
  'from-rose-500 to-pink-500',
];

export default function AgentCard({ agent }: AgentCardProps) {
  const gradientIndex = parseInt(agent.id) % gradientColors.length;
  const gradient = gradientColors[gradientIndex];

  return (
    <Link 
      href={`/agent/${agent.id}`}
      className="group block"
    >
      <div className="card">
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          {agent.icon}
        </div>
        
        <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-purple-400 transition-colors">
          {agent.name}
        </h3>
        
        <p className="text-text-secondary text-sm mb-4 line-clamp-2 leading-relaxed">
          {agent.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {agent.tools.map((tool, index) => (
            <span 
              key={index}
              className="px-3 py-1 text-xs font-medium bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20"
            >
              {tool}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-xs font-semibold text-white">
              {agent.authorName.charAt(0)}
            </div>
            <span className="text-sm text-text-muted">{agent.authorName}</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-text-muted">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {agent.usageCount}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.086 2.576A1 1 0 009.914 3.42l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 000-1.414l-3-3zM11.086 13.576A1 1 0 009.914 14.42l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 000-1.414l-3-3zM18.172 8.424a1 1 0 00-1.414 0l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 000-1.414l-3-3zM4.828 8.424a1 1 0 00-1.414 0l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 000-1.414l-3-3z" />
              </svg>
              {agent.rating}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
