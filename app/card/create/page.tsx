'use client';
import CardForm from '@/components/CardForm';
import FormLabel from '@/components/FormLabel';
import InputField from '@/components/InputField';
import TextArea from '@/components/TextArea';
import { createCard } from '@/utils/actions';
import { redirect } from 'next/navigation';
import { useActionState, useState } from 'react';
import { CiCircleCheck } from 'react-icons/ci';

const CreateCard = () => {
  const [message, formAction, isPending] = useActionState(createCard, null);
  const [canceled, setCanceled] = useState(false);
  const cancelAction = () => {
    setCanceled(true);
    redirect('/');
  };
  return (
    <CardForm
      isPending={isPending}
      message={message}
      formAction={formAction}
      cancelAction={cancelAction}
      canceled={canceled}
    />
  );
  return (
    <div className='mx-auto md:w-[700px]'>
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
        <div className='grid grid-cols-[30%_70%] gap-4 mx-8 border justify-end rounded-md p-4'>
          <h2 className='col-span-2'>Front Side</h2>
          <FormLabel label='Word' />
          <InputField type='text' name='frontItem' />
          <FormLabel label='Example' />
          <TextArea name='frontExample' />
          <h2 className='col-span-2'>Back Side</h2>
          <FormLabel label='Word' />
          <InputField type='text' name='backItem' />
          <FormLabel label='Pronunciation' />
          <InputField type='text' name='backPronunciation' />
          <FormLabel label='Example' />
          <TextArea name='backExample' />
          <div className='col-span-2 text-right pt-2'>
            <button type='submit' className='rounded-md p-2 bg-green-400 w-1/3'>
              {isPending ? '..submitting' : 'submit'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default CreateCard;
