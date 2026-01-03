'use client';
import {
  BookCheck,
  BookCopy,
  BookOpen,
  ChartNoAxesCombined,
  CircleQuestionMark,
  Download,
  FilePlusCorner,
  FolderUp,
  Grip,
  LogOut,
  Repeat2,
  Upload,
} from 'lucide-react';
import Link from 'next/link';
import logo from '@/public/logo2.svg';
import Image from 'next/image';
import Flag from 'react-world-flags';
import { useAppSelector } from '@/store';
import Dropdown from './Dropdown';
import { LinkType } from '@/components/Dropdown';

const links: LinkType[] = [
  {
    icon: <Upload className='inline' />,
    label: 'Load new',
    url: '/options/load',
  },
  {
    icon: <ChartNoAxesCombined className='inline' />,
    label: 'Stats',
    url: '/options/stats',
  },
  {
    icon: <Download className='inline' />,
    label: 'Export Data',
    url: '/options/export',
  },
  {
    icon: <CircleQuestionMark className='inline' />,
    label: 'About',
    url: '/options/about',
  },
];

const Navbar = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <>
      <nav className='flex justify-between'>
        <div className='flex items-center'>
          <Link href={'/'}>
            <Image src={logo} alt='Cards Logo' />
          </Link>
        </div>
        {/* {user ? (
          <div className='flex items-center gap-0.5 sm:gap-2'>
            <Link href='/card/create' className='group'>
              <div className='shadow-md hover:shadow-lg group-hover:text-white group-hover:bg-blue-600 transition-colors duration-200 p-0.5 sm:p-2 border border-white group-hover:border rounded-md '>
                <FilePlusCorner className='inline' />
              </div>
            </Link>
            <Link href='/card/learn' className='group'>
              <div className='shadow-md hover:shadow-lg group-hover:text-white group-hover:bg-blue-600 transition-colors duration-200 p-0.5 sm:p-2 border border-white group-hover:border rounded-md '>
                <BookCopy className='inline' />
              </div>
            </Link>
            <Dropdown
              links={[
                {
                  icon: <BookCheck className='inline' />,
                  label: 'Words',
                  url: '/card/repeat',
                },
                {
                  icon: <BookOpen className='inline' />,
                  label: 'Examples',
                  url: '/card/repeat/examples',
                },
              ]}
              className={`shadow-md hover:shadow-lg hover:text-white hover:bg-blue-600 transition-colors duration-200 p-0.5 sm:p-2 border border-white group-hover:border rounded-md `}
              label='Repeat'
              icon={<Repeat2 className='inline' />}
            />
          </div>
        ) : (
          <div></div>
        )} */}

        <div className='flex justify-end items-center w-k40 gap-2 '>
          {/* <div className='sm:flex  items-center hidden'>
            <Flag
              code={user?.activeLanguage?.firstLanguage}
              style={{
                height: '24px',
                display: 'inline',
                padding: '0 5px 0 0',
              }}
            />

            <Flag
              code={user?.activeLanguage?.secondLanguage}
              style={{ height: '24px', display: 'inline' }}
            />
          </div> */}
          {user ? (
            <div className='flex items-center gap-0.5 sm:gap-2'>
              <Link href='/card/create' className='group'>
                <div className='shadow-md hover:shadow-lg group-hover:text-white group-hover:bg-blue-600 transition-colors duration-200 p-0.5 sm:p-2 border border-white group-hover:border rounded-md '>
                  <FilePlusCorner className='inline' />
                </div>
              </Link>
              <Link href='/card/learn' className='group'>
                <div className='shadow-md hover:shadow-lg group-hover:text-white group-hover:bg-blue-600 transition-colors duration-200 p-0.5 sm:p-2 border border-white group-hover:border rounded-md '>
                  <BookCopy className='inline' />
                </div>
              </Link>
              <Dropdown
                links={[
                  {
                    icon: <BookCheck className='inline' />,
                    label: 'Words',
                    url: '/card/repeat',
                  },
                  {
                    icon: <BookOpen className='inline' />,
                    label: 'Examples',
                    url: '/card/repeat/examples',
                  },
                ]}
                className={`shadow-md hover:shadow-lg hover:text-white hover:bg-blue-600 transition-colors duration-200 p-0.5 sm:p-2 border border-white group-hover:border rounded-md `}
                label='Repeat'
                icon={<Repeat2 className='inline' />}
              />
            </div>
          ) : (
            <div></div>
          )}

          {user && (
            <>
              <Dropdown
                //activeLanguage={user.activeLanguage}
                username={user.username}
                links={links}
                className={`shadow-md hover:shadow-lg hover:text-white hover:bg-blue-600 transition-colors duration-200 p-0.5 sm:p-2 border border-white group-hover:border rounded-md `}
                icon={<Grip className='inline' />}
                AuthButton={
                  <>
                    <div className='border-b my-1.5'></div>
                    <div className=' group w-full  hover:bg-red-600 transition-colors duration-200'>
                      <LogOut className='inline' />
                      <button
                        className='inline px-4 cursor-pointer  text-gray-900 group-hover:text-white transition-colors duration-200'
                        onClick={async () => {
                          await fetch('/api/logout', { method: 'POST' });
                          location.reload();
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  </>
                }
              />
            </>
          )}
        </div>
      </nav>
    </>
  );
};
export default Navbar;
