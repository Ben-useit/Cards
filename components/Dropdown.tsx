'use client';
import { LinkType } from '@/app/lib/types';
import { useAuthContext } from '@/context';
import Link from 'next/link';
import React, { useState } from 'react';
import { RiArrowDropDownFill } from 'react-icons/ri';
import { SlOptionsVertical } from 'react-icons/sl';

const Dropdown = ({
  links,
  className,
  label,
  AuthButton,
}: {
  links: LinkType[];
  className: string;
  label?: string;
  AuthButton?: React.ReactNode;
}) => {
  const { setCurrentPathname } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative inline'>
      {/* Settings Icon */}

      <button onClick={toggleDropdown} className={className}>
        {label ? (
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
        <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg text-left'>
          <div className='py-2'>
            {links.map((link) => {
              return (
                <Link
                  href={link.url}
                  className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
                  onClick={() => {
                    setCurrentPathname(link.url);
                    setIsOpen(false);
                  }}
                  key={link.label}
                >
                  {link.label}
                </Link>
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
