import { getCardsAction } from '@/actions/card';
import FlipCard from '@/components/FlipCard';
import NothingToDo from '@/components/NothingToDo';

const RepeatPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ session: string }>;
}) => {
  const { session } = await searchParams;
  let cards = null;
  if (!session) {
    cards = await getCardsAction({ repeat: true });
    if (cards.length === 0) return <NothingToDo />;
  }
  return <FlipCard data={cards} redirectTo='/card/repeat' />;
};
export default RepeatPage;
