'use client';
import { loadNewCardsAction } from '@/actions/card';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';

const LoadForm = () => {
  const [message, formAction, isPending] = useActionState(
    loadNewCardsAction,
    null
  );
  const router = useRouter();
  return (
    <>
      <div className='w-full max-w-2xl mx-auto m-6'>
        <form action={formAction}>
          <div className='relative w-1/2 h-80 mb-6  mx-auto'>
            <div className='absolute w-full h-full bg-white rounded-xl shadow-2xl p-8 flex flex-col justify-center items-center'>
              <div className='text-2xl my-4'>Load new Cards</div>
              <div className='text-center text-ms text-red-600'>{message}</div>
              <input
                type='number'
                name='count'
                placeholder='Enter number of cards to load'
                className={`border rounded-md bg-slate-100 pl-3 w-full p-4 m-4`}
              />
              <button
                type='submit'
                disabled={isPending}
                className={`w-full p-4 bg-blue-600 text-white rounded-lg shadow-lg ${
                  !isPending && 'hover:bg-blue-700'
                } text-lg font-bold flex items-center justify-center space-x-2`}
              >
                <span>{isPending ? '..submitting' : 'Submit'}</span>
              </button>
              <button
                type='button'
                disabled={isPending}
                onClick={() => router.push('/')}
                className={`mt-4 mb-8 w-full p-4 bg-gray-600 text-white rounded-lg shadow-lg ${
                  !isPending && 'hover:bg-gray-700'
                }
                }  text-lg font-bold flex items-center justify-center space-x-2`}
              >
                <span>Close</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default LoadForm;
