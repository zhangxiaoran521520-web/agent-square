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

export default function AgentCard({ agent, isHovered }: AgentCardProps) {
  const gradientIndex = parseInt(agent.id) % gradientColors.length;
  const gradient = gradientColors[gradientIndex];

  return (
    <Link 
      href={`/agent/${agent.id}`}
      className="group block"
    >
      <div className="relative bg-white rounded-2xl p-6 h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
        
        <div className="relative z-10">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-3xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {agent.icon}
          </div>
          
          <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
            {agent.name}
          </h3>
          
          <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
            {agent.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {agent.tools.map((tool, index) => (
              <span 
                key={index}
                className="px-3 py-1 text-xs font-medium bg-indigo-50 text-indigo-600 rounded-full"
              >
                {tool}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-xs font-semibold text-gray-600">
                {agent.authorName.charAt(0)}
              </div>
              <span className="text-sm text-gray-500">{agent.authorName}</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-gray-400">
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
        
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </Link>
  );
}
