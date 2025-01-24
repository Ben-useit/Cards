import Card from '@/components/Card';

import NothingToDo from '@/components/NothingToDo';
import { getCards } from '@/utils/actions';

const LearnPage = async () => {
  const cards = await getCards();
  if (cards.length === 0) {
    return <NothingToDo />;
  }

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
