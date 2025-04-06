import { motion } from 'framer-motion';
import  ParallaxWrapper  from './shared/ParallaxWrapper';

const FundingTiers = () => {
  const tiers = [
    {
      name: 'Seed Round',
      price: '$0.03',
      allocation: '10,000,000 DVIO',
      minContribution: '0.5 ETH',
      maxContribution: '5 ETH',
      benefits: [
        'Earliest access',
        'Lowest token price',
        'Extended vesting period',
        'Advisory role opportunity'
      ],
      vesting: '10% TGE, 6-month cliff, 18-month linear vesting'
    },
    {
      name: 'Private Sale',
      price: '$0.04',
      allocation: '15,000,000 DVIO',
      minContribution: '0.3 ETH',
      maxContribution: '3 ETH',
      benefits: [
        'Early access',
        'Competitive price',
        'Community role priority',
        'Beta access'
      ],
      vesting: '15% TGE, 3-month cliff, 12-month linear vesting'
    },
    {
      name: 'Public Sale',
      price: '$0.05',
      allocation: '5,000,000 DVIO',
      minContribution: '0.1 ETH',
      maxContribution: '1 ETH',
      benefits: [
        'Guaranteed allocation',
        'Immediate trading',
        'Platform benefits',
        'Community access'
      ],
      vesting: '25% TGE, 6-month linear vesting'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-primary" id="funding-tiers">
      <div className="container mx-auto px-6">
        <ParallaxWrapper>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Funding Tiers
            </h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Choose the investment tier that best suits your commitment to the Devio ecosystem
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                className="glass-card p-8 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]">
                    {tier.name}
                  </span>
                </div>

                <div className="text-center mb-6 pt-4">
                  <div className="text-3xl font-bold mb-2">{tier.price}</div>
                  <p className="text-secondary">{tier.allocation}</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-secondary">Min Contribution</p>
                    <p className="font-bold">{tier.minContribution}</p>
                  </div>
                  <div>
                    <p className="text-secondary">Max Contribution</p>
                    <p className="font-bold">{tier.maxContribution}</p>
                  </div>
                  <div>
                    <p className="text-secondary">Vesting</p>
                    <p className="font-medium">{tier.vesting}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold mb-3">Benefits</h4>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center">
                        <span className="text-[var(--gradient-end)] mr-2">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  className="primary-button w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Join Whitelist
                </motion.button>
              </motion.div>
            ))}
          </div>
        </ParallaxWrapper>
      </div>
    </section>
  );
};

export default FundingTiers; 
