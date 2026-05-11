'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { User } from '@/types';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('user='));
    
    if (userCookie) {
      try {
        const userData = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
        setUser(userData);
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/';
  };

  return (
    <header className="bg-white border-b border-[var(--feishu-gray-2)]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-[var(--feishu-gray-6)]">
          <span>🤖</span>
          <span>智能体广场</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link 
            href="/" 
            className="text-sm text-[var(--feishu-gray-5)] hover:text-[var(--feishu-blue)] transition-colors"
          >
            广场
          </Link>
          
          {user ? (
            <>
              <Link 
                href="/agent/create" 
                className="btn btn-primary text-sm"
              >
                + 创建智能体
              </Link>
              
              <div className="flex items-center gap-2">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-semibold text-sm">
                    {user.name?.charAt(0) || '?'}
                  </div>
                )}
                <span className="text-sm text-[var(--feishu-gray-5)]">{user.name}</span>
                <button 
                  onClick={handleLogout}
                  className="text-sm text-[var(--feishu-blue)] hover:underline ml-2"
                >
                  退出
                </button>
              </div>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary text-sm">
              登录
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
