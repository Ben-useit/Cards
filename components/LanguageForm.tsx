'use client';
import { setLanguage } from '@/utils/actions';
import { useActionState, useEffect, useState } from 'react';
import { type Language, User } from '@/app/lib/types';
import { type ActionState } from '@/utils/actions';
import { useAuthContext } from '@/context';

const LanguageForm = ({
  languages,
  user,
}: {
  languages: Language[];
  user: User;
}) => {
  const [restore, setRestore] = useState(false);
  const { setUser } = useAuthContext();
  const initialState: ActionState = {
    message: '',
  };
  const [actionState, formAction] = useActionState(setLanguage, initialState);

  useEffect(() => {
    if (actionState.payload) {
      setRestore(true);
    } else {
      setUser(user);
    }
  }, [actionState]);

  const label =
    (actionState?.payload?.getAll('label') as string[]) || ([] as string[]);
  const firstLanguage =
    (actionState?.payload?.getAll('firstLanguage') as string[]) ||
    ([] as string[]);
  const secondLanguage =
    (actionState?.payload?.getAll('secondLanguage') as string[]) ||
    ([] as string[]);
  const selected =
    (actionState?.payload?.getAll('selected') as string[]) ||
    (['none'] as string[]);
  const indexOfNewRecord = label.length - 1;
  // in case there is only a new record, select this by default
  return (
    <div className='w-auto md:w-[70%] lg:w-1/2 mx-auto  p-6 '>
      <form action={formAction}>
        <div className='grid grid-cols-4 gap-4 gap-y-4'>
          <div className='col-span-4'>{actionState?.message}</div>
          <div className='text-left font-bold'>Label</div>
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
                name='label'
                defaultValue={restore ? label[index] : item.label}
              />
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
            name='label'
            defaultValue={label?.[indexOfNewRecord]}
            className='border rounded-md bg-slate-100'
          />
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
          <div className='grid grid-cols-4 gap-4 pt-4'>
            <div>
              {' '}
              <button
                type='submit'
                className='text-white w-22 border rounded-md p-2 bg-green-500'
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default LanguageForm;
