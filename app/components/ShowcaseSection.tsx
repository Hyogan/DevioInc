'use client'
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const ShowcaseSection = () => {
  const [activeDevice, setActiveDevice] = useState('phone');
  //Prevents multiple animations from triggering simultaneously
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const deviceVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? -30 : 30,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom ease
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? -30 : 30,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom ease
      }
    })
  };

  const phoneContent = {
    title: "Mobile Experience",
    description: "Devio provides a seamless mobile experience, allowing you to track and manage your digital wellbeing on the go. Get real-time insights and notifications to help you maintain a healthy relationship with technology.",
    features: [
      "Real-time screen time tracking",
      "Personalized usage insights",
      "Smart notification management",
      "Focus mode for productivity"
    ]
  };

  const laptopContent = {
    title: "Desktop Integration",
    description: "Devio's desktop experience offers comprehensive analytics and deeper insights into your digital habits. Visualize patterns, set goals, and integrate with your workflow for maximum productivity.",
    features: [
      "Detailed usage analytics",
      "Cross-device synchronization",
      "Custom productivity dashboards",
      "Integration with work tools"
    ]
  };

  const switchDevice = (newDevice: string) => {
    if (isAnimating || newDevice === activeDevice) return;
    
    setIsAnimating(true);
    setActiveDevice(newDevice);
    
    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  // Auto-rotate devices every 10 seconds
  useEffect(() => {
    const startRotationTimer = () => {
      timerRef.current = setTimeout(() => {
        switchDevice(activeDevice === 'phone' ? 'laptop' : 'phone');
      }, 10000);
    };

    startRotationTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [activeDevice, isAnimating]);

  // Reset timer when user manually switches
  const handleManualSwitch = (device: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    switchDevice(device);
  };

  // Add parallax effect on scroll
  useEffect(() => {
    if (!containerRef.current) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const elements = containerRef.current?.querySelectorAll('.parallax-element');
      
      elements?.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed') || '0.1');
        const yPos = scrollPosition * speed;
        gsap.to(el, {
          y: yPos,
          duration: 0.5,
          ease: 'power1.out'
        });
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-20 md:py-32 bg-[var(--primary)] relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Experience
            <span className="gradient-text"> Devio</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Intelligent screen time management for a balanced digital life.
            Take control of your digital wellbeing with AI-driven insights.
          </p>
        </motion.div>

        {/* Device display with overlaid content */}
        <div className="relative">
          {/* 3D Device Display with Content Overlay */}
          <div className="w-full h-[600px] sm:h-[700px] md:h-[800px] flex items-center justify-center relative mb-8">
            <AnimatePresence initial={false} custom={activeDevice === 'phone' ? 1 : -1}>
              {activeDevice === 'phone' ? (
                <motion.div
                  key="phone-model"
                  className="w-full h-full absolute flex items-center justify-center"
                  custom={1}
                  variants={deviceVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {/* Phone 3D Model - Adjusted container with responsive scaling */}
                  <div className="w-full h-full flex items-center justify-center">
                    {/* @ts-expect-ignore - Using custom element */}
                    <spline-viewer 
                      url="https://prod.spline.design/ajHtYmdcWyK8rhId/scene.splinecode" 
                      className="w-full h-full scale-100 sm:scale-110 md:scale-125 lg:scale-[1.3]"
                    ></spline-viewer>
                  </div>
                  
                  {/* Phone Content Overlay - Adjusted for better visibility on small screens */}
                  <motion.div 
                    className="absolute top-[40%] sm:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <div className="glass-card p-4 sm:p-6 md:p-8 mx-4 max-h-[300px] sm:max-h-none overflow-y-auto">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 gradient-text">{phoneContent.title}</h3>
                      <p className="text-[var(--text-secondary)] mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base">{phoneContent.description}</p>
                      <ul className="space-y-1 sm:space-y-2">
                        {phoneContent.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-xs sm:text-sm md:text-base">
                            <span className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] flex items-center justify-center mr-2 md:mr-3 text-xs">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="laptop-model"
                  className="w-full h-full absolute flex items-center justify-center"
                  custom={-1}
                  variants={deviceVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {/* Laptop 3D Model with responsive scaling */}
                  <div className="w-full h-full flex items-center justify-center">
                    {/* @ts-expect-ignore - Using custom element */}
                    <spline-viewer 
                      url="https://prod.spline.design/eW3EzTHP9ztVjw3J/scene.splinecode" 
                      className="w-full h-full scale-100 sm:scale-105 md:scale-110 lg:scale-115"
                    ></spline-viewer>
                  </div>
                  
                  {/* Laptop Content Overlay - Adjusted for better visibility on small screens */}
                  <motion.div 
                    className="absolute top-[40%] sm:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <div className="glass-card p-4 sm:p-6 md:p-8 mx-4 max-h-[300px] sm:max-h-none overflow-y-auto">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 gradient-text">{laptopContent.title}</h3>
                      <p className="text-[var(--text-secondary)] mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base">{laptopContent.description}</p>
                      <ul className="space-y-1 sm:space-y-2">
                        {laptopContent.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-xs sm:text-sm md:text-base">
                            <span className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] flex items-center justify-center mr-2 md:mr-3 text-xs">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Device Switcher - Positioned at the bottom center */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 glass-card p-2 rounded-full flex space-x-2 z-20">
              <button
                onClick={() => handleManualSwitch('phone')}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  activeDevice === 'phone' 
                    ? 'bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]' 
                    : 'hover:bg-[var(--text-secondary)] hover:bg-opacity-10'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12" y2="18" />
                </svg>
              </button>
              <button
                onClick={() => handleManualSwitch('laptop')}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  activeDevice === 'laptop' 
                    ? 'bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]' 
                    : 'hover:bg-[var(--text-secondary)] hover:bg-opacity-10'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="2" y1="20" x2="22" y2="20" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="parallax-element absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] opacity-10 blur-3xl" data-speed="0.05"></div>
          <div className="parallax-element absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] opacity-10 blur-3xl" data-speed="0.08"></div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
