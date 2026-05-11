import { NextResponse } from 'next/server';
import { feishuAuth, getUserInfo } from '@/lib/feishu';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  
  if (!code) {
    return NextResponse.redirect(new URL('/login?error=missing_code', process.env.BASE_URL));
  }
  
  try {
    const token = await feishuAuth(code);
    const userInfo = await getUserInfo(token.access_token);
    
    const response = NextResponse.redirect(new URL('/', process.env.BASE_URL));
    
    response.cookies.set('access_token', token.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: token.expires_in,
      path: '/',
    });
    
    response.cookies.set('user', JSON.stringify(userInfo), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: token.expires_in,
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.redirect(new URL('/login?error=auth_failed', process.env.BASE_URL));
  }
}
