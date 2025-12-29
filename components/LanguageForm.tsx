'use client';
import { setLanguage } from '@/utils/actions';
import { useActionState, useEffect, useState } from 'react';
import { type Language, User } from '@/app/lib/types';
import { type ActionState } from '@/utils/actions';
//import { useAuthContext } from '@/context';
import { redirect } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { signInUser } from '@/features/user/userSlice';

const LanguageForm = ({
  languages,
  user,
}: {
  languages: Language[];
  user: User;
}) => {
  const [restore, setRestore] = useState(false);
  //const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch();
  //const { setUser } = useAuthContext();
  const initialState: ActionState = {
    message: '',
  };
  const [actionState, formAction] = useActionState(setLanguage, initialState);

  useEffect(() => {
    if (actionState.payload) {
      setRestore(true);
    } else {
      dispatch(signInUser({ ...user }));
    }
  }, [actionState]);

  const handleClose = () => {
    redirect('/');
  };

  const firstLanguage =
    (actionState?.payload?.getAll('firstLanguage') as string[]) ||
    ([] as string[]);
  const secondLanguage =
    (actionState?.payload?.getAll('secondLanguage') as string[]) ||
    ([] as string[]);
  const selected =
    (actionState?.payload?.getAll('selected') as string[]) ||
    (['none'] as string[]);
  const indexOfNewRecord = firstLanguage.length - 1;

  return (
    <div className='w-auto md:w-[70%] lg:w-1/2 mx-auto  p-6 '>
      <form action={formAction}>
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
            isSelectedItem = item.id === user.activeLanguage?.id;
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
        {/* Fields to add a new record. */}
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
    </div>
  );
};
export default LanguageForm;
