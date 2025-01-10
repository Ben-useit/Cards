'use client';
import FormLabel from '@/components/FormLabel';
import InputField from '@/components/InputField';
import { createCard } from '@/utils/actions';
import { useActionState } from 'react';
import { CiCircleCheck } from 'react-icons/ci';

const CreateCard = () => {
  const [message, formAction, isPending] = useActionState(createCard, null);
  return (
    <div className='mx-auto'>
      <div className='text-center'>
        <h2 className='inline'>Create a new card</h2>
        {message && (
          <h4 className='text-center text-xs text-green-500'>
            {message}
            <CiCircleCheck color='green' className='inline mx-2' />
          </h4>
        )}
      </div>
      <form action={formAction}>
        <div className='grid grid-cols-2 gap-4 mx-8 items-center border rounded-md p-4'>
          <h2 className='col-span-2'>Front Side</h2>

          <FormLabel label='Word' />
          <InputField type='text' name='frontItem' />
          <FormLabel label='Example' />
          <InputField type='text' name='frontExample' />
          <h2 className='col-span-2'>Back Side</h2>
          <FormLabel label='Word' />
          <InputField type='text' name='backItem' />
          <FormLabel label='Pronunciation' />
          <InputField type='text' name='backPronunciation' />
          <FormLabel label='Example' />
          <InputField type='text' name='backExample' />
          <button
            type='submit'
            className='col-span-2 float-end rounded-md p-2 bg-green-400'
          >
            {isPending ? '..submitting' : 'submit'}
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateCard;
