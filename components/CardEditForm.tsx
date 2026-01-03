'use client';

import { useActionState, useEffect, useState } from 'react';
import CardForm from './CardForm';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { updateCardAction } from '@/actions/card';
import { CardFormData } from '@/lib/types';
import { modifyCard } from '@/features/card/cardSlice';

const CardEditForm = () => {
  const { cards, currentCardIndex, redirectTo, sessionId } = useAppSelector(
    (state) => state.card
  );
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  if (!cards || !cards.length) return <div>No cards.</div>;
  if (!cards[currentCardIndex]) return <div>Something's wrong here.</div>;

  const [message, formAction, isPending] = useActionState(
    updateCardAction,
    null
  );

  const [formData, setFormData] = useState<CardFormData>({
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
      frontPronunciation: card.frontPronunciation || '',
      frontExample: card.frontExample || '',
      backItem: card.backItem,
      backPronunciation: card.backPronunciation || '',
      backExample: card.backExample || '',
    });
  }, []);

  useEffect(() => {
    if (!isPending && message) {
      dispatch(modifyCard(formData));
      router.push(`${redirectTo}?session=${sessionId}`);
    }
  }, [isPending, message, router]);

  useEffect(() => {
    if (canceled) {
      router.push(`${redirectTo}?session=${sessionId}`);
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
export default CardEditForm;
