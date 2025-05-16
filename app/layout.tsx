import type { Metadata } from 'next';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/Navbar';
import { getSession } from './lib/session';
import AuthProvider from '@/context';

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
  return (
    <html lang='en'>
      <body className='mx-auto w-4/5 text-center mt-4'>
        <main className='mt-4'>
          <AuthProvider initialUser={session?.user}>
            <>
              <Navbar />
              {children}
            </>
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
