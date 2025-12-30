'use client';
import { Language, LinkType, User } from '@/app/lib/types';
import { Languages } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { RiArrowDropDownFill } from 'react-icons/ri';
import { SlOptionsVertical } from 'react-icons/sl';

const Dropdown = ({
  user,
  activeLanguage,
  username,
  links,
  className,
  label,
  icon,
  AuthButton,
}: {
  user?: User;
  activeLanguage?: Language | null;
  username?: string;
  links: LinkType[];
  className: string;
  label?: string;
  icon?: any;
  AuthButton?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative inline z-50'>
      {/* Settings Icon */}

      <button
        onClick={toggleDropdown}
        className={`cursor-pointer ${className}`}
      >
        {icon ? (
          icon
        ) : label ? (
          <>
            {label}
            <RiArrowDropDownFill className='inline ' />
          </>
        ) : (
          <SlOptionsVertical className='inline ' />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg text-left p-4'>
          {username && (
            <>
              <div className='block py-2 text-gray-700 font-semibold'>
                {username}
              </div>
              <div className='block group w-full  hover:bg-blue-600 transition-colors duration-200'>
                <div>
                  <Languages className='inline' />
                  <Link
                    href='/options/select'
                    className='px-4 py-2 group hover:text-white ransition-colors duration-200'
                    onClick={() => {
                      //dispatch(setPath({ payload: link.url })); // setCurrentPathname(link.url);
                      setIsOpen(false);
                    }}
                  >
                    Set Language
                  </Link>
                </div>
              </div>
            </>
          )}

          <div className=''>
            {links.map((link) => {
              return (
                <div className='block group w-full  hover:bg-blue-600 transition-colors duration-200'>
                  {link.icon}
                  <Link
                    href={link.url}
                    className='inline px-4 py-2 group-hover:text-white transition-colors duration-200'
                    onClick={() => {
                      //dispatch(setPath({ payload: link.url })); // setCurrentPathname(link.url);
                      setIsOpen(false);
                    }}
                    key={link.label}
                  >
                    {link.label}
                  </Link>
                </div>
              );
            })}

            {AuthButton && AuthButton}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
