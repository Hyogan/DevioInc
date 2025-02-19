'use client'
import { Inter, Space_Grotesk } from 'next/font/google';
import Navbar from './components/shared/Navbar';
import SmoothScroll from './components/SmoothScroll';
import './styles/globals.css';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';

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
      <body>
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
