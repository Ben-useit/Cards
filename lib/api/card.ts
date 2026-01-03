import { prisma } from '@/prisma/prisma';
import { Card, CardFormData } from '@/lib/types';

export const updateCard = async ({
  id,
  data,
}: {
  id: string;
  data: CardFormData;
}) => {
  await prisma.card.update({
    where: {
      id: id,
    },
    data: {
      frontItem: data.frontItem as string,
      frontExample: data.frontExample as string,
      frontPronunciation: data.frontPronunciation as string,
      backItem: data.backItem as string,
      backPronunciation: data.backPronunciation as string,
      backExample: data.backExample as string,
    },
  });
  return `"Card with id ${id}" updated.`;
};

export const updateStatus = async ({
  isReverse,
  cardId,
  newStatus,
  date,
}: {
  isReverse: boolean;
  cardId: string;
  newStatus: number;
  date: Date;
}) => {
  if (isReverse) {
    await prisma.card.update({
      where: {
        id: cardId,
      },
      data: {
        backStatus: newStatus,
        backDate: date,
      },
    });
  } else {
    await prisma.card.update({
      where: {
        id: cardId,
      },
      data: {
        frontStatus: newStatus,
        frontDate: date,
      },
    });
  }
};

export const createCard = async ({ data }: { data: Card }) => {
  const newCard = await prisma.card.create({
    data: data,
  });
  return `"${newCard.frontItem}" created`;
};

export const getCardStatusSummary = async ({
  userId,
  languageId,
  isFront,
}: {
  userId: string;
  languageId: string | undefined;
  isFront: boolean;
}) => {
  const field = isFront ? 'frontStatus' : 'backStatus';
  const summary = await prisma.card.groupBy({
    where: {
      userId: userId,
      language: languageId,
    },
    by: [field],
    _count: {
      [field]: true,
    },
  });
  return summary;
};

export const getNewCards = async ({
  userId,
  languageId,
  count,
}: {
  userId: string;
  languageId: string | undefined;
  count: number;
}) => {
  const cardsToUpdate = await prisma.card.findMany({
    where: {
      userId: userId,
      language: languageId,
      frontStatus: { equals: -1 },
    },
    take: count,
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

export const getAllCards = async ({
  userId,
  languageId,
}: {
  userId: string;
  languageId: string;
}) => {
  const cards: Card[] = await prisma.card.findMany({
    where: {
      userId: userId as string,
      language: languageId,
    },
  });
  return cards;
};

export const getCards = async ({
  userId,
  languageId,
  status,
  date,
  isFront,
}: {
  userId: string;
  languageId: string | undefined;
  status: { lt: number; gte: number } | { equals: number };
  date: Date;
  isFront: boolean;
}) => {
  const statusField = isFront ? 'frontStatus' : 'backStatus';
  const dateField = isFront ? 'frontDate' : 'backDate';
  const cards: Card[] = await prisma.card.findMany({
    where: {
      userId: userId,
      [statusField]: status,
      [dateField]: { lte: date },
      language: languageId,
    },
    select: {
      id: true,
      frontLanguage: true,
      frontItem: true,
      frontPronunciation: true,
      frontExample: true,
      frontStatus: true,
      backLanguage: true,
      backItem: true,
      backPronunciation: true,
      backExample: true,
      backStatus: true,
      userId: true,
      language: true,
    },
  });
  return cards;
};
