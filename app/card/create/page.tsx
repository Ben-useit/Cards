'use client';
import { CreateCardFormData, Language } from '@/app/lib/types';
import CreateCardForm from '@/components/CreateCardForm';
import { useAuthContext } from '@/context';
import { createCard } from '@/utils/actions';
import { getAIResponse } from '@/utils/ai';
import { redirect } from 'next/navigation';
import { useActionState, useRef, useState, useEffect } from 'react';

const CreateCard = () => {
  const { user } = useAuthContext();
  const language = user?.activeLanguage as Language;
  const [message, formAction, isPending] = useActionState(createCard, null);
  const formRef = useRef<HTMLFormElement>(null);
  const [canceled, setCanceled] = useState(false);
  const [formData, setFormData] = useState<CreateCardFormData>({
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
      <CreateCardForm
        formRef={formRef}
        isPending={isPending}
        message={message}
        formData={formData}
        formAction={formAction}
        aiAction={aiAction}
        setFormData={setFormData}
        cancelAction={cancelAction}
        canceled={canceled}
        label='Create Card'
        language={language}
      />
    </>
  );
};
export default CreateCard;
