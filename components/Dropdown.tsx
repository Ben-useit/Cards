'use client';
import { LinkType } from '@/types';
import Link from 'next/link';
import React, { useState } from 'react';
import { RiArrowDropDownFill } from 'react-icons/ri';

const Dropdown = ({
  links,
  className,
  label,
}: {
  links: LinkType[];
  className: string;
  label?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className='relative inline'>
      {/* Settings Icon */}

      <button onClick={toggleDropdown} className={className}>
        {label}
        <RiArrowDropDownFill className='inline ' />
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
                  onClick={closeDropdown}
                  key={link.label}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
