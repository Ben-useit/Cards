'use client';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/logo2.svg';
import Dropdown from './Dropdown';
import { LinkType } from '@/app/lib/types';
import { useAuthContext } from '@/context';
import { useEffect } from 'react';
import { getFlags } from '@/utils/flags';

const links: LinkType[] = [
  { label: 'Load new', url: '/options/load' },
  { label: 'Stats', url: '/options/stats' },
  { label: 'Export Data', url: '/options/export' },
  { label: 'About', url: '/options/about' },
];

const Navbar = () => {
  const { user, currentPathname, setCurrentPathname } = useAuthContext();

  const flagCode = [];
  flagCode[0] = user?.activeLanguage?.firstLanguage?.slice(0, 2) || '';
  flagCode[1] = user?.activeLanguage?.secondLanguage?.slice(0, 2) || '';

  useEffect(() => {
    setCurrentPathname(window.location.pathname);
  }, []);

  const flags = getFlags(user, '25px');

  return (
    <div>
      <nav className='grid grid-cols-[15%_55%_30%] border-b pb-2 mb-4'>
        <div>
          {currentPathname != '/' && (
            <Link href='/' title='Home' onClick={() => setCurrentPathname('/')}>
              <Image src={logo} alt='logo' />
            </Link>
          )}
          <div className='text-blueColor'>Hier</div>
        </div>
        {user ? (
          <div className='mx-auto '>
            <Link
              href='/card/create'
              title='Create'
              className={`py-3 ${linkStyle}`}
              onClick={() => setCurrentPathname('/card/create')}
            >
              New
            </Link>
            <Link
              href='/card/learn'
              title='Learn'
              className={`py-3 ${linkStyle}`}
              onClick={() => setCurrentPathname('/card/learn')}
            >
              Learn
            </Link>
            <Dropdown
              links={[
                { label: 'Repeat Words', url: '/card/repeat' },
                { label: 'Repeat Examples', url: '/card/repeat/examples' },
              ]}
              className={`py-3 ${linkStyle}`}
              label='Repeat'
            />
          </div>
        ) : (
          <div className='mx-auto '></div>
        )}

        <div>
          <div className='float-end'>
            <div className='inline '>
              {!user && (
                <>
                  <Link href='/about' className={` py-3 ${linkStyle}`}>
                    About
                  </Link>
                  <Link
                    href='/login'
                    className={` ${linkStyle} bg-green-600 ml-4 py-3`}
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
            {user && (
              <>
                <div className='hidden lg:inline'>{user?.username}</div>
                <div className='hidden lg:inline lg:pl-4 pr-2'>
                  <Link href='/options/select'>
                    {flags[0]}
                    {flags[1]}
                  </Link>
                </div>
              </>
            )}

            {user && (
              <>
                <Dropdown
                  user={user}
                  links={links}
                  className={`pb-1 ${linkStyle}`}
                  AuthButton={
                    <button
                      className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
                      onClick={async () => {
                        await fetch('/api/logout', { method: 'POST' });
                        location.reload();
                      }}
                    >
                      Logout
                    </button>
                  }
                />
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

const linkStyle = 'px-3 rounded-md hover:bg-blueColor hover:text-white';
