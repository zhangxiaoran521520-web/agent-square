'use client';

import { Suspense } from 'react';
import LoginForm from './LoginForm';

function LoginLoading() {
  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white text-4xl">
          🤖
        </div>
        <h1 className="text-2xl font-bold text-[var(--feishu-gray-6)] mb-2">
          登录到智能体广场
        </h1>
        <p className="text-[var(--feishu-gray-4)]">
          加载中...
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginForm />
    </Suspense>
  );
}
