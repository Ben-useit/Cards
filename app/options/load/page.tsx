'use client';
import { loadNewCards } from '@/utils/actions';
import { useActionState } from 'react';

const LoadNewCards = () => {
  const [message, formAction, isPending] = useActionState(loadNewCards, null);
  return (
    <>
      <div className='w-full max-w-2xl mx-auto m-6'>
        <form action={formAction}>
          <div className='relative w-1/2 h-80 mb-6  mx-auto'>
            <div className='absolute w-full h-full bg-white rounded-xl shadow-2xl p-8 flex flex-col justify-center items-center'>
              <h2 className='text-2xl my-4'>Load new Cards</h2>
              <h4 className='text-center text-ms text-red-600'>{message}</h4>
              <input
                type='number'
                name='count'
                placeholder='Enter number of cards to load'
                className={`border rounded-md bg-slate-100 pl-3 w-full p-4 m-4`}
              />
              <button
                type='submit'
                className='w-full p-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 text-lg font-bold flex items-center justify-center space-x-2'
              >
                <span>{isPending ? '..submitting' : 'Submit'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default LoadNewCards;
