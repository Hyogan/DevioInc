// 'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import Link from 'next/link';

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  useScrollAnimation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // alert(formState.email);
    // Handle form submission
    console.log('Form submitted:', formState);
  };

  return (
    <section className="py-20 md:py-32 bg-[var(--primary)] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get in
            <span className="gradient-text"> Touch</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you. Send us a message and we&lsquo;ll respond as soon as possible.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-[var(--form-border)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-[var(--form-border)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formState.message}
                  onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-[var(--form-border)]focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                  required
                />
              </div>

              {/* <button
                onClick={moveToJoin}
                type="button"
                className="w-full primary-button"
              >
                Send Message
              </button> */}
              <button className='w-full primary-button'>
                <Link
                  href="https://discord.gg/2KTYvW9q"
                  className="w-full h-full"
                >
                  Send Message
                </Link>
              </button>
              
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 
