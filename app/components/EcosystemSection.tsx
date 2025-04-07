'use client'
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useRouter } from 'next/navigation';
const EcosystemSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const moveToJoin = () => {
    router.push('/join-us');
  };
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  useScrollAnimation();

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  const platforms = [
    {
      name: "Mobile",
      description: "Track your screen time on iOS and Android devices",
      icon: "📱",
      features: ["Real-time tracking", "App categorization", "Usage alerts"],
      gradient: "from-[#00ff94] to-[#00b8ff]"
    },
    {
      name: "Desktop",
      description: "Monitor productivity on Windows and macOS",
      icon: "💻",
      features: ["Focus mode", "Website blocking", "Activity dashboard"],
      gradient: "from-[#FF3366] to-[#FF33FF]"
    },
    {
      name: "Web",
      description: "Access your data from any browser",
      icon: "🌐",
      features: ["Cross-device sync", "Analytics dashboard", "Settings management"],
      gradient: "from-[#FFB800] to-[#FF3366]"
    },
    {
      name: "Wearables",
      description: "Stay connected with smartwatch integration",
      icon: "⌚",
      features: ["Health tracking", "Screen time alerts", "Activity summaries"],
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

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden sm:overflow-visible bg-[var(--primary)]"
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y }}
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-[var(--gradient-end)] to-[var(--gradient-start)] rounded-full filter blur-3xl" />
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
            Our
            <span className="gradient-text"> Ecosystem</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Seamlessly integrated across all your devices
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {platforms.map((platform, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="glass-card p-6 relative group cursor-pointer platform-card"
            >
              {/* Animated gradient border */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-r ${platform.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg`}
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
              />
              
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${platform.gradient} flex items-center justify-center mb-6 text-3xl`}>
                  {platform.icon}
                </div>

                <h3 className="text-xl font-bold mb-4">{platform.name}</h3>
                <p className="text-[var(--text-secondary)] mb-6">{platform.description}</p>

                <ul className="space-y-3">
                  {platform.features.map((feature, idx) => (
                    <motion.li 
                      key={idx}
                      className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"
                      initial={{ x: -10, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + idx * 0.1 }}
                    >
                      <svg
                        className="w-4 h-4 text-[var(--accent)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  onClick={moveToJoin}
                  className="mt-6 flex items-center text-sm text-[var(--text-secondary)] group/link"
                  whileHover={{ x: 5 }}
                >
                  Learn more
                  <svg 
                    className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" 
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
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-20 text-center"
          variants={itemVariants}
        >
          <motion.button
            onClick={moveToJoin}
            className="primary-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Full Ecosystem
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default EcosystemSection; 
