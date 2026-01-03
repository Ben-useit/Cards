import { Card, CardFormData, User } from '@/lib/types';
import { PiOpenAiLogoThin } from 'react-icons/pi';
import { CiCircleCheck } from 'react-icons/ci';
import { RefObject } from 'react';
import { getFlags } from '@/utils/flags';

const CardForm = ({
  user,
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
  user: User | null;
  card?: Card;
  formRef?: RefObject<HTMLFormElement | null>;
  message?: string | null;
  formAction: (payload: FormData) => void;
  isPending: boolean;
  formData: CardFormData;
  setFormData: (arg: CardFormData) => void;
  aiAction?: (value: string, firstLanguage: boolean) => void;
  cancelAction: () => void;
  canceled: boolean;
  label: string;
  submitButtonLabel: string;
}) => {
  const inputStyle = 'border rounded-md bg-slate-100';
  const areaStyle =
    'w-full h-32 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none';

  const flags = getFlags(user?.activeLanguage, '24px');
  return (
    <>
      <form ref={formRef} action={formAction}>
        <div className='w-full max-w-2xl mx-auto'>
          <div className='text-center'>
            <h2 className='text-5xl font-bold my-4'>{label}</h2>
            {message && (
              <h4 className='text-center text-lg text-green-500'>
                {message}
                <CiCircleCheck color='green' className='inline mx-2' />
              </h4>
            )}
          </div>
          <div className='relative w-full mb-6'>
            <div className='relative w-full h-full bg-white rounded-xl shadow-2xl p-8 flex flex-col justify-center items-center'>
              <input type='hidden' name='id' value={card?.id || ''} />
              <p className='text-sm text-gray-500 mb-4'>{flags[0]}</p>
              <div className='text-2xl font-bold mb-4 '>
                <div className='flex min-w-0 '>
                  <input
                    type='text'
                    name='frontItem'
                    value={formData.frontItem}
                    className={`${inputStyle} pl-3 w-full`}
                    onChange={(e) => {
                      setFormData({ ...formData, frontItem: e.target.value });
                    }}
                  />
                  {!card && aiAction && (
                    <button
                      type='button'
                      onClick={() => aiAction(formData.frontItem, true)}
                      className='p-3 border rounded-sm ml-2'
                    >
                      <PiOpenAiLogoThin />
                    </button>
                  )}
                </div>
                <input
                  type='text'
                  name='frontPronunciation'
                  placeholder='Pronunciation'
                  value={formData.frontPronunciation || ''}
                  className={`${inputStyle} pl-3 w-full h-18.5 mt-4`}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      frontPronunciation: e.target.value,
                    })
                  }
                />
                <textarea
                  name='frontExample'
                  className={`${areaStyle} my-4 w-full`}
                  placeholder='Example'
                  value={formData.frontExample || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, frontExample: e.target.value })
                  }
                ></textarea>
              </div>
              <p className='text-sm text-gray-500 mb-4'>{flags[1]}</p>
              <div className='text-2xl font-bold mb-4 '>
                <div className='flex min-w-0 '>
                  <input
                    type='text'
                    name='backItem'
                    value={formData.backItem}
                    className={`${inputStyle} pl-3 w-full`}
                    onChange={(e) => {
                      setFormData({ ...formData, backItem: e.target.value });
                    }}
                  />
                  {!card && aiAction && (
                    <button
                      type='button'
                      onClick={() => aiAction(formData.backItem, true)}
                      className='p-3 border rounded-sm ml-2'
                    >
                      <PiOpenAiLogoThin />
                    </button>
                  )}
                </div>

                <input
                  type='text'
                  name='backPronunciation'
                  placeholder='Pronunciation'
                  value={formData.backPronunciation || ''}
                  className={`${inputStyle} pl-3 w-full h-18.5 mt-4`}
                  //className={`${inputStyle} pl-3 my-4 min-h-10.5`}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      backPronunciation: e.target.value,
                    })
                  }
                />
                <textarea
                  name='backExample'
                  className={`${areaStyle} my-4 w-full`}
                  placeholder='Example'
                  value={formData.backExample || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, backExample: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
          </div>
          <div className='flex justify-center space-x-4 mb-4'>
            <button
              type='button'
              className={`w-1/2 my-2  p-4 ${
                isPending ? 'bg-gray-200' : 'bg-red-600'
              } text-white rounded-lg shadow-lg hover:bg-red-700 text-lg font-bold flex items-center justify-center space-x-2`}
              onClick={cancelAction}
              disabled={isPending}
            >
              {isPending && canceled ? '...cancelling2' : 'cancel'}
            </button>
            <button
              type='submit'
              disabled={isPending}
              className={`w-1/2 my-2 p-4 ${
                isPending ? 'bg-gray-200' : 'bg-blue-600'
              } text-white rounded-lg shadow-lg hover:bg-blue-700 text-lg font-bold flex items-center justify-center space-x-2`}
            >
              {isPending && !canceled ? '...processing' : submitButtonLabel}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default CardForm;
