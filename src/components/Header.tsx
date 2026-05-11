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
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-surface/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg shadow-lg shadow-purple-500/30">
            🤖
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            智能体广场
          </span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-text-secondary hover:text-text-primary font-medium transition-colors">
            广场
          </Link>
          
          {user ? (
            <>
              <Link href="/agent/create" className="btn btn-primary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                创建智能体
              </Link>
              
              <div className="relative group">
                <button className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-semibold shadow-lg shadow-purple-500/30">
                    {user.name?.charAt(0) || '?'}
                  </div>
                  <span className="text-sm font-medium text-text-primary">{user.name}</span>
                </button>
                
                <div className="absolute right-0 mt-2 w-40 py-2 bg-dark-card rounded-lg shadow-xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 rounded"
                  >
                    退出登录
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary">
              登录
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
