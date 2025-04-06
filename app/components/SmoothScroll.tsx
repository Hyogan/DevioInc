// 'use client'
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const smoothWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Basic smooth scroll behavior
    smoothWrapper.current?.style.setProperty('scroll-behavior', 'smooth');
    
    // Initialize ScrollTrigger
    // ScrollTrigger.defaults({
    //   markers: false, // Set to true for debugging
    //   scrub: 1,
    //   ease: 'power2.out'
    // });
    ScrollTrigger.defaults({
      markers: false, // Set to true for debugging
      scrub: 1,
     });
    // Refresh ScrollTrigger when the component mounts
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={smoothWrapper} 
      className="relative"
      style={{ 
        willChange: 'transform',
        isolation: 'isolate'
      }}
    >
      {children}
    </div>
  );
};

export default SmoothScroll; 
