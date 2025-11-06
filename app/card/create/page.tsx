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
      />
    </>
  );
  // return (
  //   <CardForm
  //     isPending={isPending}
  //     message={message}
  //     formAction={formAction}
  //     aiAction={aiAction}
  //     formData = {formData}
  //     cancelAction={cancelAction}
  //     canceled={canceled}
  //     label='Create Card'
  //   />
  // );
};
export default CreateCard;
