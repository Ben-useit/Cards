'use client';

import { type Card } from '@/types';
import { updateStatus } from '@/utils/actions';
import Link from 'next/link';
import { useState } from 'react';
import { SlArrowLeft, SlClose } from 'react-icons/sl';
import ResultModal from './ResultModal';

const Card = ({
  cards,
  repeat,
  count,
}: {
  cards: Card[];
  repeat: boolean;
  count: number;
}) => {
  const [isFront, setIsFront] = useState(true);
  const [cardList, setCardList] = useState(cards);
  const [card, setCard] = useState(cardList[0]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [falseAnswers, setFalseAnswers] = useState(0);

  const handleAnswer = (answer: boolean) => {
    const newCardList = cardList.filter((c) => c.id != card.id);
    setCardList(newCardList);
    setCard(newCardList[0]);
    setIsFront(true);
    if (answer) setCorrectAnswers(correctAnswers + 1);
    else setFalseAnswers(falseAnswers + 1);
    if (repeat) updateStatus(answer, card);
  };

  if (!card) {
    return (
      <ResultModal
        correctAnswers={correctAnswers}
        falseAnswers={falseAnswers}
      />
    );
  }
  const remainingCards = count - (count - correctAnswers - falseAnswers) + 1;
  return (
    <>
      <div className='sm:w-[600px] border-2 rounded-md shadow-xl p-6 bg-gray-50'>
        <div className='grid grid-cols-2'>
          <div>
            {isFront || (
              <>
                <button type='button' onClick={() => setIsFront(true)}>
                  <SlArrowLeft color='#fde047' className='float-start' />
                </button>
              </>
            )}
          </div>

          <div>
            <Link href='/' className='inline float-end'>
              <SlClose color='red' className='mt-1' />
            </Link>
          </div>
        </div>
        <div>
          {' '}
          <h5 className='text-3xl'>
            {isFront ? card.frontItem : card.backItem}
          </h5>
          <p className='text-1xl py-2'>
            {isFront ? card.frontPronunciation : card.backPronunciation}
          </p>
          <p className='text-2xl py-2'>
            {isFront ? card.frontExample : card.backExample}
          </p>
        </div>
        <div>
          <div className='grid grid-cols-3 mt-4 '>
            <div className='pt-4'>
              {remainingCards} / {count}
            </div>
            {isFront ? (
              <div className='col-span-2'>
                <button
                  type='button'
                  onClick={() => setIsFront(false)}
                  className='w-24 border float-end text-2-xl rounded-md p-2 bg-yellow-300'
                >
                  Next
                </button>
              </div>
            ) : (
              <div className='col-span-2'>
                <div className='grid col-auto justify-end mt-4'>
                  <p>
                    <button
                      type='button'
                      onClick={() => handleAnswer(true)}
                      className='text-white w-24 border text-2-xl rounded-md p-2 bg-green-500'
                    >
                      Correct
                    </button>
                    <button
                      type='button'
                      onClick={() => handleAnswer(false)}
                      className='text-white w-24 border text-2-xl rounded-md p-2 ml-2 bg-red-500'
                    >
                      False
                    </button>
                  </p>
                </div>
              </div>
            )}{' '}
          </div>
        </div>
      </div>
    </>
  );
};
export default Card;
