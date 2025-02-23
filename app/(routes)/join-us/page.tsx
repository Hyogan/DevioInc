'use client';
import Link from 'next/link';
import React from 'react';
import { FaDiscord, FaEnvelope, FaInstagram, FaTiktok } from 'react-icons/fa6';
import { motion } from 'framer-motion';

const JoinUs = () => {
  return (
    <div className="bg-[rgb(var(--background-primary))] py-20 px-6">
      <section id="join-us" className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-[rgb(var(--accent-color))] mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Help Devio Come to Life!
        </motion.h2>
        <motion.p
          className="text-lg text-[rgb(var(--text-secondary))] mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          To make this magnificent project a reality, <br />
          <span className="font-semibold text-[rgb(var(--accent-color))]">we need your help!</span>
        </motion.p>
        <motion.p
          className="text-md text-[rgb(var(--text-secondary))] mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          The project lacks passionate developers and collaborators. Your expertise, ideas, or even just your motivation could make all the difference. If you&apos;re a developer, designer, or simply curious to contribute to a project that could improve thousands of lives, don&apos;t hesitate to join us:
        </motion.p>
        <motion.div
          className="flex flex-col md:flex-row items-center gap-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <motion.a
            href="mailto:devioappinc@gmail.com"
            className="bg-[rgb(var(--accent-color))] text-white px-8 py-3 rounded-lg text-md font-semibold hover:bg-[rgb(var(--accent-color))]/80 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send us an email
          </motion.a>
          <Link
            href="https://discord.gg/2KTYvW9q"
            className="bg-transparent text-[rgb(var(--accent-color))] border-2 border-[rgb(var(--accent-color))] hover:bg-[rgb(var(--accent-color))] hover:bg-opacity-30  px-8 py-3 rounded-lg text-md font-semibold hover:text-white transition duration-300"
          >
            Join our community server
          </Link>
        </motion.div>
        <motion.p
          className="text-md text-[rgb(var(--text-secondary))] mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          With your help, we can build an application that transforms our relationship with technology. <br />
          <span className="font-semibold text-[rgb(var(--accent-color))]">Thank you for believing in Devio!</span>
        </motion.p>
        <motion.div
          className="flex justify-center items-center gap-4 py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <SocialIcons />
        </motion.div>
      </section>
    </div>
  );
};

const SocialIcons = () => {
  return (
    <>
      <motion.div
        className="flex justify-center items-center gap-4 py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <motion.a
          href="https://www.instagram.com/devioinc/"
          className="p-2 rounded-md text-white bg-[var(--social-instagram)] hover:bg-[rgb(--social-instagram)]/80  transition duration-300 text-2xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaInstagram />
        </motion.a>
        <motion.a
          href="https://www.tiktok.com/@devioapp"
          className="p-2 rounded-md text-white bg-[var(--social-tiktok)]  hover:bg-[var(--social-tiktok)]/80  transition duration-300 text-2xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaTiktok />
        </motion.a>
        <motion.a
          href="mailto:devioappinc@gmail.com"
          className="p-2 rounded-md text-white bg-[var(--social-email)] hover:bg-[var(--social-email)]/80  transition duration-300 text-2xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaEnvelope />
        </motion.a>
        <motion.a
          href="https://discord.gg/2KTYvW9q"
          className="p-2 rounded-md text-white bg-[var(--social-discord)]  hover:bg-[var(--social-discord)]/80  transition duration-300 text-2xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaDiscord />
        </motion.a>
      </motion.div>
    </>
  );
};

export default JoinUs;
