'use server';

import { prisma } from '@/prisma/prisma';
import { createSession } from '@/app/lib/session';
import bcrypt from 'bcrypt';

import { encrypt } from '../lib/session';
import { User } from '../lib/types';

export const actionLogin = async (
  status: string | null | undefined,
  formData: FormData
) => {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  // 1. validate password
  const user = await validatePassword(username, password);
  if (!user) return 'Wrong username or password.';
  // 2. Create token
  const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 min
  const token = await encrypt({ user, expires });

  // 3. Create session
  await createSession({ token, expires });
  return user;
};

const validatePassword = async (
  username: string,
  password: string
): Promise<User | null> => {
  const user = await prisma.user.findFirst({
    where: { username: username },
    select: {
      id: true,
      username: true,
      password: true,
      activeLanguage: true,
    },
  });
  if (!user) return null;
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch)
    return {
      userId: user.id,
      username: user.username,
      activeLanguage: user.activeLanguage,
    };
  return null;
};
