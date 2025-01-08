import Link from 'next/link';
import SignOutLink from './SignOutLink';
import { SlSettings } from 'react-icons/sl';
import { auth } from '@clerk/nextjs/server';
import SignInLink from './SignInLink';
import Image from 'next/image';
import logo from '@/public/logo2.svg';
const Navbar = async () => {
  const { userId } = await auth();
  if (userId) {
    return (
      <nav className='grid grid-cols-[15%_70%_15%] border-b'>
        <div>
          <Link href='/' title='Home'>
            <Image src={logo} alt='logo' className='h-4' />
          </Link>
        </div>
        <div className='mx-auto px-2'>
          <Link
            href='/create'
            title='Create'
            className='px-3 rounded-md text-xs  hover:bg-blueColor hover:text-white'
          >
            New
          </Link>
          <Link
            href='/learn'
            title='Learn'
            className='px-3 rounded-md text-xs hover:bg-blueColor hover:text-white'
          >
            Learn
          </Link>
          <Link
            href='/repeat'
            title='Repeat'
            className='px-3 rounded-md text-xs hover:bg-blueColor hover:text-white'
          >
            Repeat
          </Link>
        </div>
        <div>
          <div className='float-end'>
            <Link href='/settings' title='Settings'>
              <SlSettings className='inline size-3' />
            </Link>

            <SignOutLink />
          </div>
        </div>
      </nav>
    );
  }
  return (
    <div className='float-end'>
      <SignInLink />
    </div>
  );
};
export default Navbar;
