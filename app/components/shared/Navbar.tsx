'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
// import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import ThemeSwitcher from './ThemeSwitcher';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const { scrollToSection } = useSmoothScroll();

  const navItems = [
    { label: 'Features', href: '#features' },
    // { label: 'Ecosystem', href: '#ecosystem' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Token', href: '#token' },
    { label: 'News', href: 'news' },
    { label: 'Pricing', href: '#pricing' },
    // { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    
    if (element) {
      // Close mobile menu
      setIsMobileMenuOpen(false);
      
      // Small delay to allow menu closing animation
      setTimeout(() => {
        // Scroll to section
        element.scrollIntoView({ behavior: 'smooth' });
        
        // Optional: Adjust scroll position to account for fixed header
        const headerOffset = 80; // Adjust this value based on your header height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 300);
    }
  };

  // const menuVariants = {
  //   closed: {
  //     opacity: 0,
  //     scale: 0.95,
  //     transition: {
  //       duration: 0.2
  //     }
  //   },
  //   open: {
  //     opacity: 1,
  //     scale: 1,
  //     transition: {
  //       duration: 0.2,
  //       staggerChildren: 0.1,
  //       delayChildren: 0.2
  //     }
  //   }
  // };

  // const itemVariants = {
  //   closed: { x: -20, opacity: 0 },
  //   open: { x: 0, opacity: 1 }
  // };

  return (
    <div className="sticky top-0 left-0 right-0 z-[9999]">
      <nav 
        className={`w-full transition-all duration-300 ${
          isScrolled ? 'bg-[rgb(var(--background-primary))/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold gradient-text">
              Devio
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  href={item.href}
                  key={item.href}
                  // onClick={() => scrollToSection(item.href)}
                  className="text-secondary hover:text-primary nav-link transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <ThemeSwitcher />
              <motion.button
                className="primary-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                backgroundColor: 'rgb(var(--background-primary))',
                backdropFilter: 'blur(12px)',
              }}
              className="md:hidden absolute top-full left-0 right-0 shadow-lg border-t border-[rgb(var(--card-border))]"
            >
              <div className="container mx-auto px-6 py-4">
                <div className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className="text-secondary hover:text-primary transition-colors py-2 text-left"
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="flex items-center gap-4 pt-4 border-t border-[rgb(var(--card-border))]">
                    <ThemeSwitcher />
                    <motion.button
                      className="primary-button w-full"
                      whileTap={{ scale: 0.95 }}
                    >
                      Get Started
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;