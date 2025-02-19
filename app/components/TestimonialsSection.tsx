'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
}

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useScrollAnimation();

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp",
      quote: "Devio has transformed how I manage my screen time. The insights are invaluable, and the UI is incredibly intuitive.",
      image: "/testimonials/sarah.jpg"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Software Engineer",
      company: "DevStudio",
      quote: "As a developer, I was skeptical at first, but Devio's focus features have significantly improved my productivity.",
      image: "/testimonials/marcus.jpg"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Digital Wellness Coach",
      company: "Mindful Tech",
      quote: "I recommend Devio to all my clients. It's the perfect tool for building healthy digital habits.",
      image: "/testimonials/emma.jpg"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-20 md:py-32 bg-[var(--primary)] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our Users
            <span className="gradient-text"> Say</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their digital lives with Devio.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] opacity-20" />
                  <img
                    src={testimonials[currentIndex].image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <p className="text-xl md:text-2xl mb-6 text-[var(--text-secondary)]">
                  &ldquo;{testimonials[currentIndex].quote}&ldquo;
                  </p>
                  <div>
                    <h3 className="font-bold text-lg">{testimonials[currentIndex].name}</h3>
                    <p className="text-[var(--text-secondary)]">
                      {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;