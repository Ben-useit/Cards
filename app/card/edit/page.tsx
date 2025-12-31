'use client';

import { useAppDispatch, useAppSelector } from '@/store';

import CardForm from '@/components/CardForm';
import { useActionState, useEffect, useState } from 'react';
import { CreateCardFormData } from '@/app/lib/types';
import { redirect, useRouter } from 'next/navigation';
import { updateCard } from '@/utils/actions';
import { modifyCard } from '@/features/card/cardSlice';

const CardEdit = () => {
  const { cards, currentCardIndex, redirectTo } = useAppSelector(
    (state) => state.card
  );
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  if (!cards || !cards.length) return <div>No cards.</div>;
  if (!cards[currentCardIndex]) return <div>Something's wrong here.</div>;

  const [message, formAction, isPending] = useActionState(updateCard, null);

  const [formData, setFormData] = useState<CreateCardFormData>({
    frontItem: '',
    frontExample: '',
    backItem: '',
    backPronunciation: '',
    backExample: '',
  });
  const [canceled, setCanceled] = useState(false);

  const card = cards[currentCardIndex].card;

  useEffect(() => {
    setFormData({
      frontItem: card.frontItem,
      frontPronunciation: card.frontPronunciation,
      frontExample: card.frontExample,
      backItem: card.backItem,
      backPronunciation: card.backPronunciation,
      backExample: card.backExample,
    });
  }, []);

  useEffect(() => {
    if (!isPending && message) {
      dispatch(modifyCard(formData));
      router.push(redirectTo);
    }
  }, [isPending, message, router]);

  useEffect(() => {
    if (canceled) {
      router.push(redirectTo);
    }
  }, [canceled]);

  const cancelAction = () => {
    setCanceled(true);
  };

  return (
    <CardForm
      user={user}
      card={card}
      isPending={isPending}
      message={message}
      formData={formData}
      formAction={formAction}
      setFormData={setFormData}
      cancelAction={cancelAction}
      canceled={canceled}
      label='Edit Card'
      submitButtonLabel='save'
    />
  );
};
export default CardEdit;
