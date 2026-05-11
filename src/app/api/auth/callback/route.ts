import { NextResponse } from 'next/server';
import { exchangeCodeForUser } from '@/lib/feishu';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  
  if (!code) {
    return NextResponse.redirect(new URL('/login?error=missing_code', process.env.BASE_URL));
  }
  
  try {
    const userInfo = await exchangeCodeForUser(code);
    
    const response = NextResponse.redirect(new URL('/', process.env.BASE_URL || 'http://localhost:3000'));
    
    response.cookies.set('user', JSON.stringify(userInfo), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400,
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.redirect(new URL('/login?error=auth_failed', process.env.BASE_URL || 'http://localhost:3000'));
  }
}
