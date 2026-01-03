import { NextRequest, NextResponse } from 'next/server';
import { getSession, updateSession } from '@/lib/auth';

const publicRoutes = ['/', '/login'];

export const proxy = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  if (
    pathname.startsWith('/_next') || // JS, CSS, static assets
    pathname.startsWith('/api') || // API routes
    pathname.startsWith('/favicon') || // Favicon
    pathname.startsWith('/images') // Your image path (optional)
  ) {
    return NextResponse.next();
  }

  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute) {
    return NextResponse.next();
  }

  const session = await getSession();

  if (!session?.user.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }
  return await updateSession(session.user);
};
