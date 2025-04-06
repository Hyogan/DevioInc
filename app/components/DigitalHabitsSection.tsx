'use client'
import '../styles/digitalHabitsSection.css';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface UsageData {
  social: number;
  entertainment: number;
  productivity: number;
  other: number;
}

const DigitalHabitsSection = () => {
  const router = useRouter();
  const [desiredLimit, setDesiredLimit] = useState(4);
  const [currentUsage, setCurrentUsage] = useState<UsageData>({
    social: 3,
    entertainment: 2.5,
    productivity: 1.5,
    other: 1
  });

  const moveToJoin = () => {
    router.push('/join-us');
  };

  const graphRef = useRef<HTMLDivElement>(null);
  // const tooltipRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollAnimation();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    if (!graphRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth / 2, window.innerWidth / 2);
    graphRef.current.appendChild(renderer.domElement);

    // Create graph elements
    const categories = Object.entries(currentUsage);
    const graphElements: THREE.Group[] = [];

    categories.forEach(([category, hours], index) => {
      const group = new THREE.Group();
      
      // Create nodes and connections
      const geometry = new THREE.SphereGeometry(0.1, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        color: getCategoryColor(category),
        transparent: true,
        opacity: 0.8
      });

      for (let i = 0; i < hours * 10; i++) {
        const node = new THREE.Mesh(geometry, material);
        const angle = (Math.PI * 2 / categories.length) * index;
        const radius = 2 + Math.random();
        node.position.x = Math.cos(angle) * radius;
        node.position.y = Math.sin(angle) * radius;
        node.position.z = Math.random() * 2;
        group.add(node);

        // Add connecting lines
        if (i > 0) {
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            group.children[i-1].position,
            node.position
          ]);
          const lineMaterial = new THREE.LineBasicMaterial({ 
            color: getCategoryColor(category),
            transparent: true,
            opacity: 0.3
          });
          const line = new THREE.Line(lineGeometry, lineMaterial);
          group.add(line);
        }
      }

      graphElements.push(group);
      scene.add(group);
    });

    camera.position.z = 8;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      graphElements.forEach(group => {
        group.rotation.y += 0.001;
      });
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      renderer.dispose();
      scene.clear();
    };
  }, [currentUsage]);

  const handleSliderChange = (value: number) => {
    setDesiredLimit(value);
    // Update graph data proportionally
    const ratio = value / Object.values(currentUsage).reduce((a, b) => a + b, 0);
    setCurrentUsage(prev => ({
      social: prev.social * ratio,
      entertainment: prev.entertainment * ratio,
      productivity: prev.productivity * ratio,
      other: prev.other * ratio
    }));
  };

  const stats = [
    { value: '5.4h', label: 'Average daily screen time' },
    { value: '47%', label: 'Time spent on social media' },
    { value: '68%', label: 'Users report feeling overwhelmed' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen py-20 md:py-32 relative bg-[var(--primary)]"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--primary)] to-transparent opacity-50" />

      <motion.div 
        className="container mx-auto px-6 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Understanding Your
            <span className="gradient-text"> Digital Habits</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Discover insights about your digital behavior and learn how to create healthier technology habits.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-card text-center p-8 relative overflow-hidden group"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative z-10"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                  {stat.value}
                </div>
                <p className="text-[var(--text-secondary)]">{stat.label}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={itemVariants}
            className="relative z-10"
          >
            <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-6">
              Take Control of Your Time
            </h3>
            <div className="space-y-4">
              <p className="text-[var(--text-secondary)]">
                Set personalized goals and limits for your app usage.
                Our AI-powered insights help you understand and improve your digital habits.
              </p>
              <motion.button 
                onClick={moveToJoin}
                className="primary-button mt-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Tracking
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            style={{ y, opacity }}
            className="relative"
          >
            <div className="glass-card p-8">
              <div className="relative z-10">
                <div className="w-full h-full min-h-[300px] rounded-lg bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] opacity-10 absolute inset-0" />
                <div className="relative z-20 flex items-center justify-center h-full">
                  {/* Add your interactive graph or visualization here */}
                  <div className="text-center">
                    <div className="mb-4">
                      <span className="text-4xl font-bold gradient-text">2.5h</span>
                      <span className="text-[var(--text-secondary)] ml-2">Today</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]"
                          initial={{ width: 0 }}
                          whileInView={{ width: '60%' }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                        />
                      </div>
                      <p className="text-sm text-[var(--text-secondary)]">
                        40% less than yesterday
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="slider-container">
          <label htmlFor="timeLimit">Set your daily screen time goal</label>
          <input
            type="range"
            id="timeLimit"
            min="1"
            max="8"
            step="0.5"
            value={desiredLimit}
            onChange={(e) => handleSliderChange(parseFloat(e.target.value))}
          />
          <span className="slider-value">{desiredLimit} hours</span>
        </div>
      </motion.div>
    </section>
  );
};

function getCategoryColor(category: string): string {
  const colors = {
    social: '#4A90E2',
    entertainment: '#E2844A',
    productivity: '#50E3C2',
    other: '#C2A4FF'
  };
  return colors[category as keyof typeof colors];
}

export default DigitalHabitsSection; 
