'use client'
import '../styles/hero.css';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion } from 'framer-motion';
import { ParallaxBackground, ParallaxGradientText } from './shared/ParallaxBackground';
import ParallaxWrapper from './shared/ParallaxWrapper';
import { containerVariants, itemVariants, useParallax } from '../hooks/useParallax';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const progressWheelRef = useRef(null);
  const logoRef = useRef(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { transform, opacity } = useParallax(heroRef, { speed: 0.5 });
  const { scrollToSection } = useSmoothScroll();
  const router = useRouter();

  const moveToJoin = () => {
    router.push('/join-us');
  };
  
  useEffect(() => {
    if (!sceneRef.current) return;


    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    rendererRef.current = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    sceneRef.current.innerHTML = '';
    sceneRef.current.appendChild(rendererRef.current.domElement);

    // Particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;

      colors[i] = Math.random();
      colors[i + 1] = 0.8 + Math.random() * 0.2;
      colors[i + 2] = Math.random() * 0.5;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(colors, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    // Animation
    const animate = () => {
      if (!rendererRef.current) return;

      requestAnimationFrame(animate);
      particleSystem.rotation.y += 0.0005;
      particleSystem.rotation.x += 0.0002;

      const time = Date.now() * 0.001;
      const positions = particlesGeometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + positions[i] * 0.5) * 0.001;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      rendererRef.current.render(scene, camera);
    };

    animate();

    // Text animations
    gsap.from('.hero-title span', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power4.out',
    });

    gsap.from('.hero-subtitle', {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: 'power3.out',
    });

    // Handle resize
    const handleResize = () => {
      if (!rendererRef.current) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Logo pulsating animation
    gsap.to(logoRef.current, {
      scale: 1.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Progress wheel animation
    gsap.to(progressWheelRef.current, {
      scrollTrigger: {
        trigger: progressWheelRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
      rotate: 360,
      strokeDashoffset: 0,
      duration: 1.5,
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      scene.remove(particleSystem);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="min-h-screen -mt-20 relative overflow-hidden bg-[var(--primary)] flex items-center justify-center"
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
        <motion.div 
          className="max-w-4xl"
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
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div 
          className="animate-bounce cursor-pointer"
          whileHover={{ scale: 1.2 }}
          onClick={() => scrollToSection('#features')}
        >
          <svg 
            className="w-6 h-6 text-white/50" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;