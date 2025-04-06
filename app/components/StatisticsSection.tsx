import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}

// const AnimatedCounter = ({ value, suffix = '', duration = 2, delay = 0 }: CounterProps) => {
  const AnimatedCounter = ({ value, suffix = '', duration = 2 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: counterRef,
    offset: ["start end", "end start"]
  });

  useScrollAnimation();

  scrollYProgress.onChange((latest) => {
    if (latest > 0 && count !== value) {
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, (duration * 1000) / steps);
    }
  });

  return (
    <span ref={counterRef} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const StatisticsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  // const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const stats = [
    { value: 50000, suffix: '+', label: 'Active Users', gradient: 'from-[#00ff94] to-[#00b8ff]' },
    { value: 1000000, suffix: 'h', label: 'Screen Time Saved', gradient: 'from-[#FF3366] to-[#FF33FF]' },
    { value: 85, suffix: '%', label: 'User Satisfaction', gradient: 'from-[#FFB800] to-[#FF3366]' },
    { value: 120, suffix: '+', label: 'Countries', gradient: 'from-[#00b8ff] to-[#00ff94]' }
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
      className="py-20 md:py-32 relative overflow-hidden bg-[var(--primary)]"
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y }}
      >
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[var(--gradient-end)] to-[var(--gradient-start)] rounded-full filter blur-3xl" />
      </motion.div>

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
            Making an
            <span className="gradient-text"> Impact</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Join thousands of users who have transformed their digital lives with Devio.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="glass-card text-center p-6 relative group"
            >
              {/* Animated gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg`} />
              
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative z-10"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  <AnimatedCounter 
                    value={stat.value} 
                    suffix={stat.suffix}
                    delay={index * 0.2}
                  />
                </div>
                <p className="text-[var(--text-secondary)]">{stat.label}</p>
              </motion.div>

              {/* Animated progress circle */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="48%"
                  stroke="url(#gradient)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: index * 0.2 }}
                  className="opacity-10"
                />
              </svg>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-20 text-center"
          variants={itemVariants}
        >
          <motion.button
            className="primary-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Statistics
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default StatisticsSection; 
