'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { User } from '@/types';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [scrolled, setScrolled] = useState(false);

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

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/';
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:shadow-indigo-500/30 transition-shadow">
            🤖
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              智能体广场
            </span>
            <p className="text-xs text-gray-500 -mt-1">AI Agent Square</p>
          </div>
        </Link>
        
        <nav className="flex items-center gap-8">
          <Link 
            href="/" 
            className="text-gray-600 hover:text-indigo-600 font-medium transition-colors relative group"
          >
            广场
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          
          {user ? (
            <>
              <Link 
                href="/agent/create" 
                className="btn btn-primary"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                创建智能体
              </Link>
              
              <div className="relative group">
                <div className="flex items-center gap-3 cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                    {user.name?.charAt(0) || '?'}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-700">{user.name}</p>
                    <p className="text-xs text-gray-400">已登录</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-400 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    退出登录
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0L7 10m4 6l4-4m-4 6l4-4" />
              </svg>
              登录
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
