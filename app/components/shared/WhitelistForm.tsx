'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';

const WhitelistForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    walletAddress: '',
    contribution: '',
    telegram: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center p-6"
      >
        <h3 className="text-2xl font-bold mb-4 gradient-text">Successfully Registered!</h3>
        <p className="text-secondary">
          Thank you for joining our whitelist. We&apos;ll contact you with further details.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-secondary mb-2">Email Address</label>
        <input
          type="email"
          required
          className="w-full p-3 rounded-lg bg-[rgb(var(--background-secondary))] border border-[rgb(var(--card-border))]"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-secondary mb-2">Wallet Address (ERC-20)</label>
        <input
          type="text"
          required
          className="w-full p-3 rounded-lg bg-[rgb(var(--background-secondary))] border border-[rgb(var(--card-border))]"
          value={formData.walletAddress}
          onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-secondary mb-2">Planned Contribution (ETH)</label>
        <input
          type="number"
          required
          min="0.1"
          step="0.1"
          className="w-full p-3 rounded-lg bg-[rgb(var(--background-secondary))] border border-[rgb(var(--card-border))]"
          value={formData.contribution}
          onChange={(e) => setFormData({ ...formData, contribution: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-secondary mb-2">Telegram Username (Optional)</label>
        <input
          type="text"
          className="w-full p-3 rounded-lg bg-[rgb(var(--background-secondary))] border border-[rgb(var(--card-border))]"
          value={formData.telegram}
          onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
        />
      </div>
      <motion.button
        type="submit"
        className="primary-button w-full"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Join Whitelist'}
      </motion.button>
    </form>
  );
};

export default WhitelistForm; 