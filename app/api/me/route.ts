// app/api/me/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/auth'; // assuming your decrypt function is here

export async function GET() {
  const cookie = (await cookies()).get('session')?.value;

  if (!cookie) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const session = await decrypt(cookie);

  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user: session.user });
}
