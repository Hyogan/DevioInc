'use client'
import { Inter, Space_Grotesk } from 'next/font/google';
import Navbar from './components/shared/Navbar';
import SmoothScroll from './components/SmoothScroll';
import './styles/globals.css';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'], 
  variable: '--font-space' 
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="icon" href="/devio.png" sizes="16x16" />
      </head>
      <body>
        <div className='fixed smooth-float text-gray-900  z-[999999999999999] right-4 sm:right-10 top-20 w-[180px]  bg-white  h-auto shadow-lg rounded-lg p-1 flex flex-col items-center space-y-3 border border-gray-200'>
          <h3 className='text-lg font-semibold text-primary text-gray-950'>$DVIO</h3>
          <p className='w-full flex flex-col items-start'>
            <Link href='/#token' className='w-full flex items-center justify-between  text-sm text-gray-600'>
              <img src="devio.png" className='w-[50px] h-[50px]'  alt="Logo devio" />
              <span>The Devio Currency</span>
            </Link>
            <a href='https://x.com/devioinc' target='_blank' rel='noopener noreferrer' 
              className='w-full flex items-center justify-start text-blue-500 hover:underline text-sm'>
              {/* <img src="x-logo.png" className='w-[50px] h-[50px]'  alt="" /> */}
              <img src="logo-x.jpg" className='w-[40px] h-[40px]'  alt="Logo X" />
              <span className='font-bold'>Join us on X</span>
            </a>
          </p>
        </div>

        <ThemeProvider>
          <SmoothScroll>
            <Navbar />
            {children}
            <Footer />
          </SmoothScroll>
          </ThemeProvider>
      </body>
    </html>
  );
}
