'use client';

import Card from '@/components/Card';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

const LearnContinuePage = () => {
  const [statusJSON, setStatusJSON] = useState<string | null>(null);

  useEffect(() => {
    // Access localStorage only on the client side
    const status = localStorage.getItem('status');
    if (status === null) redirect('/');
    else setStatusJSON(status);
  }, []);

  if (statusJSON === null) {
    return <div>Loading...</div>; // Show loading until we know the statusJSON
  }
  const status = JSON.parse(statusJSON);
  return (
    <Card
      cards={status.cardList}
      repeat={status.repeat}
      count={status.totalCards}
      showedFront={status.isFront}
      correctA={status.correctAnswers}
      falseA={status.falseAnswers}
    />
  );
};
export default LearnContinuePage;
