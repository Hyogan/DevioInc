'use client'
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  orbit: number;
  angle: number;
  size: number;
  speed: number;
  opacity: number;
}

const ParticleEarth = () => {
  const particlesRef = useRef<Particle[]>([]);
  const centerSize = 40; // Size of the central sphere
  const orbitRadii = [100, 140, 180]; // Different orbit sizes
  
  useEffect(() => {
    // Create particles for each orbit
    const particles: Particle[] = [];
    orbitRadii.forEach((radius, orbitIndex) => {
      const particlesInOrbit = 20 + orbitIndex * 10; // More particles in outer orbits
      for (let i = 0; i < particlesInOrbit; i++) {
        particles.push({
          orbit: radius,
          angle: (Math.PI * 2 * i) / particlesInOrbit,
          size: Math.random() * 3 + 2,
          speed: (0.2 + Math.random() * 0.3) * (orbitIndex + 1), // Outer orbits move faster
          opacity: Math.random() * 0.5 + 0.3
        });
      }
    });
    particlesRef.current = particles;
  }, []);

  return (
    <div className="relative w-[400px] h-[400px] flex items-center justify-center">
      {/* Central Sphere */}
      <motion.div
        className="absolute rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]"
        style={{
          width: centerSize,
          height: centerSize,
          filter: 'blur(2px)',
          boxShadow: '0 0 30px rgba(var(--accent-color), 0.6)',
          opacity: 'var(--particle-opacity)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Orbits */}
      {orbitRadii.map((radius, index) => (
        <motion.div
          key={`orbit-${index}`}
          className="absolute rounded-full border border-[rgba(var(--accent-color),0.1)]"
          style={{
            width: radius * 2,
            height: radius * 2,
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.02, 1],
          }}
          transition={{
            rotate: {
              duration: 20 + index * 5,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
      ))}

      {/* Particles */}
      {particlesRef.current.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]"
          style={{
            width: particle.size,
            height: particle.size,
            filter: 'blur(1px)',
            boxShadow: '0 0 12px rgba(var(--accent-color), 0.5)',
            opacity: `var(--particle-opacity)`,
          }}
          animate={{
            x: particle.orbit * Math.cos(particle.angle),
            y: particle.orbit * Math.sin(particle.angle),
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
            scale: [1, 1.2, 1],
          }}
          transition={{
            x: {
              duration: 20 / particle.speed,
              repeat: Infinity,
              ease: "linear",
            },
            y: {
              duration: 20 / particle.speed,
              repeat: Infinity,
              ease: "linear",
            },
            opacity: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
            scale: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }
          }}
        />
      ))}

      {/* Glow Effect */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(var(--accent-color), 0.2) 0%, transparent 70%)',
        }}
      />
    </div>
  );
};

export default ParticleEarth; 