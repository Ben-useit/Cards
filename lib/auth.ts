'use server';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { Session, User } from './types';
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
// This helper guarantees a Session or redirects

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export const requireSession = async (): Promise<Session> => {
  const session = await getSession();
  if (!session) {
    redirect('/login'); // Next.js will short‑circuit here
  }
  return session;
};

export const createSession = async ({ user }: { user: User }) => {
  const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 min
  const token = await encrypt({ user, expires });
  const cookieStore = await cookies();

  cookieStore.set('session', token, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });
};

// export const createSession = async ({
//   token,
//   expires,
// }: {
//   token: string;
//   expires: Date;
// }) => {
//   const cookieStore = await cookies();

//   cookieStore.set('session', token, {
//     httpOnly: true,
//     secure: true,
//     expires: expires,
//     sameSite: 'lax',
//     path: '/',
//   });
// };

export const deleteSession = async () => {
  (await cookies()).set('session', '', { expires: new Date(0) });
};

export const getSession = async (): Promise<Session | null> => {
  const cookie = (await cookies()).get('session')?.value;
  if (!cookie) return null;
  const session = await decrypt(cookie);
  if (!session) return null;
  return session;
};

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
  } catch (error) {}
};

export async function updateSession(user: User) {
  await deleteSession();
  await createSession({ user });
}
