'use server';
import { prisma } from '@/prisma/prisma';
import { requireSession } from '../auth';

export const getLanguagePairs = async () => {
  const { user } = await requireSession();

  return await prisma.language.findMany({
    where: {
      userId: user.userId,
    },
  });
};

export const updateUserLanguage = async ({
  userId,
  languageId,
}: {
  userId: string;
  languageId: string;
}) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { activeLanguageId: languageId },
    select: {
      id: true,
      username: true,
      activeLanguage: true,
    },
  });

  return user;
};
