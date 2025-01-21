import Card from '@/components/Card';
import prisma from '@/utils/db';
import { auth } from '@clerk/nextjs/server';
import { shuffle } from '@/utils/shuffle';
import NothingToDo from '@/components/NothingToDo';
const LearnPage = async () => {
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const { userId } = await auth();
  const cards: Card[] = await prisma.card.findMany({
    where: {
      userId: userId as string,
      frontStatus: { equals: 0 },
      frontDate: { lte: today },
    },
  });
  if (cards.length !== 0) {
    return <NothingToDo />;
  }
  shuffle<Card>(cards);
  return (
    <div>
      <Card
        cards={cards}
        repeat={false}
        count={cards.length}
        examplesOnly={false}
      />
    </div>
  );
};
export default LearnPage;
