import Link from 'next/link';
import SignInLink from './SignInLink';
import Image from 'next/image';
import logo from '@/public/logo2.svg';

const Navbar = async () => {
  return (
    <div>
      <nav className='grid grid-cols-[15%_70%_15%] border-b'>
        <div>
          <Link href='/' title='Home'>
            <Image src={logo} alt='logo' className='pb-2' />
          </Link>
        </div>
        <div className='col-span-2'>
          <div className='float-end'>
            <Link href='/options/about' className={`pb-1 ${linkStyle}`}>
              About
            </Link>
            <SignInLink className={`pb-1 ${linkStyle}`} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

const linkStyle = 'px-3 rounded-md hover:bg-blueColor hover:text-white';
