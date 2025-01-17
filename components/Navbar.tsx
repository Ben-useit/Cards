import Link from 'next/link';
import SignOutLink from './SignOutLink';
import SignInLink from './SignInLink';
import Image from 'next/image';
import logo from '@/public/logo2.svg';
import Dropdown from './Dropdown';
import { LinkType } from '@/types';
import { SignedIn, SignedOut } from '@clerk/nextjs';

const links: LinkType[] = [
  { label: 'Load new', url: '/load' },
  { label: 'Stats', url: '/dashboard' },
  { label: 'About', url: '/about' },
];
const Navbar = async () => {
  return (
    <div>
      <nav className='grid grid-cols-[15%_60%_25%] border-b'>
        <div className=''>
          <Link href='/' title='Home'>
            <Image src={logo} alt='logo' className='pb-2' />
          </Link>
        </div>
        <SignedIn>
          <div className='mx-auto'>
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
            <Link
              href='/card/repeat'
              title='Repeat'
              className={`py-1 pb-1 ${linkStyle}`}
            >
              Repeat
            </Link>
          </div>
          <div>
            <div className='float-end'>
              <Dropdown links={links} className={`pb-1 ${linkStyle}`} />

              <button className={`pb-1 ${linkStyle}`}>
                <SignOutLink />
              </button>
            </div>
          </div>
        </SignedIn>
        <div className='col-span-2'>
          <SignedOut>
            <div className='float-end'>
              <Dropdown
                links={[{ label: 'About', url: '/about' }]}
                className={`pb-1 ${linkStyle}`}
              />
              <SignInLink className={`pb-1 ${linkStyle}`} />
            </div>
          </SignedOut>
        </div>
      </nav>
    </div>
  );
};
// return (
//   <div className='float-end'>
//     <SignInLink />
//   </div>
// );
//};
export default Navbar;

const linkStyle = 'px-3 rounded-md hover:bg-blueColor hover:text-white';
