'use client';
import FormLabel from '@/components/FormLabel';
import InputField from '@/components/InputField';
import TextArea from '@/components/TextArea';
import { Card } from '@/types';
import { CiCircleCheck } from 'react-icons/ci';

const CardForm = ({
  card,
  message,
  formAction,
  isPending,
  cancelAction,
  canceled,
  label,
}: {
  card?: Card;
  message?: string | null;
  formAction: (payload: FormData) => void;
  isPending: boolean;
  cancelAction: () => void;
  canceled: boolean;
  label: string;
}) => {
  return (
    <div className='mx-auto '>
      <div className='text-center'>
        <h2 className='inline'>{label}</h2>
        {message && (
          <h4 className='text-center text-xs text-green-500'>
            {message}
            <CiCircleCheck color='green' className='inline mx-2' />
          </h4>
        )}
      </div>
      <form action={formAction}>
        <div className='grid grid-cols-[30%_70%] gap-4 border justify-end rounded-md p-6 shadow-xl  bg-gray-50'>
          <input type='hidden' name='id' value={card?.id || ''} />
          <h2 className='col-span-2'>Front Side</h2>
          <FormLabel label='Word' />
          <InputField
            type='text'
            name='frontItem'
            defaultValue={card?.frontItem || ''}
          />
          <FormLabel label='Example' />
          <TextArea
            name='frontExample'
            defaultValue={card?.frontExample || ''}
          />
          <h2 className='col-span-2'>Back Side</h2>
          <FormLabel label='Word' />
          <InputField
            type='text'
            name='backItem'
            defaultValue={card?.backItem || ''}
          />
          <FormLabel label='Pronunciation' />
          <InputField
            type='text'
            name='backPronunciation'
            defaultValue={card?.backPronunciation || ''}
          />
          <FormLabel label='Example' />
          <TextArea name='backExample' defaultValue={card?.backExample || ''} />
          <div className='col-span-2 text-right pt-2'>
            <button
              type='submit'
              className={`rounded-md p-2  w-1/4 mr-2 ${
                isPending ? 'bg-gray-200' : 'bg-red-400'
              } `}
              onClick={cancelAction}
              disabled={isPending}
            >
              {isPending && canceled ? '...cancelling' : 'cancel'}
            </button>
            <button
              type='submit'
              disabled={isPending}
              className={`rounded-md p-2  w-1/4 ${
                isPending ? 'bg-gray-200' : 'bg-green-400'
              } `}
            >
              {isPending && !canceled ? '...submitting' : 'submit'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default CardForm;
