// export const getLanguages = async (): Promise<Language[]> => {
//   const session = await getSession();
//   if (!session) return [];
//   const userId = session.user.userId;
//   const pairs: Language[] = await prisma.language.findMany({
//     where: { userId: userId },
//   });
//   return pairs;
// };

// export const updateDate = async (card: Card) => {
//   await prisma.card.update({
//     where: {
//       id: card.id,
//     },
//     data: {
//       frontDate: new Date(),
//     },
//   });
// };
