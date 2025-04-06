
import { motion } from 'framer-motion';
import  ParallaxWrapper  from './shared/ParallaxWrapper';

const Tokenomics = () => {
  const tokenDetails = {
    name: 'DEVIO',
    symbol: 'DVIO',
    decimals: 18,
    totalSupply: '100,000,000',
    network: 'Ethereum (ERC-20)'
  };

  const vestingSchedule = [
    {
      category: 'Public Sale',
      allocation: '30%',
      vesting: '20% at TGE, then 20% quarterly',
      amount: '30,000,000'
    },
    {
      category: 'Team & Advisors',
      allocation: '20%',
      vesting: '12-month cliff, then 24-month linear vesting',
      amount: '20,000,000'
    },
    {
      category: 'Development',
      allocation: '20%',
      vesting: '6-month cliff, then 18-month linear vesting',
      amount: '20,000,000'
    },
    {
      category: 'Marketing',
      allocation: '15%',
      vesting: '10% at TGE, then 15% quarterly',
      amount: '15,000,000'
    },
    {
      category: 'Liquidity',
      allocation: '10%',
      vesting: '100% locked for 24 months',
      amount: '10,000,000'
    },
    {
      category: 'Community Rewards',
      allocation: '5%',
      vesting: 'Linear release over 36 months',
      amount: '5,000,000'
    }
  ];

  const taxStructure = [
    { type: 'Buy Tax', percentage: '3%', distribution: '1% LP, 1% Marketing, 1% Development' },
    { type: 'Sell Tax', percentage: '5%', distribution: '2% LP, 2% Marketing, 1% Development' }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-primary" id="tokenomics">
      <div className="container mx-auto px-6">
        <ParallaxWrapper>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Tokenomics
            </h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Transparent and sustainable token economics designed for long-term growth
            </p>
          </motion.div>

          {/* Token Details */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {Object.entries(tokenDetails).map(([key, value], index) => (
              <motion.div
                key={key}
                className="glass-card p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-secondary mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                <p className="text-xl font-bold">{value}</p>
              </motion.div>
            ))}
          </div>

          {/* Vesting Schedule */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6">Vesting Schedule</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgb(var(--card-border))]">
                    <th className="text-left p-4">Category</th>
                    <th className="text-left p-4">Allocation</th>
                    <th className="text-left p-4">Amount</th>
                    <th className="text-left p-4">Vesting</th>
                  </tr>
                </thead>
                <tbody>
                  {vestingSchedule.map((item, index) => (
                    <motion.tr
                      key={item.category}
                      className="border-b border-[rgb(var(--card-border))]"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <td className="p-4">{item.category}</td>
                      <td className="p-4">{item.allocation}</td>
                      <td className="p-4">{item.amount}</td>
                      <td className="p-4 text-secondary">{item.vesting}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tax Structure */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Tax Structure</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {taxStructure.map((tax, index) => (
                <motion.div
                  key={tax.type}
                  className="glass-card p-6"
                  initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-xl font-bold mb-4">{tax.type}</h4>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold gradient-text">{tax.percentage}</p>
                    <p className="text-secondary">{tax.distribution}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ParallaxWrapper>
      </div>
    </section>
  );
};

export default Tokenomics; 
