'use client';

import { Provider } from 'react-redux';
import { AppStore, makeStore, store } from '@/store';
import { useRef } from 'react';
import { User } from './lib/types';
import { signInUser } from '@/features/user/userSlice';

export function Providers({
  initialUser,
  children,
}: {
  initialUser: User | null;
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    if (initialUser) {
      storeRef.current.dispatch(signInUser(initialUser));
    }
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
