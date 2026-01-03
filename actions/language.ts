'use server';
import { prisma } from '@/prisma/prisma';
import { redirect } from 'next/navigation';
import { hasEmptyEntries, hasIndexDuplicates } from '@/utils/validate';
import {
  createSession,
  deleteSession,
  encrypt,
  getSession,
  requireSession,
  updateSession,
} from '@/lib/auth';
import { updateUserLanguage } from '@/lib/api/language';
import { Language } from '@/lib/types';

// export type ActionState = {
//   message: string;
//   payload?: FormData;
// };

export type ActionState =
  | {
      user: {
        id: string;
        username: string;
        activeLanguage: Language;
      };
    }
  | {}
  | null;

export const setLanguageAction = async (
  someState: ActionState,
  formData: FormData
) => {
  const { user } = await requireSession();
  const selected = formData.getAll('selected') as string[];
  // update user
  const { id, username, activeLanguage } = await updateUserLanguage({
    userId: user.userId,
    languageId: selected[0],
  });

  // update Session
  await updateSession({ userId: id, username, activeLanguage });
  return { user: { id, username, activeLanguage } };
};

// export const setLanguageActionA = async (
//   someState: ActionState,
//   formData: FormData
// ) => {
//   const { user } = await requireSession();

//   const id = formData.getAll('id') as string[];
//   const firstLanguage = formData.getAll('firstLanguage') as string[];
//   const secondLanguage = formData.getAll('secondLanguage') as string[];
//   let selected = formData.getAll('selected') as string[];

//   const { error, message } = hasEmptyEntries(
//     [id, firstLanguage, secondLanguage],
//     selected[0]
//   );
//   if (error) {
//     return { message: message, payload: formData };
//   }

//   const result = hasIndexDuplicates(firstLanguage, secondLanguage);
//   if (result.error) return { message: result.message, payload: formData };

//   const existingRecordIds = id.filter((element) => element !== '');

//   //Save the data, update existing ones, create new ones.
//   for (const [index, element] of existingRecordIds.entries()) {
//     await prisma.language.update({
//       where: { id: element },
//       data: {
//         firstLanguage: firstLanguage[index],
//         secondLanguage: secondLanguage[index],
//       },
//     });
//   }

//   // save new entry if exists
//   const indexOfNewRecord = existingRecordIds.length;
//   if (
//     firstLanguage[indexOfNewRecord] !== '' &&
//     secondLanguage[indexOfNewRecord] !== ''
//   ) {
//     const isSelected = selected[0] === 'new';
//     const lang = await prisma.language.create({
//       data: {
//         firstLanguage: firstLanguage[indexOfNewRecord],
//         secondLanguage: secondLanguage[indexOfNewRecord],
//         userId: user.userId,
//       },
//     });
//     if (isSelected) {
//       selected[0] = lang.id;
//     }
//   }
//   // update Session

//   if (selected[0]) {
//     await deleteSession();
//     const language = await prisma.language.findFirst({
//       where: { id: selected[0] },
//     });
//     if (language) {
//       user.activeLanguage = language;
//       const expires = new Date(Date.now() + 60 * 60 * 1000); // 5min
//       const token = await encrypt({ user, expires });
//       await createSession({ token, expires });
//     }
//     user.userId;
//     await prisma.user.update({
//       where: { id: user.userId },
//       data: { activeLanguageId: selected[0] },
//     });
//   }
//   redirect('/options/select');
// };
