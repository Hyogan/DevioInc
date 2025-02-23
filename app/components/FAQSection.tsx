'use client'
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParallaxWrapper from './shared/ParallaxWrapper';
import { ParallaxBackground, ParallaxGradientText } from '../components/shared/ParallaxBackground';
import { containerVariants, itemVariants } from '../hooks/useParallax';

interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'features' | 'pricing' | 'privacy';
  gradient: string;
}

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const sectionRef = useRef<HTMLDivElement>(null);

  const faqs: FAQItem[] = [
    {
      question: "How does Devio track screen time?",
      answer: "Devio uses advanced AI algorithms to automatically track and categorize your digital activities across all your devices. Our system runs in the background, requiring minimal input while providing accurate insights.",
      category: "general",
      gradient: "from-[#00ff94] to-[#00b8ff]"
    },
    {
      question: "Is my data private and secure?",
      answer: "Yes, absolutely! We use end-to-end encryption and follow strict privacy guidelines. Your data is stored securely and never shared with third parties without your explicit consent.",
      category: "privacy",
      gradient: "from-[#FF3366] to-[#FF33FF]"
    },
    // Add more FAQ items...
  ];

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'general', label: 'General' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'privacy', label: 'Privacy' }
  ];

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-32 relative h-full overflow-hidden sm:overflow-visible bg-[var(--primary)]"
      id="faq"
    >
      <ParallaxBackground speed={0.3} />

      <ParallaxWrapper className="container mx-auto px-6 relative z-10" speed={0.8}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked
              <ParallaxGradientText speed={1.2}> Questions</ParallaxGradientText>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Find answers to common questions about Devio
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap gap-4 justify-center mb-12"
            variants={itemVariants}
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${activeCategory === category.id 
                    ? 'bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] text-white' 
                    : 'bg-white/10 hover:bg-white/20 text-[var(--text-secondary)]'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>

          {/* FAQ Items */}
          <motion.div className="space-y-4" variants={containerVariants}>
            <AnimatePresence mode="wait">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  layout
                >
                  <motion.div
                    className={`glass-card overflow-hidden cursor-pointer
                      ${activeIndex === index ? 'border-[var(--accent)]/20' : 'border-white/10'}
                    `}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-center gap-4">
                        <h3 className="text-lg font-medium">{faq.question}</h3>
                        <motion.div
                          animate={{ rotate: activeIndex === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <svg
                            className="w-5 h-5 text-[var(--text-secondary)]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </motion.div>
                      </div>

                      <AnimatePresence>
                        {activeIndex === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="mt-4 text-[var(--text-secondary)]">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Gradient border animation */}
                    <motion.div
                      className={`h-0.5 bg-gradient-to-r ${faq.gradient}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: activeIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Contact CTA */}
          <motion.div 
            className="text-center mt-12"
            variants={itemVariants}
          >
            <p className="text-[var(--text-secondary)] mb-4">
              Can&apos;t find what you&apos;re looking for?
            </p>
            <motion.button
              className="primary-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Us
            </motion.button>
          </motion.div>
        </motion.div>
      </ParallaxWrapper>
    </section>
  );
};

export default FAQSection; 