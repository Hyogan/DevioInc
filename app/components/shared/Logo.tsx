'use client'
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  animate?: boolean;
}

const Logo = ({ className = '', animate = true }: LogoProps) => {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animate && logoRef.current) {
      gsap.to(logoRef.current, {
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }
  }, [animate]);

  return (
    <div ref={logoRef} className={`logo-container ${className}`}>
      <Image
        src="/devio-bg.png"
        alt="Devio Logo"
        width={50}
        height={50}
        className="logo-image"
      />
    </div>
  );
};

export default Logo; 