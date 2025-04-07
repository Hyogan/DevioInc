'use client'
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
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
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
          {/* Device Mockup */}
        <div className="hidden md:block">
        <DeviceMockup />
      </div>
        </div>
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


const DeviceMockup = () => {
  const mockupRef = useRef<HTMLDivElement>(null);
  const { transform } = useParallax(mockupRef, { speed: 0.7 });
  
  useEffect(() => {
    if (!mockupRef.current) return;
    // Notification animation
    const notifications = mockupRef.current.querySelectorAll('.notification');
    notifications.forEach((notification, index) => {
      gsap.fromTo(notification, 
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5, 
          delay: 1.5 + (index * 0.3),
          ease: "back.out(1.7)"
        }
      );
    });
    
    // Screen glow animation
    const glowElement = mockupRef.current.querySelector('.screen-glow');
    if (glowElement) {
      // Create a timeline for the opacity animation
      const glowTimeline = gsap.timeline({
        repeat: -1,
        yoyo: true
      });
      glowTimeline
        .to(glowElement, { opacity: 0.4, duration: 0 }) // Start at 0.4
        .to(glowElement, { opacity: 0.8, duration: 1.5, ease: "sine.inOut" }) // Animate to 0.8
        .to(glowElement, { opacity: 0.4, duration: 1.5, ease: "sine.inOut" }); // Back to 0.4
    }
    
    // Usage chart animation
    gsap.from('.usage-bar', {
      scaleX: 0,
      duration: 1.5,
      delay: 2,
      stagger: 0.2,
      ease: "power2.out"
    });
    
  }, []);
  
  return (
    <motion.div 
      ref={mockupRef}
      className="relative"
      style={{ y: transform }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      {/* Phone frame */}
      <div className="relative w-[280px] h-[580px] bg-[#222] rounded-[40px] p-3 shadow-xl border-[8px] border-[#333] overflow-hidden">
        {/* Screen glow effect */}
        <div className="screen-glow absolute inset-0 bg-gradient-to-br from-[rgba(0,255,148,0.15)] to-[rgba(0,184,255,0.15)] opacity-60 z-0"></div>
        
        {/* App interface */}
        <div className="relative z-10 bg-[#111] rounded-[32px] h-full w-full overflow-hidden p-4 flex flex-col">
          {/* App header */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-[#00ffaa] font-bold text-lg">Devio</div>
            <div className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#00ffaa] to-[#00b8ff]"></div>
            </div>
          </div>
          
          {/* Usage summary */}
          <div className="bg-[#1a1a1a] rounded-xl p-3 mb-4">
            <div className="text-sm text-white/80 mb-2">Today&apos;s screen time</div>
            <div className="text-2xl font-bold text-white mb-1">3h 24m</div>
            <div className="text-xs text-[#00ffaa]">-28% from yesterday</div>
          </div>
          
          {/* Usage chart */}
          <div className="bg-[#1a1a1a] rounded-xl p-3 mb-4">
            <div className="text-sm text-white/80 mb-3">App usage</div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-white text-xs mb-1">
                  <span>Social Media</span>
                  <span>1h 12m</span>
                </div>
                <div className="h-2 bg-[#333] rounded-full overflow-hidden">
                  <div className="usage-bar h-full w-[70%] bg-gradient-to-r from-[#ff5e62] to-[#ff9966] rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-white text-xs mb-1">
                  <span>Productivity</span>
                  <span>1h 45m</span>
                </div>
                <div className="h-2 bg-[#333] rounded-full overflow-hidden">
                  <div className="usage-bar h-full w-[85%] bg-gradient-to-r from-[#00ffaa] to-[#00b8ff] rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-white mb-1">
                  <span>Entertainment</span>
                  <span>27m</span>
                </div>
                <div className="h-2 bg-[#333] rounded-full overflow-hidden">
                  <div className="usage-bar h-full w-[25%] bg-gradient-to-r from-[#a18cd1] to-[#fbc2eb] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Notifications */}
          <div className="space-y-2">
            <div className="notification bg-[#1a1a1a] rounded-lg p-2 border-l-2 border-[#00ffaa]">
              <div className="text-xs text-white/80">Wellness tip</div>
              <div className="text-xs text-white">Take a 5-minute break from your screen</div>
            </div>
            <div className="notification bg-[#1a1a1a] rounded-lg p-2 border-l-2 border-[#00b8ff]">
              <div className="text-xs text-white text-white/80">Goal achieved</div>
              <div className="text-xs">Reduced social media usage by 30%</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-[#00ffaa] to-[#00b8ff] rounded-full opacity-70 blur-sm animate-pulse"></div>
      <div className="absolute -bottom-6 -left-2 w-16 h-16 bg-gradient-to-br from-[#a18cd1] to-[#fbc2eb] rounded-full opacity-60 blur-sm animate-pulse delay-1000"></div>
    </motion.div>
  );
};
