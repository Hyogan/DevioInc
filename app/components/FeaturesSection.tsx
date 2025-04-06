// 'use client'
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useRouter } from 'next/navigation';

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollAnimation();
  const router = useRouter();

  const moveToJoin = () => {
    router.push('/join-us');
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const features = [
    {
      title: "Smart Time Tracking",
      description: "AI-powered tracking automatically categorizes your digital activities and provides personalized insights.",
      icon: "⚡",
      gradient: "from-[#00ff94] to-[#00b8ff]"
    },
    {
      title: "Focus Mode",
      description: "Block distractions and stay productive with customizable focus sessions and schedules.",
      icon: "🎯",
      gradient: "from-[#FF3366] to-[#FF33FF]"
    },
    {
      title: "Family Sharing",
      description: "Manage screen time for the whole family with shared dashboards and parental controls.",
      icon: "👨‍👩‍👧‍👦",
      gradient: "from-[#FFB800] to-[#FF3366]"
    },
    {
      title: "Cross-Platform Sync",
      description: "Seamlessly sync your data across all your devices with real-time updates.",
      icon: "🔄",
      gradient: "from-[#00b8ff] to-[#00ff94]"
    }
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

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  // const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden sm:overflow-visible bg-[var(--primary)]"
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y }}
      >
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-r from-[var(--gradient-end)] to-[var(--gradient-start)] rounded-full filter blur-3xl" />
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
            Powerful
            <span className="gradient-text"> Features</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Everything you need to maintain a healthy digital lifestyle
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              className="glass-card p-6 relative group"
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg" />
              
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`w-12 h-12 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6`}
              >
                <span className="text-2xl">{feature.icon}</span>
              </motion.div>

              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-[var(--text-secondary)]">{feature.description}</p>

              {/* Interactive element */}
              <motion.div 
                className="mt-6 flex items-center text-sm text-[var(--text-secondary)] cursor-pointer group"
                whileHover={{ x: 5 }}
                onClick={moveToJoin}
              >
                Learn more
                <svg 
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </motion.div>
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
            onClick={moveToJoin}
          >
            Explore All Features
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FeaturesSection; 
