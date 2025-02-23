'use client'
import { motion } from 'framer-motion';
import ParallaxWrapper from './shared/ParallaxWrapper';
import {ParallaxGradientText} from './shared/ParallaxBackground';
// import CountdownTimer from './shared/CountdownTimer';
// import WhitelistForm from './shared/WhitelistForm';
// import TokenUtility from './TokenUtility';
// import Tokenomics from './Tokenomics';
// import FundingTiers from './FundingTiers';

const TokenSale = () => {
  const tokenMetrics = [
    { label: 'Token Price', value: '$0.0000065' },
    { label: 'Total Supply', value: '1B' },
    { label: 'Initial MCap', value: '$6.5K' },
    { label: 'Vesting Period', value: '1 March, 2025' }
  ];
 

  // const allocationData = [
  //   { category: 'Public Sale', percentage: 30 },
  //   { category: 'Team & Advisors', percentage: 20 },
  //   { category: 'Development', percentage: 20 },
  //   { category: 'Marketing', percentage: 15 },
  //   { category: 'Liquidity', percentage: 10 },
  //   { category: 'Community Rewards', percentage: 5 }
  // ];
  const allocationData = [
    // {category: 'Pre-Sale' , percentage: 20},
    {category: 'Insider' , percentage: 11},
    {category: 'Development' , percentage: 10}
  ]

  // Set target date to 30 days from now for example
  // const targetDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const targetDate = new Date('March 1, 2025 10:00:00');
  const alertTarget = () => {
    alert(targetDate);
  }

  return (
    <section className="py-20 relative overflow-hidden bg-primary" id="token">
      <div className="container mx-auto px-6">
        <ParallaxWrapper>
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <ParallaxGradientText>Token Sale</ParallaxGradientText>
            </motion.h2>
            <motion.p 
              className="text-lg text-secondary max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Join the future of digital wellness. Participate in our token sale and become part of the Devio ecosystem.
            </motion.p>
          </div>

          {/* Token Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {tokenMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="glass-card p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-secondary mb-2">{metric.label}</h3>
                <p className="text-2xl font-bold gradient-text">{metric.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Token Allocation */}
          {/* <div  className="grid md:grid-cols-2 gap-12 items-center"> */}
          <div  className="flex w-full flex-col  gap-12 items-center">
            <motion.div
              className='w-full'
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6" onClick={()=> alertTarget()}>Token Allocation</h3>
              <div className="space-y-4">
                {allocationData.map((item, index) => (
                  <div key={item.category} className="relative">
                    <div className="flex justify-between mb-2">
                      <span className="text-secondary">{item.category}</span>
                      <span className="font-bold">{item.percentage}%</span>
                    </div>
                    <div className="h-2 bg-[rgb(var(--background-secondary))] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Pre-sale Information */}
            {/* <motion.div
              className="glass-card p-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">Pre-sale Details - {targetDate.toLocaleDateString()}</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-secondary mb-2">Starts In</p>
                  <CountdownTimer targetDate={targetDate} />
                </div>
                <div>
                  <p className="text-secondary mb-4">Progress (0/1500 SOL)</p>
                  <div className="h-2 bg-[rgb(var(--background-secondary))] rounded-full">
                    <div className="w-0 h-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] rounded-full" />
                  </div>
                </div>
                <WhitelistForm />
              </div>
            </motion.div> */}
          </div>
        </ParallaxWrapper>
      </div>
    </section>
  );
};

export default TokenSale; 