'use client';
import { CardFormData, Language } from '@/lib/types';
import CardForm from '@/components/CardForm';
import { useAppSelector } from '@/store';
import { createCardAction } from '@/actions/card';
import { getAIResponse } from '@/utils/ai';
import { redirect } from 'next/navigation';
import { useActionState, useRef, useState, useEffect } from 'react';

const CreateCardForm = () => {
  const { user } = useAppSelector((state) => state.user);
  const language = user?.activeLanguage as Language;
  const [message, formAction, isPending] = useActionState(
    createCardAction,
    null
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [canceled, setCanceled] = useState(false);
  const [formData, setFormData] = useState<CardFormData>({
    frontItem: '',
    frontExample: '',
    backItem: '',
    backPronunciation: '',
    backExample: '',
  });
  const aiAction = async (value: string, firstLanguage: boolean) => {
    const selectedLanguage = firstLanguage
      ? language.firstLanguage
      : language.secondLanguage;
    if (firstLanguage)
      setFormData({
        ...formData,
        backItem: 'generating ....',
        frontExample: 'generating ....',
        backPronunciation: 'generating ....',
        backExample: 'generating ....',
      });
    else
      setFormData({
        ...formData,
        frontItem: 'generating ....',
        frontExample: 'generating ....',
        backPronunciation: 'generating ....',
        backExample: 'generating ...',
      });
    const response = await getAIResponse(
      value,
      [language.firstLanguage, language.secondLanguage],
      selectedLanguage
    );
    setFormData(response);
  };

  const cancelAction = () => {
    setCanceled(true);
    redirect('/');
  };

  useEffect(() => {
    if (message?.includes('created')) {
      formRef?.current?.reset();
      setFormData({
        frontItem: '',
        frontExample: '',
        backItem: '',
        backPronunciation: '',
        backExample: '',
      });
    }
  }, [message]);

  return (
    <>
      <CardForm
        user={user}
        formRef={formRef}
        isPending={isPending}
        message={message}
        formData={formData}
        formAction={formAction}
        aiAction={aiAction}
        setFormData={setFormData}
        cancelAction={cancelAction}
        canceled={canceled}
        label='New Card'
        submitButtonLabel='create'
      />
    </>
  );
};
export default CreateCardForm;
