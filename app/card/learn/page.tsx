import CardComponent from '@/components/Card';

import NothingToDo from '@/components/NothingToDo';
import { getCards } from '@/utils/actions';
import { shuffle } from '@/utils/shuffle';
import { type Card } from '@/app/lib/types';
const LearnPage = async () => {
  const cards = await getCards();
  if (cards.length === 0) {
    return <NothingToDo />;
  }
  cards.forEach((card) => {
    const newCard = {
      ...card,
      id: `${card.id}b`,
      frontItem: card.backItem,
      frontExample: '',
      backItem: card.frontItem,
      backExample: card.frontExample,
    };
    cards.push(newCard);
  });
  shuffle<Card>(cards);

  return (
    <div>
      <CardComponent
        cards={cards}
        repeat={false}
        count={cards.length}
        examplesOnly={false}
      />
    </div>
  );
};
export default LearnPage;
