'use server';
import { Card } from '@/types';
import prisma from './db';
import { allStatuses } from '@/defaults';
import { auth } from '@clerk/nextjs/server';

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

  const total = Object.values(statusData).reduce((p, n) => {
    return p + n;
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
