import Link from 'next/link';
import SignOutLink from './SignOutLink';
import SignInLink from './SignInLink';
import Image from 'next/image';
import logo from '@/public/logo2.svg';
import Dropdown from './Dropdown';
import { LinkType } from '@/types';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { getMetadata } from '@/utils/metadata';

const links: LinkType[] = [
  { label: 'Load new', url: '/options/load' },
  { label: 'Stats', url: '/options/stats' },
  { label: 'Select Language', url: '/options/select' },
  { label: 'Export Data', url: '/options/export' },
  { label: 'About', url: '/options/about' },
];

const Navbar = async () => {
  const { userId } = await auth();
  const { label } = await getMetadata(userId);

  return (
    <div>
      <nav className='grid grid-cols-[15%_70%_15%] border-b'>
        <div>
          <Link href='/' title='Home'>
            <Image src={logo} alt='logo' className='pb-2' />
          </Link>
        </div>
        <SignedIn>
          <div className='mx-auto '>
            <Link
              href='/card/create'
              title='Create'
              className={`py-1 ${linkStyle}`}
            >
              New
            </Link>
            <Link
              href='/card/learn'
              title='Learn'
              className={`py-1 ${linkStyle}`}
            >
              Learn
            </Link>
            {/* <Link
              href='/card/repeat'
              title='Repeat'
              className={`py-1 pb-1 ${linkStyle}`}
            >
              Repeat
            </Link> */}
            <Dropdown
              links={[
                { label: 'Repeat Words', url: '/card/repeat' },
                { label: 'Repeat Examples', url: '/card/repeat/examples' },
              ]}
              className={`pb-1 ${linkStyle}`}
              label='Repeat'
            />
          </div>
          <div>
            <div className='float-end'>
              <div className='inline'>{label as string}</div>
              <Dropdown
                links={links}
                className={`pb-1 ${linkStyle}`}
                AuthButton={
                  <SignOutLink className='block px-4 py-2 text-gray-700 hover:bg-gray-100' />
                }
              />
            </div>
          </div>
        </SignedIn>
        <div className='col-span-2'>
          <SignedOut>
            <div className='float-end'>
              <Dropdown
                links={[{ label: 'About', url: '/about' }]}
                className={`pb-1 ${linkStyle}`}
                label='Settings'
              />
              <SignInLink className={`pb-1 ${linkStyle}`} />
            </div>
          </SignedOut>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

const linkStyle = 'px-3 rounded-md hover:bg-blueColor hover:text-white';
