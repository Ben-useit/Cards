'use server';
import { Card, LanguagePair } from '@/types';
import prisma from '@/utils/db';
import { allStatuses } from '@/defaults';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { shuffle } from '@/utils/shuffle';
import { deleteMetadata, getMetadata, setMetadata } from './metadata';
import { hasEmptyEntries, hasIndexDuplicates } from './validate';

export type ActionState = {
  message: string;
  payload?: FormData;
};

export const setLanguage = async (
  someState: ActionState,
  formData: FormData
) => {
  const { userId } = await auth();
  if (!userId) redirect('/');
  const label = formData.getAll('label') as string[];
  const id = formData.getAll('id') as string[];
  const firstLanguage = formData.getAll('firstLanguage') as string[];
  const secondLanguage = formData.getAll('secondLanguage') as string[];
  const selected = formData.getAll('selected') as string[];

  const { error, message } = hasEmptyEntries(
    [id, label, firstLanguage, secondLanguage],
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
    await prisma.languagePair.update({
      where: { id: element },
      data: {
        label: label[index],
        firstLanguage: firstLanguage[index],
        secondLanguage: secondLanguage[index],
        selected: selected[0] === element,
      },
    });
  }

  // save new entry if exists
  const indexOfNewRecord = existingRecordIds.length;
  if (label[indexOfNewRecord] !== '') {
    const isSelected = selected[0] === 'new';
    await prisma.languagePair.create({
      data: {
        label: label[indexOfNewRecord],
        firstLanguage: firstLanguage[indexOfNewRecord],
        secondLanguage: secondLanguage[indexOfNewRecord],
        selected: isSelected,
        userId: userId,
      },
    });
  }
  await deleteMetadata(userId);
  redirect('/options/select');
  //revalidatePath('/options/select');
  return { message: 'All Ok.', payload: formData };
};

export const getCards = async (repeat?: boolean) => {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const { userId } = await auth();
  if (!userId) return [];
  const { langId } = await getMetadata(userId);
  const status = repeat ? { lt: 6, gte: 0 } : { equals: 0 };
  const cards: Card[] = await prisma.card.findMany({
    where: {
      userId: userId as string,
      frontStatus: status,
      frontDate: { lte: today },
      language: langId,
    },
  });
  shuffle<Card>(cards);
  return cards;
};

export const getAllCards = async () => {
  const { userId } = await auth();
  const cards: Card[] = await prisma.card.findMany({
    where: {
      userId: userId as string,
    },
  });
  return cards;
};
export const getLanguages = async () => {
  const { userId } = await auth();
  const pairs: LanguagePair[] = await prisma.languagePair.findMany({
    where: { userId: userId as string },
  });
  return pairs;
};

export const getSelectedLanguage = async (userId: string | null) => {
  if (!userId) return null;
  const language = await prisma.languagePair.findFirst({
    where: {
      userId: userId,
      selected: true,
    },
  });
  return language;
};

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
  const { langId } = await getMetadata(userId);

  const { frontItem, frontExample, backItem, backPronunciation, backExample } =
    Object.fromEntries(formData);

  const card: Card = {
    frontLanguage: 'German',
    frontItem: frontItem as string,
    frontPronunciation: '',
    frontExample: frontExample as string,
    frontStatus: -1,
    backLanguage: 'English',
    backItem: backItem as string,
    backPronunciation: backPronunciation as string,
    backExample: backExample as string,
    backStatus: -1,
    userId: userId as string,
    language: langId as string,
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
