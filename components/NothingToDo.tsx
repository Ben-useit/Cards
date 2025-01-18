import complete from '@/public/complete.svg';
import Image from 'next/image';
const NothingToDo = () => {
  return (
    <div>
      <Image src={complete} alt='complete' className='mx-auto' />
      <h2 className='mt-4 text-2xl font-bold'>NothingTo Do!</h2>
    </div>
  );
};
export default NothingToDo;
