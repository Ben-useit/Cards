import { SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import { SlUser } from 'react-icons/sl';

const SignOutLink = () => {
  return (
    <>
      <SignOutButton>
        <Link href='/'>
          <SlUser className='inline' />
        </Link>
      </SignOutButton>
    </>
  );
};
export default SignOutLink;
