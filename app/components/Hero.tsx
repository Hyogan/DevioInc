'use client'
import React, { useRef } from 'react'
import { motion } from 'framer-motion';
import { ParallaxBackground, ParallaxGradientText } from './shared/ParallaxBackground';
import ParallaxWrapper from './shared/ParallaxWrapper';
import { containerVariants, itemVariants, useParallax } from '../hooks/useParallax';
// import { useSmoothScroll } from '../hooks/useSmoothScroll';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ParticleEarth from './ParticleEarth';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const { transform, opacity } = useParallax(heroRef, { speed: 0.5 });
  // const { scrollToSection } = useSmoothScroll();
  const router = useRouter();

  const moveToJoin = () => {
    router.push('/join-us');
  };

  return (
    <section 
      ref={heroRef}
      className="min-h-screen -mt-10 relative overflow-hidden bg-[var(--primary)] flex items-center justify-center"
    >
      {/* 3D Scene Background */}
      <div 
        ref={sceneRef} 
        className="absolute inset-0 -z-10"
        aria-hidden="true"
      />
      
      {/* Parallax Background Elements */}
      <ParallaxBackground 
        speed={0.3}
        gradientStart="rgba(0, 255, 148, 0.15)"
        gradientEnd="rgba(0, 184, 255, 0.15)"
      />

      {/* Main Content */}
      <motion.div  
        id='main-content'
        className="container mx-auto px-6 pt-32 sm:pt-0 relative z-10"
        style={{ y: transform, opacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            className="max-w-4xl order-2 lg:order-1"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold leading-tight mb-6"
              variants={itemVariants}
            >
              <ParallaxGradientText speed={0.6} className="block">
                Devio: Reclaim
              </ParallaxGradientText>
              <ParallaxGradientText speed={0.7} className="block">
                Your Time.
              </ParallaxGradientText>
              <ParallaxGradientText speed={0.8} className="block">
                Reconnect with Life.
              </ParallaxGradientText>
            </motion.h1>

            <ParallaxWrapper speed={0.4}>
              <motion.p 
                className="text-xl md:text-2xl text-[var(--text-secondary)] mb-6 max-w-2xl"
                variants={itemVariants}
              >
                Intelligent screen time management for a balanced digital life.
                Take control of your digital wellbeing with AI-driven insights.
              </motion.p>

              <motion.div 
                className="flex gap-6"
                variants={itemVariants}
              >
                <motion.button 
                  onClick={()=> moveToJoin()}
                  className="primary-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Now
                </motion.button>
                <motion.button 
                  className="rounded-full border border-white/20 hover:border-white/40 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link className='px-6 py-3 w-full h-full' href='/news'>Learn More</Link>
                </motion.button>
              </motion.div>
            </ParallaxWrapper>
          </motion.div>

          {/* Particle Earth Container */}
          <motion.div 
            className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Modern border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] rounded-[2.5rem] opacity-20 blur-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] rounded-[2.5rem] opacity-10"></div>
            <div className="absolute inset-[2px] bg-[var(--primary)] rounded-[2.5rem]"></div>
            
            {/* Canvas container */}
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
              <div className="absolute inset-0 bg-[rgba(255,255,255,0.02)]"></div>
              <ParticleEarth />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Background gradient blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="parallax-element absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] opacity-10 blur-3xl" data-speed="0.05"></div>
        <div className="parallax-element absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] opacity-10 blur-3xl" data-speed="0.08"></div>
      </div>
    </section>
  );
};

export default Hero;
