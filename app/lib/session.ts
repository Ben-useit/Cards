import { jwtVerify, SignJWT } from 'jose';
import { Session } from './types';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
export const encrypt = async (payload: Session): Promise<string> => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(payload.expires)
    .sign(encodedKey);
};

export const decrypt = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload as Session;
  } catch (error) {
    console.log('Failed to verify session', error);
  }
};

export const createSession = async ({
  token,
  expires,
}: {
  token: string;
  expires: Date;
}) => {
  const cookieStore = await cookies();

  cookieStore.set('session', token, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });
};

export const getSession = async (): Promise<Session | null> => {
  const cookie = (await cookies()).get('session')?.value;
  if (!cookie) return null;
  const session = await decrypt(cookie);
  if (!session) return null;
  return session;
};

export const deleteSession = async () => {
  (await cookies()).set('session', '', { expires: new Date(0) });
};

export async function updateSession() {
  const session = await getSession();
  if (!session) return;

  session.expires = new Date(Date.now() + 60 * 60 * 1000); // 5min
  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: await encrypt(session),
    httpOnly: true,
    expires: session.expires,
  });
  return res;
}
