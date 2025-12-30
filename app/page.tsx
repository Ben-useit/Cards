'use client';
import { useAppDispatch, useAppSelector } from '@/store';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { actionLogin } from '@/app/login/action';
import { showMe, signInUser } from '@/features/user/userSlice';
import Loading from '@/components/Loading';
import DashbordPage from './options/stats/page';

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleLogin = async (
    status: string | null | undefined,
    formData: FormData
  ) => {
    const user = await actionLogin(status, formData);
    if (typeof user === 'string') return user;
    dispatch(signInUser({ ...user }));
    user.activeLanguage = null;
    if (!user.activeLanguage) router.push('/options/select');
    else router.push('/');
  };

  const { user, isLoading } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(showMe());
  }, [dispatch]);

  useEffect(() => {
    // If the user is not logged in (i.e., no user ID), redirect to login page
    if (!isLoading && user === null) {
      router.push('/login');
    }
    if (!isLoading && user) router.push('/dashboard');
  }, [user, router]);

  const [status, formAction, pending] = useActionState(handleLogin, null);
  // const { userId } = await auth();
  // const { langId } = await getMetadata(userId);

  if (!user) {
    return <Loading message='Restore session ...' />;
  }

  return <></>;
}
