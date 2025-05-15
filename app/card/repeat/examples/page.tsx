import Card from '@/components/Card';
import prisma from '@/utils/db';
import { shuffle } from '@/utils/shuffle';
import NothingToDo from '@/components/NothingToDo';
import { getSession } from '@/app/lib/session';

const RepeatExamplesPage = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const session = await getSession();
  if (!session) return <NothingToDo />;

  const userId = session.user.userId;
  const languageId = session.user.activeLanguage?.id || '';

  const cards: Card[] = await prisma.card.findMany({
    where: {
      userId: userId,
      frontStatus: { gte: 6 },
      frontDate: { lte: today },
      language: languageId,
    },
  });
  if (cards.length === 0) {
    return <NothingToDo />;
  }
  shuffle<Card>(cards);
  return (
    <div>
      <Card
        cards={cards}
        repeat={false}
        count={cards.length}
        examplesOnly={true}
      />
    </div>
  );
};
export default RepeatExamplesPage;
