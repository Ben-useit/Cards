'use client';
import { getAllCards } from '@/utils/actions';
import { useState, useEffect } from 'react';
import { type Card } from '@/types';
import Loading from '@/components/Loading';
const ExportData = () => {
  const [cards, setCards] = useState<Card[]>();

  useEffect(() => {
    getAllCards().then((result) => {
      setCards(result);
    });
  }, []);

  if (!cards) return <Loading message={'preparing data ...'} />;

  const jsonList = JSON.stringify(cards);

  const handleDownload = () => {
    const blob = new Blob([jsonList], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cards.json'; // Desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up the URL
  };

  return (
    <button
      className='bg-blueColor px-2 py-1 rounded-md text-white'
      onClick={handleDownload}
    >
      Download
    </button>
  );
};
export default ExportData;
