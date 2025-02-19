'use client'
import { motion } from 'framer-motion';
import  ParallaxWrapper  from './shared/ParallaxWrapper';

const TokenUtility = () => {
  const utilities = [
    {
      title: 'Governance Rights',
      description: 'Vote on key platform decisions and feature proposals',
      icon: '🏛️'
    },
    {
      title: 'Premium Features',
      description: 'Access advanced productivity tools and analytics',
      icon: '⭐'
    },
    {
      title: 'Staking Rewards',
      description: 'Earn passive income by staking your tokens',
      icon: '💰'
    },
    {
      title: 'Fee Discounts',
      description: 'Get reduced platform fees based on token holdings',
      icon: '💎'
    },
    {
      title: 'Community Access',
      description: 'Exclusive access to premium community features',
      icon: '🤝'
    },
    {
      title: 'Revenue Sharing',
      description: 'Participate in platform revenue distribution',
      icon: '📈'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-primary">
      <div className="container mx-auto px-6">
        <ParallaxWrapper>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Token Utility
            </h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              The DEVIO token is designed to provide real utility within our ecosystem,
              creating value for holders and platform users alike.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {utilities.map((utility, index) => (
              <motion.div
                key={utility.title}
                className="glass-card p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{utility.icon}</div>
                <h3 className="text-xl font-bold mb-2">{utility.title}</h3>
                <p className="text-secondary">{utility.description}</p>
              </motion.div>
            ))}
          </div>
        </ParallaxWrapper>
      </div>
    </section>
  );
};

export default TokenUtility; 