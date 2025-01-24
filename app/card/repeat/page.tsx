import Card from '@/components/Card';
import NothingToDo from '@/components/NothingToDo';
import { getCards } from '@/utils/actions';

const RepeatPage = async () => {
  const cards = await getCards(true);
  if (cards.length === 0) {
    return <NothingToDo />;
  }

  return (
    <div>
      <Card
        cards={cards}
        repeat={true}
        count={cards.length}
        examplesOnly={false}
      />
    </div>
  );
};
export default RepeatPage;
