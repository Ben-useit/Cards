'use client';
import { Card } from '@/app/lib/types';
import { updateCard } from '@/utils/actions';
import { redirect } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { CreateCardFormData } from '@/app/lib/types';
import CardForm from './CardForm';
const CardEditForm = ({ card }: { card: Card }) => {
  const [updatedCard, formAction, isPending] = useActionState(updateCard, null);
  const [canceled, setCanceled] = useState(false);
  const [formData, setFormData] = useState<CreateCardFormData>({ ...card });

  useEffect(() => {
    if (updatedCard !== null) {
      const statusJSON = localStorage.getItem('status');
      const statusData = JSON.parse(statusJSON as string);
      const cardList: Card[] = statusData.cardList;
      const updatedList = cardList.map((item) => {
        return item.id === updatedCard.id ? { ...item, ...updatedCard } : item;
      });
      const newStatusData = { ...statusData, cardList: updatedList };
      localStorage.setItem('status', JSON.stringify(newStatusData));

      redirect('/card/continue');
    }
  }, [updatedCard]);

  const cancelAction = () => {
    setCanceled(true);
    redirect('/card/continue');
  };

  return (
    <CardForm
      card={card}
      formData={formData}
      setFormData={setFormData}
      isPending={isPending}
      formAction={formAction}
      cancelAction={cancelAction}
      canceled={canceled}
      label='Edit Card'
      submitButtonLabel='update'
    />
  );
};
export default CardEditForm;
