'use client';
import {
  fetchUserCards,
  handleCorrectAnswer,
  handleFalseAnswer,
  reset,
  setIsFlipped,
} from '@/features/card/cardSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  Plus,
  Brain,
  Repeat,
  Check,
  X,
  ArrowRight,
  Loader,
} from 'lucide-react';
import Loading from './Loading';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import NothingToDo from './NothingToDo';
import Flag from 'react-world-flags';
import { updateStatus } from '@/utils/actions';

const FlipCard = ({ repeat }: { repeat?: boolean }) => {
  const {
    cards,
    total,
    currentCardIndex,
    isFlipped,
    correctAnswers,
    falseAnswers,
    isLoading,
    complete,
  } = useAppSelector((state) => state.card);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleFlip = () => {
    dispatch(setIsFlipped());
  };

  const renderResults = () => (
    <div className='text-center max-w-md mx-auto'>
      <h2 className='text-3xl font-bold mb-6'>Session Complete!</h2>
      <div className='text-xl mb-4 p-4 bg-green-100 text-green-800 rounded-lg'>
        Correct: {correctAnswers}
      </div>
      <div className='text-xl mb-8 p-4 bg-red-100 text-red-800 rounded-lg'>
        Failed: {falseAnswers}
      </div>
      <Link
        href={'/'}
        onClick={() => {
          dispatch(reset());
          router.push('/');
        }}
        className='w-full p-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 text-lg font-bold'
      >
        Back to Dashboard
      </Link>
    </div>
  );

  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    if (user) {
      dispatch(fetchUserCards({ user, repeat }));
    }
  }, [user, dispatch]);

  if (isLoading) return <Loading message='Loading Cards'></Loading>;
  if (!cards) return <></>;
  if (total === 0) return <NothingToDo />;
  if (complete) return renderResults();

  const card = cards[currentCardIndex].card;
  const isReverse = cards[currentCardIndex].reverse;
  const progress = ((currentCardIndex + 1) / cards.length) * 100;

  const handleReview = (answer: boolean) => {
    if (answer) dispatch(handleCorrectAnswer());
    else dispatch(handleFalseAnswer());
    if (repeat) {
      updateStatus(answer, card, isReverse);
    }
  };

  return (
    <div className='w-full max-w-2xl mx-auto'>
      {/* Progress Bar */}
      <div className='w-full bg-gray-200 rounded-full h-2.5 mb-4'>
        <div
          className='bg-blue-600 h-2.5 rounded-full'
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className='text-center text-sm text-gray-500 mb-4'>
        Card {currentCardIndex + 1} of {total}
      </p>

      {/* Card */}
      <div className='relative w-full h-80 perspective-[1000px] mb-6'>
        <div
          className={`absolute w-full h-full transition-transform duration-1000 transform-3d ${
            isFlipped ? 'transform-[rotateY(180deg)]' : ''
          }`}
        >
          {/* Front Side */}
          <div className='absolute w-full h-full bg-white rounded-xl shadow-2xl p-8 flex flex-col justify-center items-center backface-hidden'>
            <p className='text-sm text-gray-500 mb-4'>
              <Flag
                code={isReverse ? card.backLanguage : card.frontLanguage}
                fallback='--'
                style={{ display: 'inline', padding: '2px', height: '20px' }}
              />
            </p>
            <h2 className='text-5xl font-bold mb-4'>
              {isReverse ? card.backItem : card.frontItem}
            </h2>
            {card.frontExample && (
              <p className='text-lg text-gray-600'>
                "{isReverse ? card.backExample : card.frontExample}"
              </p>
            )}
            {card.frontPronunciation && (
              <p className='text-lg text-gray-400 mt-2'>
                [{isReverse ? card.backPronunciation : card.frontPronunciation}]
              </p>
            )}
          </div>

          {/* Back Side */}
          <div className='absolute w-full h-full bg-white rounded-xl shadow-2xl p-8 flex flex-col justify-center items-center transform-[rotateY(180deg)] backface-hidden'>
            <p className='text-sm text-gray-500 mb-4'>
              {isFlipped && (
                <Flag
                  code={isReverse ? card.frontLanguage : card.backLanguage}
                  fallback='--'
                  style={{ display: 'inline', padding: '2px', height: '20px' }}
                />
              )}
            </p>
            <h2
              className={`text-5xl font-bold mb-4 ${
                !isFlipped && 'text-white'
              }`}
            >
              {isReverse ? card.frontItem : card.backItem}
            </h2>
            {card.backExample && (
              <p
                className={`text-lg text-gray-600 ${
                  !isFlipped && 'text-white'
                }`}
              >
                "{isReverse ? card.frontExample : card.backExample}"
              </p>
            )}
            {card.backPronunciation && (
              <p
                className={`text-lg text-gray-400 mt-2 ${
                  !isFlipped && 'text-white'
                }`}
              >
                [{isReverse ? card.frontPronunciation : card.backPronunciation}]
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className='flex justify-center space-x-4'>
        {!isFlipped ? (
          <button
            onClick={handleFlip}
            className='w-full p-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 text-lg font-bold flex items-center justify-center space-x-2'
          >
            <span>Show Answer</span>
            <ArrowRight size={20} />
          </button>
        ) : (
          <>
            <button
              onClick={() => handleReview(false)}
              className='w-1/2 p-4 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 text-lg font-bold flex items-center justify-center space-x-2'
            >
              <X size={20} />
              <span>Wrong</span>
            </button>
            <button
              onClick={() => handleReview(true)}
              className='w-1/2 p-4 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 text-lg font-bold flex items-center justify-center space-x-2'
            >
              <Check size={20} />
              <span>Correct</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default FlipCard;
