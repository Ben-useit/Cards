'use server';
import { Card } from '@/types';
import prisma from './db';
import { allStatuses } from '@/defaults';
import { auth } from '@clerk/nextjs/server';
import { shuffle } from './shuffle';

export const updateCard = async (someState: any, formData: FormData) => {
  const {
    id,
    frontItem,
    frontExample,
    backItem,
    backPronunciation,
    backExample,
  } = Object.fromEntries(formData);

  await prisma.card.update({
    where: {
      id: id as string,
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
  const status = card.frontStatus;
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
  await prisma.card.update({
    where: {
      id: card.id,
    },
    data: {
      frontStatus: newStatus,
      frontDate: today,
    },
  });
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
  const { userId } = await auth();
  const { frontItem, frontExample, backItem, backPronunciation, backExample } =
    Object.fromEntries(formData);

  const card: Card = {
    frontLanguage: 'German',
    frontItem: frontItem as string,
    frontPronunciation: '',
    frontExample: frontExample as string,
    frontStatus: 0,
    backLanguage: 'English',
    backItem: backItem as string,
    backPronunciation: backPronunciation as string,
    backExample: backExample as string,
    backStatus: 0,
    userId: userId as string,
  };
  const newCard = await prisma.card.create({
    data: card,
  });
  return `"${newCard.frontItem}" created`;
};

export const loadNewCards = async (someState: any, formData: FormData) => {
  const count = formData.get('count');
  if (count === null || count === '') return 'Please enter a number';

  const countNumber = parseInt(count as string, 10); // Safely cast to string and then parse as number
  if (isNaN(countNumber)) return 'Please enter a NUMBER';

  const { userId } = await auth();
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
