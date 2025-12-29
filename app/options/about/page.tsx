import Image from 'next/image';
import logo from '@/public/logo2.svg';

const AboutPage = () => {
  return (
    <div className='flex flex-col items-center mt-10'>
      <Image src={logo} alt='logo' />
      <p>Version 0.6</p>
    </div>
  );
};
export default AboutPage;
