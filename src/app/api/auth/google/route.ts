import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:3000';
}

const BASE_URL = getBaseUrl();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code) {
      // Initiate OAuth flow - redirect to Google
      const redirectUri = `${BASE_URL}/api/auth/google`;
      const scope = 'openid email profile';
      const state = randomUUID();
      
      const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
      authUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID || '');
      authUrl.searchParams.set('redirect_uri', redirectUri);
      authUrl.searchParams.set('response_type', 'code');
      authUrl.searchParams.set('scope', scope);
      authUrl.searchParams.set('state', state);
      authUrl.searchParams.set('access_type', 'offline');
      authUrl.searchParams.set('prompt', 'consent');

      // Store state in a cookie for verification
      const response = NextResponse.redirect(authUrl.toString());
      response.cookies.set('oauth_state', state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 600, // 10 minutes
      });

      return response;
    }

    // Handle OAuth callback
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
      return NextResponse.redirect(`${BASE_URL}/auth?error=oauth_config_error`);
    }

    // Verify state
    const storedState = request.cookies.get('oauth_state')?.value;
    if (!storedState || storedState !== state) {
      return NextResponse.redirect(`${BASE_URL}/auth?error=invalid_state`);
    }

    // Exchange code for tokens
    const redirectUri = `${BASE_URL}/api/auth/google`;
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error('Token exchange error:', error);
      return NextResponse.redirect(`${BASE_URL}/auth?error=token_exchange_failed`);
    }

    const tokens = await tokenResponse.json();
    const { access_token } = tokens;

    // Get user info from Google
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!userInfoResponse.ok) {
      return NextResponse.redirect(`${BASE_URL}/auth?error=user_info_failed`);
    }

    const googleUser = await userInfoResponse.json();

    // Import here to avoid circular dependencies
    const { getUserByEmail, createOAuthUser } = await import('@/lib/db/users');
    const { signToken, buildSetAuthCookie } = await import('@/lib/auth/jwt');

    // Check if user exists
    let user = await getUserByEmail(googleUser.email);

    if (!user) {
      // Create new user from Google data
      const nameParts = googleUser.name?.split(' ') || [];
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      user = await createOAuthUser({
        email: googleUser.email,
        name: firstName || null,
        lastName: lastName || null,
        role: 'user',
        emailVerified: true,
      });
    }

    // Sign JWT and set cookie
    const { password: _, ...userWithoutPassword } = user;
    const token = await signToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    // Clear OAuth state cookie
    const response = NextResponse.redirect(`${BASE_URL}/auth?success=google_signin`);
    response.cookies.delete('oauth_state');
    response.headers.set('Set-Cookie', buildSetAuthCookie(token));

    return response;
  } catch (error) {
    console.error('Google OAuth error:', error);
    return NextResponse.redirect(`${BASE_URL}/auth?error=oauth_error`);
  }
}
