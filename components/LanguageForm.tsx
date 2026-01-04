'use client';
import { useActionState, useEffect, useState } from 'react';
import { type Language, User } from '@/lib/types';
import { setLanguageAction, type ActionState } from '@/actions/language';
import { redirect, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { signInUser } from '@/features/user/userSlice';
import { StandardButton, SubmitButton } from './controls/buttons';
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
                <StandardButton
                  isPending={isPending}
                  onClickAction={() => cancelAction()}
                />
                <SubmitButton isPending={isPending} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default LanguageForm;
