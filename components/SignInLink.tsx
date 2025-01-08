import { SignInButton } from '@clerk/nextjs';

const SignInLink = () => {
  return (
    <div>
      <SignInButton>
        <button className='text-xl text-white px-4 py-2 rounded-md bg-blueColor'>
          Login
        </button>
      </SignInButton>
    </div>
  );
};
export default SignInLink;
