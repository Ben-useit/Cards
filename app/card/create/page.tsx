'use client';
import CardForm from '@/components/CardForm';
import { createCard } from '@/utils/actions';
import { redirect } from 'next/navigation';
import { useActionState, useState } from 'react';

const CreateCard = () => {
  const [message, formAction, isPending] = useActionState(createCard, null);
  const [canceled, setCanceled] = useState(false);
  const cancelAction = () => {
    setCanceled(true);
    redirect('/');
  };
  return (
    <CardForm
      isPending={isPending}
      message={message}
      formAction={formAction}
      cancelAction={cancelAction}
      canceled={canceled}
      label='Create Card'
    />
  );
};
export default CreateCard;
