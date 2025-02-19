'use client'
import { ReactNode, useRef } from 'react';
import { motion } from 'framer-motion';
import { useParallax } from '../../hooks/useParallax';

interface ParallaxWrapperProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'vertical' | 'horizontal';
}

const ParallaxWrapper = ({
  children,
  className = '',
  speed = 1,
  direction = 'vertical'
}: ParallaxWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { transform, opacity } = useParallax(ref, { speed, direction });

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        [direction === 'vertical' ? 'y' : 'x']: transform,
        opacity
      }}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxWrapper; 