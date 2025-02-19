'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  useScrollAnimation();

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, annual: 0 },
      description: 'Perfect for getting started',
      features: [
        'Basic screen time tracking',
        'Daily reports',
        'App usage statistics',
        'Single device'
      ],
      gradient: 'from-[#00ff94] to-[#00b8ff]'
    },
    {
      name: 'Pro',
      price: { monthly: 9.99, annual: 99 },
      description: 'Best for individuals',
      features: [
        'Everything in Free',
        'Advanced analytics',
        'Focus mode',
        'Multiple devices',
        'Priority support'
      ],
      gradient: 'from-[#FF3366] to-[#FF33FF]',
      popular: true
    },
    {
      name: 'Family',
      price: { monthly: 19.99, annual: 199 },
      description: 'Perfect for families',
      features: [
        'Everything in Pro',
        'Up to 6 family members',
        'Parental controls',
        'Family dashboard',
        'Screen time limits',
        '24/7 support'
      ],
      gradient: 'from-[#FFB800] to-[#FF3366]'
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
    <section className="py-20 md:py-32 bg-[var(--primary)] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            variants={itemVariants}
          >
            Choose Your
            <span className="gradient-text"> Plan</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-8"
            variants={itemVariants}
          >
            Select the perfect plan for your digital wellness journey
          </motion.p>

          <motion.div 
            className="flex items-center justify-center gap-4 mb-12"
            variants={itemVariants}
          >
            <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-[var(--text-secondary)]'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-8 rounded-full bg-white/10 p-1 transition-colors"
            >
              <div
                className={`w-6 h-6 rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] transition-transform ${
                  isAnnual ? 'translate-x-6' : ''
                }`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-white' : 'text-[var(--text-secondary)]'}`}>
              Annual (Save 20%)
            </span>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`glass-card p-8 relative ${
                plan.popular ? 'md:-mt-4 md:mb-4' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className={`px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${plan.gradient}`}>
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-[var(--text-secondary)] mb-4">{plan.description}</p>
                <div className="text-4xl font-bold mb-2">
                  ${isAnnual ? plan.price.annual : plan.price.monthly}
                  <span className="text-lg text-[var(--text-secondary)]">
                    {isAnnual ? '/year' : '/month'}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-[var(--accent)]"
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
                    <span className="text-[var(--text-secondary)]">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-full font-medium transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] hover:scale-105'
                    : 'border border-white/20 hover:border-white/40'
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection; 