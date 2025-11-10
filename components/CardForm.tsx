import { CreateCardFormData } from '@/app/lib/types';
import { PiOpenAiLogoThin } from 'react-icons/pi';
import { CiCircleCheck } from 'react-icons/ci';
import { RefObject } from 'react';
import { useAuthContext } from '@/context';
import { getFlags } from '@/utils/flags';
import Card from './Card';

const CardForm = ({
  card,
  formRef,
  message,
  formAction,
  isPending,
  formData,
  setFormData,
  aiAction,
  cancelAction,
  canceled,
  label,
  submitButtonLabel,
}: {
  card?: Card;
  formRef?: RefObject<HTMLFormElement | null>;
  message?: string | null;
  formAction: (payload: FormData) => void;
  isPending: boolean;
  formData: CreateCardFormData;
  setFormData: (arg: CreateCardFormData) => void;
  aiAction?: (value: string, firstLanguage: boolean) => void;
  cancelAction: () => void;
  canceled: boolean;
  label: string;
  submitButtonLabel: string;
}) => {
  const inputStyle = 'border rounded-md bg-slate-100';
  const areaStyle =
    'w-full h-32 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none';
  const { user } = useAuthContext();
  const flags = getFlags(user, '24px');
  return (
    <>
      <div className='mx-auto max-w-md'>
        <div className='text-center'>
          <h2 className='text-3xl text-blue-700 p-4'>{label}</h2>
          {message && (
            <h4 className='text-center text-lg text-green-500'>
              {message}
              <CiCircleCheck color='green' className='inline mx-2' />
            </h4>
          )}
        </div>

        <form ref={formRef} action={formAction}>
          <div className='grid grid-cols-1 border justify-end rounded-md p-6 shadow-lg  bg-gray-50'>
            <input type='hidden' name='id' value={card?.id || ''} />
            <h2 className='text-center p-4 text-2xl font-semibold'>
              {flags[0]}
            </h2>
            <div className='flex'>
              <input
                type='text'
                name='frontItem'
                value={formData.frontItem}
                className={`${inputStyle} flex-grow pl-3`}
                onChange={(e) => {
                  setFormData({ ...formData, frontItem: e.target.value });
                }}
              />
              {!card && aiAction && (
                <button
                  type='button'
                  onClick={() => aiAction(formData.frontItem, true)}
                  className='p-3 border rounded-sm'
                >
                  <PiOpenAiLogoThin />
                </button>
              )}
            </div>

            <label className='text-left text-xl py-2'>Example:</label>
            <textarea
              name='frontExample'
              className={`${areaStyle}`}
              value={formData.frontExample || ''}
              onChange={(e) =>
                setFormData({ ...formData, frontExample: e.target.value })
              }
            ></textarea>
          </div>

          <div className='grid grid-cols-1 border justify-end rounded-md p-6 shadow-lg mt-6 bg-gray-50'>
            <h2 className='text-center p-4 text-2xl font-semibold'>
              {flags[1]}
            </h2>
            <div className='flex'>
              <input
                type='text'
                name='backItem'
                value={formData.backItem}
                className={`${inputStyle}  flex-grow pl-3`}
                onChange={(e) =>
                  setFormData({ ...formData, backItem: e.target.value })
                }
              />
              {!card && aiAction && (
                <button
                  type='button'
                  onClick={() => aiAction(formData.backItem, false)}
                  className='p-3 border rounded-sm'
                >
                  <PiOpenAiLogoThin />
                </button>
              )}
            </div>

            <label className='text-left text-xl py-2'>Pronunciation:</label>
            <input
              type='text'
              name='backPronunciation'
              value={formData.backPronunciation || ''}
              className={`${inputStyle} pl-3 min-h-[42px]`}
              onChange={(e) =>
                setFormData({ ...formData, backPronunciation: e.target.value })
              }
            />
            <label className='text-left text-xl py-2'>Example:</label>
            <textarea
              name='backExample'
              className={`${areaStyle}`}
              value={formData.backExample || ''}
              onChange={(e) =>
                setFormData({ ...formData, backExample: e.target.value })
              }
            ></textarea>
          </div>
          <div className='col-span-2 text-right pt-6'>
            <button
              type='button'
              className={`rounded-md p-2  w-1/4 mr-2 ${
                isPending ? 'bg-gray-200' : 'bg-red-400'
              } `}
              onClick={cancelAction}
              disabled={isPending}
            >
              {isPending && canceled ? '...cancelling2' : 'cancel'}
            </button>
            <button
              type='submit'
              disabled={isPending}
              className={`rounded-md p-2  w-1/4 ${
                isPending ? 'bg-gray-200' : 'bg-green-400'
              } `}
            >
              {isPending && !canceled ? '...processing' : submitButtonLabel}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default CardForm;
