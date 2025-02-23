'use client'
import { Inter, Space_Grotesk } from 'next/font/google';
import Navbar from './components/shared/Navbar';
import SmoothScroll from './components/SmoothScroll';
import './styles/globals.css';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import Notif from './components/shared/Notif';

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
        <div className='fixed p-2 smooth-float text-gray-900 opacity-80 z-[99] right-4 sm:right-10 top-20 bg-white  h-auto shadow-lg rounded-lg flex flex-col items-center space-y-3 border border-gray-200'>
          <Notif />
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
