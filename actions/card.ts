'use server';

import { allStatuses } from '@/defaults';
import {
  createCard,
  getAllCards,
  getCards,
  getCardStatusSummary,
  getNewCards,
  updateCard,
  updateStatus,
} from '@/lib/api/card';
import { requireSession } from '@/lib/auth';
import { Card } from '@/lib/types';
import { shuffle } from '@/utils/shuffle';

export const updateCardAction = async (someState: any, formData: FormData) => {
  let id = formData.get('id') as string;
  const data = {
    frontItem: formData.get('frontItem') as string,
    frontExample: formData.get('frontExample') as string,
    frontPronunciation: formData.get('frontPronunciation') as string,
    backItem: formData.get('backItem') as string,
    backPronunciation: formData.get('backPronunciation') as string,
    backExample: formData.get('backExample') as string,
  };
  return await updateCard({ id, data });
};

export const updateStatusAction = async (
  response: boolean,
  card: Card,
  isReverse: boolean
) => {
  let today = new Date();
  const status = isReverse ? card.backStatus : card.frontStatus;
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

  updateStatus({
    isReverse,
    cardId: card.id as string,
    newStatus,
    date: today,
  });
};

export const createCardAction = async (someState: any, formData: FormData) => {
  const session = await requireSession();
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
  return await createCard({ data: card });
};

export const getStatusSummary = async () => {
  const session = await requireSession();
  const user = session.user;
  const summary = await getCardStatusSummary({
    userId: user.userId,
    languageId: session.user.activeLanguage?.id,
    isFront: true,
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
  const total = Object.values(statusData).reduce((p, n) => {
    return p + n;
  });
  const countInStock = statusData['-1'] || 0;
  const s = countInStock === 1 ? '' : 's';
  delete statusData['-1'];

  return {
    statusData,
    language: user.activeLanguage,
    total,
    stock: `${countInStock}`,
  };
};
export const getStatusSummaryReverse = async () => {
  const session = await requireSession();
  if (!session) return { statusData: [], total: 0, stock: 0 };
  const user = session.user;
  const summary = await getCardStatusSummary({
    userId: user.userId,
    languageId: user.activeLanguage?.id,
    isFront: false,
  });
  const statusData: { [key: number]: number } = {};
  for (const record of summary) {
    statusData[record.backStatus] = record._count.backStatus;
  }
  allStatuses.forEach((status) => {
    if (!(status in statusData)) {
      statusData[status] = 0;
    }
  });
  delete statusData['-1'];

  return {
    statusData,
  };
};

export const loadNewCardsAction = async (
  someState: any,
  formData: FormData
) => {
  const session = await requireSession();
  const user = session.user;

  const count = formData.get('count');
  if (count === null || count === '') return 'Please enter a number';

  const countNumber = parseInt(count as string, 10); // Safely cast to string and then parse as number
  if (isNaN(countNumber) || countNumber <= 0)
    return 'Please enter a positiv number';

  return await getNewCards({
    userId: user.userId,
    languageId: user.activeLanguage?.id,
    count: countNumber,
  });
};

export const getAllCardsAction = async () => {
  const session = await requireSession();
  const userId = session.user.userId;
  const languageId = session.user.activeLanguage?.id || '';
  return await getAllCards({ userId, languageId });
};

export const getCardsAction = async ({ repeat }: { repeat?: boolean }) => {
  const session = await requireSession();
  const user = session.user;

  const langId = user.activeLanguage?.id || '';
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const status = repeat ? { lt: 6, gte: 0 } : { equals: 0 };
  const cards = await getCards({
    userId: user.userId,
    languageId: user.activeLanguage?.id,
    date: today,
    status,
    isFront: true,
  });
  // const cards: Card[] = await prisma.card.findMany({
  //   where: {
  //     userId: user.userId,
  //     frontStatus: status,
  //     frontDate: { lte: today },
  //     language: langId,
  //   },
  //   select: {
  //     id: true,
  //     frontLanguage: true,
  //     frontItem: true,
  //     frontPronunciation: true,
  //     frontExample: true,
  //     frontStatus: true,
  //     backLanguage: true,
  //     backItem: true,
  //     backPronunciation: true,
  //     backExample: true,
  //     backStatus: true,
  //     userId: true,
  //     language: true,
  //   },
  // });
  const cardsReverse = await getCards({
    userId: user.userId,
    languageId: user.activeLanguage?.id,
    date: today,
    status,
    isFront: false,
  });
  // const cardsReverse: Card[] = await prisma.card.findMany({
  //   where: {
  //     userId: user.userId,
  //     backStatus: status,
  //     backDate: { lte: today },
  //     language: langId,
  //   },
  //   select: {
  //     id: true,
  //     frontLanguage: true,
  //     frontItem: true,
  //     frontPronunciation: true,
  //     frontExample: true,
  //     frontStatus: true,
  //     backLanguage: true,
  //     backItem: true,
  //     backPronunciation: true,
  //     backExample: true,
  //     backStatus: true,
  //     userId: true,
  //     language: true,
  //   },
  // });

  const cardList: { card: Card; reverse: boolean }[] = [];
  cards.forEach((card) => {
    cardList.push({ card, reverse: false });
  });
  cardsReverse.forEach((card) => {
    cardList.push({ card, reverse: true });
  });

  shuffle<{ card: Card; reverse: boolean }>(cardList);

  return cardList;
};
