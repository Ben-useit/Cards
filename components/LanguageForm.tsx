'use client';
import { getLanguages, setLanguage } from '@/utils/actions';
import InputField from './InputField';
import { useActionState, useEffect, useState } from 'react';
import { type LanguagePair } from '@/types';
import { type ActionState } from '@/utils/actions';
const LanguageForm = () => {
  const [records, setRecords] = useState<LanguagePair[]>([]);
  const [restore, setRestore] = useState(false);
  const initialState: ActionState = {
    message: '',
  };
  const [actionState, formAction] = useActionState(setLanguage, initialState);

  useEffect(() => {
    const fetchData = async () => {
      const languages = await getLanguages();
      setRecords(languages);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (actionState.payload) {
      setRestore(true);
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
    (actionState?.payload?.getAll('selected') as string[]) || ([] as string[]);

  let selectItem = false;
  const indexOfNewRecord = records.length;
  // in case there is only a new record, select this by default
  if (indexOfNewRecord === 0) selectItem = true;

  return (
    <form action={formAction}>
      <div className='grid grid-cols-4'>
        <div className='col-span-4'>{actionState.message}</div>
        <div>Label</div> <div>First Language</div> <div>Second Language</div>{' '}
        <div>Selected</div>
      </div>
      {records.map((item, index) => {
        //return <div key={item.id}>{item.label}</div>;
        const isSelectedItem = item.id === selected[0];
        return (
          <div className='grid grid-cols-4' key={item.id}>
            <input type='hidden' name='id' value={item.id} />
            <InputField
              type='text'
              name='label'
              defaultValue={restore ? label[index] : item.label}
            />
            <InputField
              type='text'
              name='firstLanguage'
              defaultValue={restore ? firstLanguage[index] : item.firstLanguage}
            />

            <InputField
              type='text'
              name='secondLanguage'
              defaultValue={
                restore ? secondLanguage[index] : item.secondLanguage
              }
            />
            <InputField
              type='radio'
              name='selected'
              value={item.id}
              defaultChecked={restore ? isSelectedItem : item.selected}
            />
          </div>
        );
      })}
      {/* Fields to add a new record. */}

      <div className='grid grid-cols-4'>
        <input type='hidden' name='id' value='' />
        <InputField
          type='text'
          name='label'
          defaultValue={label?.[indexOfNewRecord]}
        />
        <InputField
          type='text'
          name='firstLanguage'
          defaultValue={firstLanguage?.[indexOfNewRecord]}
        />
        <InputField
          type='text'
          name='secondLanguage'
          defaultValue={secondLanguage?.[indexOfNewRecord]}
        />
        <InputField
          type='radio'
          name='selected'
          value='new'
          defaultChecked={
            restore ? (selected[0] === 'new' ? true : selectItem) : selectItem
          }
        />
      </div>
      <button type='submit'>Save</button>
    </form>
  );
};
export default LanguageForm;
