'use client';
import FormLabel from '@/components/FormLabel';
import InputField from '@/components/InputField';
import TextArea from '@/components/TextArea';
import { Card } from '@/types';
import { updateCard } from '@/utils/actions';
import { redirect } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import CardForm from './CardForm';

const CardEditForm = ({ card }: { card: Card }) => {
  const [updatedCard, formAction, isPending] = useActionState(updateCard, null);
  const [canceled, setCanceled] = useState(false);

  useEffect(() => {
    if (updatedCard !== null) {
      const statusJSON = localStorage.getItem('status');
      const statusData = JSON.parse(statusJSON as string);
      const cardList: Card[] = statusData.cardList;
      const updatedList = cardList.map((item) => {
        return item.id === updatedCard.id ? { ...item, ...updatedCard } : item;
      });
      const newStatusData = { ...statusData, cardList: updatedList };
      localStorage.setItem('status', JSON.stringify(newStatusData));

      redirect('/card/continue');
    }
  }, [updatedCard]);

  const cancelAction = () => {
    setCanceled(true);
    redirect('/card/continue');
  };

  return (
    <CardForm
      card={card}
      isPending={isPending}
      formAction={formAction}
      cancelAction={cancelAction}
      canceled={canceled}
      label='Edit Card'
    />
  );

  return (
    <div className='mx-auto md:w-[700px]'>
      <div className='text-center'>
        <h2 className='inline'>Edit card</h2>
        {/* {message && (
          <h4 className='text-center text-xs text-green-500'>
            {message}
            <CiCircleCheck color='green' className='inline mx-2' />
          </h4>
        )} */}
      </div>
      <form action={formAction}>
        <div className='grid grid-cols-[30%_70%] gap-4 mx-8 border justify-end rounded-md p-4'>
          <input type='hidden' name='id' value={card.id} />
          <h2 className='col-span-2'>Front Side</h2>
          <FormLabel label='Word' />
          <InputField
            type='text'
            name='frontItem'
            defaultValue={card.frontItem}
          />
          <FormLabel label='Example' />
          <TextArea name='frontExample' defaultValue={card.frontExample} />
          <h2 className='col-span-2'>Back Side</h2>
          <FormLabel label='Word' />
          <InputField
            type='text'
            name='backItem'
            defaultValue={card.backItem}
          />
          <FormLabel label='Pronunciation' />
          <InputField
            type='text'
            name='backPronunciation'
            defaultValue={card.backPronunciation}
          />
          <FormLabel label='Example' />
          <TextArea name='backExample' defaultValue={card.backExample} />
          <div className='col-span-2 text-right pt-2'>
            <button
              type='submit'
              className='rounded-md p-2 bg-red-400 w-1/4 mr-2'
              onClick={() => redirect('/card/continue')}
            >
              Cancel
            </button>
            <button type='submit' className='rounded-md p-2 bg-green-400 w-1/4'>
              {isPending ? '..submitting' : 'submit'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default CardEditForm;
