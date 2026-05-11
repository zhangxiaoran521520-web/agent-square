'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  useEffect(() => {
    if (code) {
      console.log('Received code:', code);
      console.log('State:', state);
      window.location.href = '/api/auth/callback?code=' + code + (state ? '&state=' + state : '');
    }
  }, [code, state]);

  const handleLogin = () => {
    const appId = process.env.NEXT_PUBLIC_FEISHU_APP_ID || 'cli_aa8b86cea7391cd5';
    const redirectUri = encodeURIComponent(window.location.origin + '/login');
    const oauthUrl = `https://open.feishu.cn/open-apis/authen/v1/authorize?app_id=${appId}&redirect_uri=${redirectUri}&state=random_state`;
    window.location.href = oauthUrl;
  };

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
          使用飞书账号登录，开始使用AI智能体
        </p>
      </div>

      <div className="card">
        <button 
          className="btn btn-primary w-full"
          onClick={handleLogin}
        >
          使用飞书登录
        </button>

        <div className="mt-6 pt-6 border-t border-[var(--feishu-gray-2)]">
          <p className="text-xs text-[var(--feishu-gray-4)] text-center">
            登录即表示您同意我们的服务条款和隐私政策
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <a href="/" className="text-sm text-[var(--feishu-blue)] hover:underline">
          ← 返回首页
        </a>
      </div>
    </div>
  );
}
