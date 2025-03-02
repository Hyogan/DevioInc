'use client'
import React, { useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';

const ParticleEarth = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle class
    class Particle {
      x: number;
      y: number;
      z: number;
      radius: number;
      angle: number;
      speed: number;

      constructor() {
        this.x = 0;
        this.y = 0;
        this.z = Math.random() * 360;
        this.radius = Math.min(canvas.width, canvas.height) * 0.3;
        this.angle = Math.random() * 360;
        this.speed = 0.2 + Math.random() * 0.5;
      }

      update() {
        this.angle += this.speed;
        this.x = canvas.width/2 + this.radius * Math.cos(this.angle * Math.PI/180) * Math.cos(this.z * Math.PI/180);
        this.y = canvas.height/2 + this.radius * Math.sin(this.angle * Math.PI/180);
      }

      draw() {
        if (!ctx) return;
        const opacity = Math.cos(this.z * Math.PI/180);
        if (opacity > 0) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(91, 173, 255, ${opacity})`;
          ctx.fill();
        }
      }
    }

    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < 800; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 50) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(91, 173, 255, ${0.2 * (1 - distance/50)})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default ParticleEarth; 
