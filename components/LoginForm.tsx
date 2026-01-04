'use client';
import { useActionState } from 'react';
import { actionLogin } from '@/actions/login';
import { useRouter } from 'next/navigation';
import heroImage from '@/public/hero.svg';
import Image from 'next/image';
import { SubmitButton } from './controls/buttons';
import InputField from './controls/inputs';

const LoginForm = () => {
  const router = useRouter();
  const handleLogin = async (
    status: string | null | undefined,
    formData: FormData
  ) => {
    const user = await actionLogin(status, formData);
    if (typeof user === 'string') return user;
    if (!user.activeLanguage) router.push('/options/select');
    else router.push('/');
  };
  const [status, formAction, pending] = useActionState(handleLogin, null);

  return (
    <div className='relative min-h-screen'>
      <div className='pl-14 pt-2'>
        <Image
          src={heroImage}
          alt='hero'
          layout='fill'
          quality={75}
          className='size-[50%] pt-8 mx-auto z-0'
        />
      </div>
      <div className='relative '>
        <p className='text-xl sm:text-3xl z-10 m-16 sm:m-10 '>
          Learning vocabulary made easy!!
        </p>
      </div>

      {/* Content */}
      <div className='relative z-20 flex items-center justify-center h-full'>
        <div className='flex flex-col md:flex-row w-full max-w-7xl px-6'>
          {/* Left Text */}
          <div className='flex-1 flex items-center justify-center mb-10 mt-10 md:mb-5'></div>

          {/* Login Form */}
          <div className='flex-1 flex items-center justify-center ml-24 mt-50'>
            <form
              action={formAction}
              className='bg-gray-600 bg-opacity2-30 backdrop-blur-md p-8 rounded-lg shadow-md w-full max-w-sm space-y-4'
            >
              {status && <div className='text-red-400'>{status}</div>}
              <InputField name='username' placeholder='Username' />
              <InputField
                name='password'
                placeholder='Password'
                type='password'
              />
              <SubmitButton isPending={pending} label='Sign In' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
