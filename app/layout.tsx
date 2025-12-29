import type { Metadata } from 'next';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/Navbar';
import { getSession } from './lib/session';
//import AuthProvider from '@/context';
import { Providers } from './providers';
import { User } from './lib/types';
export const metadata: Metadata = {
  title: 'Cards',
  description: 'Learn vocables with ease.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  let initialUserData = null;
  if (session) {
    initialUserData = session.user;
  }
  return (
    <html lang='en'>
      <body className='mx-auto w-4/5 text-center mt-4'>
        <main className='mt-4'>
          {/* <AuthProvider initialUser={session?.user}> */}
          <>
            <Providers initialUser={initialUserData}>
              <Navbar />
              {children}
            </Providers>
          </>
          {/* </AuthProvider> */}
        </main>
      </body>
    </html>
  );
}
