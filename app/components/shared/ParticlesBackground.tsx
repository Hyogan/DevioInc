'use client'
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  hue: number;
}

const ParticlesBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number>();

  const createParticle = (x: number, y: number): Particle => ({
    x,
    y,
    size: Math.random() * 15 + 5,
    speedX: (Math.random() - 0.5) * 2,
    speedY: (Math.random() - 0.5) * 2,
    opacity: Math.random() * 0.5 + 0.3,
    hue: Math.random() * 60 - 30 // This will give us a range of colors around our theme
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();

    // Initialize particles
    particlesRef.current = Array.from({ length: 20 }, () =>
      createParticle(
        Math.random() * width,
        Math.random() * height
      )
    );

    const updateParticles = () => {
      particlesRef.current.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off walls
        if (particle.x < 0 || particle.x > width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > height) particle.speedY *= -1;

        // Keep particles within bounds
        particle.x = Math.max(0, Math.min(width, particle.x));
        particle.y = Math.max(0, Math.min(height, particle.y));
      });

      requestRef.current = requestAnimationFrame(updateParticles);
    };

    updateParticles();

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {particlesRef.current.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-lg bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]"
          animate={{
            x: particle.x,
            y: particle.y,
            scale: [1, 1.1, 1],
            opacity: [particle.opacity, particle.opacity * 1.2, particle.opacity],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: particle.size,
            height: particle.size,
            filter: `blur(8px) hue-rotate(${particle.hue}deg)`,
            boxShadow: `0 0 20px rgba(var(--accent-color), 0.5)`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticlesBackground; 