'use client';
import InputField from '@/components/InputField';
import { loadNewCards } from '@/utils/actions';
import { useActionState } from 'react';

const LoadNewCards = () => {
  const [message, formAction, isPending] = useActionState(loadNewCards, null);
  return (
    <div className='w-auto md:w-[70%] lg:w-1/2 mx-auto border-2 rounded-md shadow-xl p-6 bg-gray-50'>
      <form action={formAction}>
        <h2 className='text-2xl my-4'>Load new Cards</h2>
        <h4 className='text-center text-xs text-green-500'>{message}</h4>
        <InputField type='text' name='count' placeholder='enter a number' />
        <p className='mt-4'>
          <button type='submit' className='rounded-md p-2 bg-green-400 w-auto'>
            {isPending ? '..submitting' : 'submit'}
          </button>
        </p>
      </form>
    </div>
  );
};
export default LoadNewCards;
