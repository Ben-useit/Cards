import type { Metadata } from 'next';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/Navbar';
import { ClerkProvider } from '@clerk/nextjs';

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
      <body className='mx-auto w-4/5 text-center mt-4'>
        <ClerkProvider>
          <Navbar />
          <main className='mt-4'>{children}</main>
        </ClerkProvider>
      </body>
    </html>
  );
}
