'use client';
import { User } from '@/app/lib/types';
import { createContext, useContext, useState, useEffect } from 'react';

type ContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  currentPathname: string;
  setCurrentPathname: (path: string) => void;
};

const AuthContext = createContext<ContextType | undefined>(undefined);

const AuthProvider = ({
  children,
  initialUser = null,
}: {
  children: React.ReactNode;
  initialUser?: User | null;
}) => {
  const [user, setUser] = useState<User | null>(initialUser);
  const [currentPathname, setCurrentPathname] = useState<string>('/');

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        currentPathname,
        setCurrentPathname,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('Error: Called outside a context!');
  return context;
};
export default AuthProvider;
