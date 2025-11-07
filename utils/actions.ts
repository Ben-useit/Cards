'use server';
import { Card, LanguagePair } from '@/app/lib/types';
import prisma from '@/utils/db';
import { allStatuses } from '@/defaults';
import { redirect } from 'next/navigation';
import { shuffle } from '@/utils/shuffle';
import { hasEmptyEntries, hasIndexDuplicates } from './validate';
import { type Language } from '@prisma/client';
import {
  createSession,
  deleteSession,
  encrypt,
  getSession,
} from '@/app/lib/session';

export type ActionState = {
  message: string;
  payload?: FormData;
};

export const setLanguage = async (
  someState: ActionState,
  formData: FormData
) => {
  const session = await getSession();
  if (!session) redirect('/');
  const userId = session.user.userId;
  if (!userId) redirect('/');
  const id = formData.getAll('id') as string[];
  const firstLanguage = formData.getAll('firstLanguage') as string[];
  const secondLanguage = formData.getAll('secondLanguage') as string[];
  let selected = formData.getAll('selected') as string[];

  const { error, message } = hasEmptyEntries(
    [id, firstLanguage, secondLanguage],
    selected[0]
  );
  if (error) {
    return { message: message, payload: formData };
  }

  const result = hasIndexDuplicates(firstLanguage, secondLanguage);
  if (result.error) return { message: result.message, payload: formData };

  const existingRecordIds = id.filter((element) => element !== '');

  //Save the data, update existing ones, create new ones.
  for (const [index, element] of existingRecordIds.entries()) {
    await prisma.language.update({
      where: { id: element },
      data: {
        firstLanguage: firstLanguage[index],
        secondLanguage: secondLanguage[index],
      },
    });
  }

  // save new entry if exists
  const indexOfNewRecord = existingRecordIds.length;
  if (
    firstLanguage[indexOfNewRecord] !== '' &&
    secondLanguage[indexOfNewRecord] !== ''
  ) {
    const isSelected = selected[0] === 'new';
    const lang = await prisma.language.create({
      data: {
        firstLanguage: firstLanguage[indexOfNewRecord],
        secondLanguage: secondLanguage[indexOfNewRecord],
        userId: userId,
      },
    });
    if (isSelected) {
      selected[0] = lang.id;
    }
  }
  // update Session
  const user = session.user;

  if (selected[0]) {
    await deleteSession();
    const language = await prisma.language.findFirst({
      where: { id: selected[0] },
    });
    if (language) {
      user.activeLanguage = language;
      const expires = new Date(Date.now() + 60 * 60 * 1000); // 5min
      const token = await encrypt({ user, expires });
      await createSession({ token, expires });
    }
    user.userId;
    await prisma.user.update({
      where: { id: user.userId },
      data: { activeLanguageId: selected[0] },
    });
  }
  redirect('/options/select');
};

export const getCards = async (repeat?: boolean) => {
  const session = await getSession();
  if (!session) return [];
  const userId = session.user.userId;
  const langId = session.user.activeLanguage?.id || '';
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const status = repeat ? { lt: 6, gte: 0 } : { equals: 0 };
  const cards: Card[] = await prisma.card.findMany({
    where: {
      userId: userId,
      frontStatus: status,
      frontDate: { lte: today },
      language: langId,
    },
  });

  const cardsReverse: Card[] = await prisma.card.findMany({
    where: {
      userId: userId,
      backStatus: status,
      backDate: { lte: today },
      language: langId,
    },
  });

  cardsReverse.forEach((card) => {
    const newCard = {
      ...card,
      id: `${card.id}*`,
      frontItem: card.backItem,
      frontExample: '',
      backItem: card.frontItem,
      backExample: card.frontExample,
    };
    cards.push(newCard);
  });
  shuffle<Card>(cards);

  return cards;
};

export const getAllCards = async () => {
  const session = await getSession();
  if (!session) return;
  const userId = session.user.userId;
  const langId = session.user.activeLanguage?.id || '';

  const cards: Card[] = await prisma.card.findMany({
    where: {
      userId: userId as string,
      language: langId,
    },
  });
  return cards;
};

export const getLanguages = async (): Promise<Language[]> => {
  const session = await getSession();
  if (!session) return [];
  const userId = session.user.userId;
  const pairs: Language[] = await prisma.language.findMany({
    where: { userId: userId },
  });
  return pairs;
};

export const updateCard = async (someState: any, formData: FormData) => {
  let id = formData.get('id') as string;
  const { frontItem, frontExample, backItem, backPronunciation, backExample } =
    Object.fromEntries(formData);
  if (id.endsWith('*')) id = id.slice(0, -1);
  await prisma.card.update({
    where: {
      id: id,
    },
    data: {
      frontItem: frontItem as string,
      frontExample: frontExample as string,
      backItem: backItem as string,
      backPronunciation: backPronunciation as string,
      backExample: backExample as string,
    },
  });
  return Object.fromEntries(formData);
};
export const updateStatus = async (response: boolean, card: Card) => {
  let today = new Date();
  const reverse = card.id?.endsWith('*');
  const status = reverse ? card.backStatus : card.frontStatus;
  const newStatus = response ? status + 1 : 0;
  switch (newStatus) {
    case 1:
      today.setDate(today.getDate() + 1);
      break;
    case 2:
      today.setDate(today.getDate() + 3);
      break;
    case 3:
      today.setDate(today.getDate() + 7);
      break;
    case 4:
      today.setDate(today.getDate() + 14);
      break;
    case 5:
      today.setDate(today.getDate() + 28);
      break;
  }

  if (reverse) {
    await prisma.card.update({
      where: {
        id: card.id?.slice(0, -1),
      },
      data: {
        backStatus: newStatus,
        backDate: today,
      },
    });
  } else {
    await prisma.card.update({
      where: {
        id: card.id,
      },
      data: {
        frontStatus: newStatus,
        frontDate: today,
      },
    });
  }
};

export const updateDate = async (card: Card) => {
  await prisma.card.update({
    where: {
      id: card.id,
    },
    data: {
      frontDate: new Date(),
    },
  });
};

export const getStatusSummary = async () => {
  const summary = await prisma.card.groupBy({
    by: ['frontStatus'],
    _count: {
      frontStatus: true,
    },
  });

  const statusData: { [key: number]: number } = {};
  for (const record of summary) {
    statusData[record.frontStatus] = record._count.frontStatus;
  }
  allStatuses.forEach((status) => {
    if (!(status in statusData)) {
      statusData[status] = 0;
    }
  });

  return statusData;
};

export const createCard = async (someState: any, formData: FormData) => {
  const session = await getSession();
  if (!session) return;
  const userId = session.user.userId;
  const langId = session.user.activeLanguage?.id || '';

  const { frontItem, frontExample, backItem, backPronunciation, backExample } =
    Object.fromEntries(formData);

  const card: Card = {
    frontLanguage: session.user.activeLanguage?.firstLanguage || '',
    frontItem: frontItem as string,
    frontPronunciation: '',
    frontExample: frontExample as string,
    frontStatus: -1,
    backLanguage: session.user.activeLanguage?.secondLanguage || '',
    backItem: backItem as string,
    backPronunciation: backPronunciation as string,
    backExample: backExample as string,
    backStatus: -1,
    userId: userId as string,
    language: langId,
  };
  const newCard = await prisma.card.create({
    data: card,
  });
  return `"${newCard.frontItem}" created`;
};

export const loadNewCards = async (someState: any, formData: FormData) => {
  const session = await getSession();
  if (!session) return;
  const userId = session.user.userId;

  const count = formData.get('count');
  if (count === null || count === '') return 'Please enter a number';

  const countNumber = parseInt(count as string, 10); // Safely cast to string and then parse as number
  if (isNaN(countNumber)) return 'Please enter a NUMBER';

  const cardsToUpdate = await prisma.card.findMany({
    where: {
      userId: userId as string,
      frontStatus: { equals: -1 },
    },
    take: countNumber,
  });
  if (cardsToUpdate.length === 0) return 'No cards available.';

  await prisma.card.updateMany({
    where: {
      id: {
        in: cardsToUpdate.map((card) => card.id), // Update posts with the same ids
      },
    },
    data: {
      frontStatus: 0,
      backStatus: 0,
    },
  });
  return `${cardsToUpdate.length} new cards loaded.`;
};
