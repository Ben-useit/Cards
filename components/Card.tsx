'use client';

import { type Card } from '@/types';
import { updateStatus } from '@/utils/actions';
import Link from 'next/link';
import { useState } from 'react';
import { SlArrowLeft, SlClose } from 'react-icons/sl';
import { TfiPencilAlt } from 'react-icons/tfi';
import ResultModal from './ResultModal';
import { redirect } from 'next/navigation';

const Card = ({
  cards,
  repeat,
  count,
  showedFront,
  correctA,
  falseA,
}: {
  cards: Card[];
  repeat: boolean;
  count: number;
  showedFront?: boolean;
  correctA?: number;
  falseA?: number;
}) => {
  const initialShowFront = showedFront === undefined ? true : showedFront;
  const [isFront, setIsFront] = useState(initialShowFront);
  const [cardList, setCardList] = useState(cards);
  const [card, setCard] = useState(cardList[0]);
  const [correctAnswers, setCorrectAnswers] = useState(correctA || 0);
  const [falseAnswers, setFalseAnswers] = useState(falseA || 0);

  const handleAnswer = (answer: boolean) => {
    const newCardList = cardList.filter((c) => c.id != card.id);
    setCardList(newCardList);
    setCard(newCardList[0]);
    setIsFront(true);
    if (answer) setCorrectAnswers(correctAnswers + 1);
    else setFalseAnswers(falseAnswers + 1);
    if (repeat) updateStatus(answer, card);
  };

  const handleEdit = () => {
    const currentStatus = {
      isFront: isFront,
      repeat: repeat,
      correctAnswers: correctAnswers,
      falseAnswers: falseAnswers,
      totalCards: count,
      cardList: cardList,
    };
    localStorage.setItem('status', JSON.stringify(currentStatus));
    redirect('/card/edit');
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
      <div className='w-auto md:w-[70%] lg:w-1/2 mx-auto border-2 rounded-md shadow-xl p-6 bg-gray-50'>
        <div className='grid grid-cols-2'>
          <div>
            {isFront || (
              <div className='float-start'>
                <button type='button' onClick={() => setIsFront(true)}>
                  <SlArrowLeft color='#fde047' />
                </button>
              </div>
            )}
          </div>

          <div>
            <Link href='/' className='inline float-end'>
              <SlClose color='red' className='mt-1' />
            </Link>
            <Link href='#' onClick={handleEdit} className='inline  float-end'>
              <TfiPencilAlt className='mt-1 mx-2' />
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
                  className='w-32 border float-end rounded-md p-2 bg-yellow-300'
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
                      className='text-white w-22 border rounded-md p-2 bg-green-500'
                    >
                      Correct
                    </button>
                    <button
                      type='button'
                      onClick={() => handleAnswer(false)}
                      className='text-white w-22 border rounded-md p-2 ml-2 bg-red-500'
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
