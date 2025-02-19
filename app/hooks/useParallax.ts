'use client'
import { useScroll, useTransform } from 'framer-motion';
import { RefObject } from 'react';

interface ParallaxOptions {
  offset?: [number, number];
  speed?: number;
  direction?: 'vertical' | 'horizontal';
}

export const useParallax = (
  ref: RefObject<HTMLElement>,
  options: ParallaxOptions = {}
) => {
  const {
    offset = ["start end", "end start"],
    speed = 1,
    direction = 'vertical'
  } = options;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset
  });

  const range = direction === 'vertical' ? [100 * speed, -100 * speed] : [50 * speed, -50 * speed];
  
  const transform = useTransform(scrollYProgress, [0, 1], range);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return {
    transform,
    opacity,
    scrollYProgress
  };
};

export const generateParallaxVariants = (delay: number = 0) => ({
  hidden: { 
    y: 50, 
    opacity: 0 
  },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.8,
      delay,
      ease: "easeOut"
    }
  }
});

export const containerVariants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

export const itemVariants = {
  hidden: { 
    y: 20, 
    opacity: 0 
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
}; 