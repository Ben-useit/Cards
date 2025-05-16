'use client';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/logo2.svg';
import Dropdown from './Dropdown';
import { LinkType } from '@/app/lib/types';
import { useAuthContext } from '@/context';
import { useEffect } from 'react';

const links: LinkType[] = [
  { label: 'Load new', url: '/options/load' },
  { label: 'Stats', url: '/options/stats' },
  { label: 'Select Language', url: '/options/select' },
  { label: 'Export Data', url: '/options/export' },
  { label: 'About', url: '/options/about' },
];

const Navbar = () => {
  const { user, currentPathname, setCurrentPathname } = useAuthContext();

  useEffect(() => {
    setCurrentPathname(window.location.pathname);
  }, []);

  return (
    <div>
      <nav className='grid grid-cols-[15%_65%_20%] border-b pb-2 mb-4'>
        <div>
          {currentPathname != '/' && (
            <Link href='/' title='Home' onClick={() => setCurrentPathname('/')}>
              <Image src={logo} alt='logo' />
            </Link>
          )}
        </div>
        {user ? (
          <div className='mx-auto '>
            <Link
              href='/card/create'
              title='Create'
              className={`py-1 ${linkStyle}`}
              onClick={() => setCurrentPathname('/card/create')}
            >
              New
            </Link>
            <Link
              href='/card/learn'
              title='Learn'
              className={`py-1 ${linkStyle}`}
              onClick={() => setCurrentPathname('/card/learn')}
            >
              Learn
            </Link>
            <Dropdown
              links={[
                { label: 'Repeat Words', url: '/card/repeat' },
                { label: 'Repeat Examples', url: '/card/repeat/examples' },
              ]}
              className={`pb-1 ${linkStyle}`}
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
                  <Link href='/about' className={`pb-1 ${linkStyle}`}>
                    About
                  </Link>
                  <Link
                    href='/login'
                    className={`pb-1 ${linkStyle} bg-green-600 ml-4`}
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
            <div className='hidden lg:inline'>{user?.username}</div>
            {user && (
              <Dropdown
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
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

const linkStyle = 'px-3 rounded-md hover:bg-blueColor hover:text-white';
