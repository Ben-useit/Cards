import heroImage from '@/public/hero.svg';
import logo from '@/public/logo2.svg';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import DashbordPage from './dashboard/page';

export default async function Home() {
  const { userId } = await auth();

  if (!userId)
    return (
      <div>
        <Image src={logo} alt='logo' className='size-1/4' />
        <div className='pl-14 pt-2'>
          <p className='text-2xl '>Learning vocabulary made easy!!</p>
          <Image src={heroImage} alt='hero' className='size-auto pt-8' />
        </div>
      </div>
    );
  return <DashbordPage />;
}
