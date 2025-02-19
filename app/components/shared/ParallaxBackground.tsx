'use client'
import { motion } from 'framer-motion';
import { useParallax } from '../../hooks/useParallax';
import { useRef } from 'react';

interface ParallaxBackgroundProps {
  className?: string;
  gradientStart?: string;
  gradientEnd?: string;
  speed?: number;
}

export const ParallaxBackground = ({
  className = '',
  gradientStart = 'var(--gradient-start)',
  gradientEnd = 'var(--gradient-end)',
  speed = 1
}: ParallaxBackgroundProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { transform } = useParallax(ref, { speed });

  return (
    <motion.div
      ref={ref}
      className={`absolute inset-0 opacity-20 ${className}`}
      style={{ y: transform }}
    >
      <div 
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full filter blur-3xl"
        style={{
          background: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`
        }}
      />
      <div 
        className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full filter blur-3xl"
        style={{
          background: `linear-gradient(to right, ${gradientEnd}, ${gradientStart})`
        }}
      />
    </motion.div>
  );
};

export const ParallaxGradientText = ({
  children,
  className = '',
  speed = 1
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const { transform } = useParallax(ref, { speed });

  return (
    <motion.span
      ref={ref}
      className={`gradient-text ${className}`}
      style={{ y: transform }}
    >
      {children}
    </motion.span>
  );
}; 