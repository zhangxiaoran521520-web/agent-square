import type { User } from '@/types';

const FEISHU_APP_ID = process.env.FEISHU_APP_ID || '';
const FEISHU_APP_SECRET = process.env.FEISHU_APP_SECRET || '';

export async function getFeishuAccessToken(): Promise<string> {
  const response = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      app_id: FEISHU_APP_ID,
      app_secret: FEISHU_APP_SECRET,
    }),
  });
  
  const data = await response.json();
  return data.tenant_access_token;
}

export async function getUserInfo(userId: string): Promise<User> {
  const token = await getFeishuAccessToken();
  
  const response = await fetch(`https://open.feishu.cn/open-apis/contact/v3/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  const data = await response.json();
  
  if (data.code === 0) {
    return {
      id: data.data.user.user_id,
      name: data.data.user.name,
      avatar: data.data.user.avatar?.avatar_72,
      email: data.data.user.email,
    };
  }
  
  throw new Error(data.msg);
}

export function generateOAuthUrl(redirectUri: string, state: string = ''): string {
  const params = new URLSearchParams({
    app_id: FEISHU_APP_ID,
    redirect_uri: redirectUri,
    state,
    response_type: 'code',
  });
  
  return `https://open.feishu.cn/open-apis/authen/v1/authorize?${params.toString()}`;
}

export async function exchangeCodeForUser(code: string): Promise<User> {
  const response = await fetch('https://open.feishu.cn/open-apis/authen/v1/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      app_id: FEISHU_APP_ID,
      app_secret: FEISHU_APP_SECRET,
      grant_type: 'authorization_code',
      code,
    }),
  });
  
  const data = await response.json();
  
  if (data.code === 0) {
    return {
      id: data.data.open_id,
      name: data.data.name || data.data.open_id,
      avatar: data.data.avatar_url,
      email: data.data.email,
    };
  }
  
  throw new Error(data.msg || 'OAuth failed');
}
