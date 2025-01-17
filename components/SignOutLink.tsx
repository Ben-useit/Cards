import { SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';

const SignOutLink = ({ className }: { className?: string }) => {
  return (
    <>
      <SignOutButton>
        <Link href='/' className={className}>
          {/* <SlUser className='inline' /> */}
          Sign Out
        </Link>
      </SignOutButton>
    </>
  );
};
export default SignOutLink;
