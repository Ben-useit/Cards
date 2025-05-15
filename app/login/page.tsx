'use client';
import { useActionState } from 'react';
import { actionLogin } from './action';
import { useRouter } from 'next/navigation';
import heroImage from '@/public/hero.svg';
import Image from 'next/image';
import Loading from '@/components/Loading';
import { useAuthContext } from '@/context';

const LoginPage = () => {
  const { setUser } = useAuthContext();
  const router = useRouter();
  const handleLogin = async (
    status: string | null | undefined,
    formData: FormData
  ) => {
    const result = await actionLogin(status, formData);
    if (typeof result === 'string') return result;
    setUser(result);
    router.push('/');
  };
  const [status, formAction, pending] = useActionState(handleLogin, null);
  if (pending) return <Loading message='Try to sign in ...' />;
  return (
    <div className='relative min-h-screen'>
      <div className='pl-14 pt-2'>
        <Image
          src={heroImage}
          alt='hero'
          layout='fill'
          quality={100}
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
          <div className='flex-1 flex items-center justify-center ml-24 mt-[200px]'>
            <form
              action={formAction}
              className='bg-[#c0bcff] bg-opacity-30 backdrop-blur-md p-8 rounded-lg shadow-md w-full max-w-sm space-y-4'
            >
              {status && <div className='text-[#6c63ff]'>{status}</div>}
              <input
                type='text'
                placeholder='Username'
                name='username'
                className='w-full px-4 py-2 rounded bg-white bg-opacity-70 focus:outline-none'
              />
              <input
                type='password'
                placeholder='Password'
                name='password'
                className='w-full px-4 py-2 rounded bg-white bg-opacity-70 focus:outline-none'
              />
              <button
                type='submit'
                disabled={pending}
                className='w-full py-2 bg-white text-black font-semibold rounded opacity-80 hover:opacity-100'
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
