import Link from 'next/link';
import SignOutLink from './SignOutLink';
import { auth } from '@clerk/nextjs/server';
import SignInLink from './SignInLink';
import Image from 'next/image';
import logo from '@/public/logo2.svg';
import Dropdown from './Dropdown';
import { LinkType } from '@/types';

const links: LinkType[] = [
  { label: 'Load new', url: '/load' },
  { label: 'Stats', url: '/dashboard' },
  { label: 'About', url: '/about' },
];
const Navbar = async () => {
  const { userId } = await auth();

  if (userId) {
    return (
      <nav className='grid grid-cols-[15%_70%_15%] border-b'>
        <div className='m-1'>
          <Link href='/' title='Home'>
            <Image src={logo} alt='logo' className='h-4' />
          </Link>
        </div>
        <div className='mx-auto px-2'>
          <Link
            href='/card/create'
            title='Create'
            className='px-3 rounded-md text-lg  hover:bg-blueColor hover:text-white'
          >
            New
          </Link>
          <Link
            href='/card/learn'
            title='Learn'
            className='px-3 rounded-md text-lg hover:bg-blueColor hover:text-white'
          >
            Learn
          </Link>
          <Link
            href='/card/repeat'
            title='Repeat'
            className='px-3 rounded-md text-lg hover:bg-blueColor hover:text-white'
          >
            Repeat
          </Link>
        </div>
        <div>
          <div className='float-end'>
            {/* <Link href='/about' title='Settings'>
              <SlSettings className='inline size-3' />
            </Link> */}
            <Dropdown links={links} />

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
