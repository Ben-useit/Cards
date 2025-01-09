import type { Metadata } from 'next';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/Navbar';
import { ClerkProvider } from '@clerk/nextjs';
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: 'Cards',
  description: 'Learn vocables with ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <main className='max-w-3xl mx-auto py-3'>
          <ClerkProvider>
            <div className='mx-auto min-w-96 max-w-6xl xl:max-w-7xl px-6'>
              <Navbar />
              <ToastContainer />
              <div className='flex flex-col sm:flex-row  justify-center items-center flex-wrap gap-4 py-8'>
                {children}
              </div>
            </div>
          </ClerkProvider>
        </main>
      </body>
    </html>
  );
}
