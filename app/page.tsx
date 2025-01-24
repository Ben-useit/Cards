import LanguageForm from '@/components/LanguageForm';
import heroImage from '@/public/hero.svg';
import logo from '@/public/logo2.svg';
import { getMetadata } from '@/utils/metadata';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';

export default async function Home() {
  const { userId } = await auth();
  const { langId } = await getMetadata(userId);

  if (!userId || (userId && langId))
    return (
      <div>
        <Image src={logo} alt='logo' className='size-1/4' />
        <div className='pl-14 pt-2'>
          <p className='text-2xl '>Learning vocabulary made easy!!</p>
          <Image
            src={heroImage}
            alt='hero'
            className='size-[50%] pt-8 mx-auto'
          />
        </div>
      </div>
    );
  if (!langId) return <LanguageForm />;
}
