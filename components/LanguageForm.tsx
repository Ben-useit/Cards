'use client';
import { useActionState, useEffect, useState } from 'react';
import { type Language, User } from '@/lib/types';
import { setLanguageAction, type ActionState } from '@/actions/language';
import { redirect, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { signInUser } from '@/features/user/userSlice';
import SubmitButton from './controls/buttons';
import InputField, { RadioField } from './controls/inputs';

const LanguageForm = ({ languages }: { languages: Language[] }) => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  if (!user) router.push('/login');
  const dispatch = useAppDispatch();
  const [actionState, formAction, isPending] = useActionState(
    setLanguageAction,
    null
  );
  const cancelAction = () => {
    router.push('/');
  };

  useEffect(() => {
    if (actionState?.user) {
      dispatch(signInUser({ payload: actionState.user }));
      router.push('/');
      router.refresh();
    }
  }, [actionState]);

  return (
    <>
      <div className='w-full max-w-2xl mx-auto'>
        <div className='relative w-full mb-6'>
          <div className='relative w-full h-full bg-white rounded-xl shadow-2xl p-8 flex flex-col justify-center items-center'>
            <form action={formAction}>
              <div className='grid grid-cols-3 gap-4 gap-y-4'>
                <div className='col-span-3'></div>
                <div className='text-left font-bold text-xl'>
                  First Language
                </div>{' '}
                <div className='text-left font-bold text-xl'>
                  Second Language
                </div>{' '}
                <div className='font-bold text-xl'>Selected</div>
              </div>
              {languages.map((item, index) => {
                const isSelectedItem = item.id === user?.activeLanguage?.id;

                return (
                  <div className='grid grid-cols-3 gap-4 pt-4' key={item.id}>
                    <input type='hidden' name='id' value={item.id} />
                    <InputField
                      name='firstLanguage'
                      readOnly={true}
                      style='h-9'
                      defaultValue={item.firstLanguage}
                    />
                    <InputField
                      name='secondLanguage'
                      readOnly={true}
                      style='h-9'
                      defaultValue={item.secondLanguage}
                    />

                    <RadioField
                      name='selected'
                      value={item.id}
                      defaultChecked={isSelectedItem}
                    />
                  </div>
                );
              })}

              <div className='flex justify-center space-x-4 my-8'>
                <button
                  type='button'
                  className={`w-1/2 my-2  p-4 ${
                    isPending ? 'bg-gray-200' : 'bg-red-600'
                  } text-white rounded-lg shadow-lg hover:bg-red-700 text-lg font-bold flex items-center justify-center space-x-2`}
                  onClick={cancelAction}
                  disabled={isPending}
                >
                  cancel
                </button>
                <SubmitButton isPending={isPending} />
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <div className='w-auto md:w-[70%] lg:w-1/2 mx-auto  p-6 '>
        <form>
          <div className='grid grid-cols-4 gap-4 gap-y-4'>
            <div className='col-span-4'>{actionState?.message}</div>
            <div className='text-left font-bold'>First Language</div>{' '}
            <div className='text-left font-bold'>Second Language</div>{' '}
            <div className='font-bold'>Selected</div>
          </div>
          {languages.map((item, index) => {
            let isSelectedItem = false;
            if (restore) {
              isSelectedItem = item.id === selected[0];
            } else {
              isSelectedItem = item.id === user?.activeLanguage?.id;
            }
            return (
              <div className='grid grid-cols-4 gap-4 pt-4' key={item.id}>
                <input type='hidden' name='id' value={item.id} />
                <input
                  type='text'
                  name='firstLanguage'
                  defaultValue={
                    restore ? firstLanguage[index] : item.firstLanguage
                  }
                />

                <input
                  type='text'
                  name='secondLanguage'
                  defaultValue={
                    restore ? secondLanguage[index] : item.secondLanguage
                  }
                />
                <input
                  type='radio'
                  name='selected'
                  value={item.id}
                  defaultChecked={isSelectedItem}
                />
              </div>
            );
          })}
    
          <div className='grid grid-cols-4 gap-4 pt-4'>
            <div className='col-span-4 text-left'>Add a new language:</div>
          </div>
          <div className='grid grid-cols-4 gap-4 pt-4'>
            <input type='hidden' name='id' value='' />
            <input
              type='text'
              name='firstLanguage'
              defaultValue={firstLanguage?.[indexOfNewRecord]}
              className='border rounded-md bg-slate-100'
            />
            <input
              type='text'
              name='secondLanguage'
              defaultValue={secondLanguage?.[indexOfNewRecord]}
              className='border rounded-md bg-slate-100'
            />
            <input
              type='radio'
              name='selected'
              value='new'
              defaultChecked={restore ? selected[0] === 'new' : false}
            />
          </div>
          <div className=''>
            <div className='flex gap-4 mt-4'>
              <button
                type='submit'
                className='text-white w-20 border rounded-md p-2 bg-green-500'
              >
                Save
              </button>

              <button
                type='button'
                className='text-white w-20 border rounded-md p-2 bg-gray-500'
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </div> */}
    </>
  );
};
export default LanguageForm;
