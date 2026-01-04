'use client';
import { loadNewCardsAction } from '@/actions/card';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { SubmitButton, StandardButton } from './controls/buttons';
import InputField from './controls/inputs';

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
          <div className='relative w-1/2 h1-80  h-96 mb-6  mx-auto'>
            <div className='absolute w-full h-full bg-white rounded-xl shadow-2xl p-8 flex flex-col justify-center items-center'>
              <div className='text-2xl my-4'>Load new Cards</div>
              <div className='text-center text-ms text-red-600'>{message}</div>
              <InputField
                type='number'
                name='count'
                placeholder='Enter number of cards to load 2'
                style='h-9'
              />
              <div className='flex w-full gap-4  justify-between mt-8'>
                <StandardButton
                  isPending={isPending}
                  onClickAction={() => router.push('/')}
                />
                <SubmitButton isPending={isPending} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default LoadForm;
