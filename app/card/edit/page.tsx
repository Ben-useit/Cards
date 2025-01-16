'use client';

import CardEditForm from '@/components/CardEditForm';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';

const CardEdit = () => {
  const [statusJSON, setStatusJSON] = useState<string | null>(null);

  useEffect(() => {
    const status = localStorage.getItem('status');
    if (status === null) redirect('/');
    else setStatusJSON(status);
  }, []);

  if (statusJSON === null) {
    return <div>Loading...</div>;
  }
  const status = JSON.parse(statusJSON);
  const cardData = status.cardList[0];

  return <CardEditForm card={cardData} />;
};
export default CardEdit;
