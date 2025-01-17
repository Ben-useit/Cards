import { SignInButton } from '@clerk/nextjs';

const SignInLink = ({ className }: { className: string }) => {
  return (
    <div className={`inline ${className}`}>
      <SignInButton />
    </div>
  );
};
export default SignInLink;
