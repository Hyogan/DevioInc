'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from './modal';
import Link from 'next/link';

const Insider = () => {
  // id : AKfycby1wxxO8x0lZ2yW12gBRptX6vChHIao8ONMSyVRtmcRsj7nR-U0jce_V-UlFQNy4wv7
// url : https://script.google.com/macros/s/AKfycby1wxxO8x0lZ2yW12gBRptX6vChHIao8ONMSyVRtmcRsj7nR-U0jce_V-UlFQNy4wv7/exec
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // id AKfycby1wxxO8x0lZ2yW12gBRptX6vChHIao8ONMSyVRtmcRsj7nR-U0jce_V-UlFQNy4wv7
  // web app https://script.google.com/macros/s/AKfycby1wxxO8x0lZ2yW12gBRptX6vChHIao8ONMSyVRtmcRsj7nR-U0jce_V-UlFQNy4wv7/exec
  const URL = "https://script.google.com/macros/s/AKfycby1wxxO8x0lZ2yW12gBRptX6vChHIao8ONMSyVRtmcRsj7nR-U0jce_V-UlFQNy4wv7/exec"



  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await fetch(`${URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }), 
        mode: 'no-cors'
      });
  
      // Even if the response is "opaque," assume success
      openModal();
      // alert("Data submitted successfully!");
      setMessage("Thank you for participating, we will come back to you soon!");
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed.");
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-6 backdrop-blur-lg shadow-lg rounded-lg relative overflow-hidden group"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00b8ff] to-[#00ff94] opacity-10 group-hover:opacity-20 transition-opacity duration-300 rounded-lg" />
      
      <motion.form 
        onSubmit={handleSubmit} 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full relative bg-[var(--primary)]  z-10 flex flex-col gap-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Become an
            <span className="gradient-text"> Insider</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Become an insider, become part of the Devio project and help to build the future of digital health .
          </p>
        </motion.div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-[var(--form-border)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-[var(--form-border)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full p-3 bg-[#00b8ff] text-white font-bold rounded-lg hover:bg-[#0099cc] transition-colors"
        >
          {isLoading ? (
            <ModernLoader />
          ) : (
            'Send'
          )}
        </motion.button>
      </motion.form>
      
      <motion.p 
        className="text-center mt-4 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: message ? 1 : 0 }}
      >
        {message}
      </motion.p>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">Contact saved</h2>
        <p className="text-gray-200 text-center mb-6">
            The Devio team thanks you for participating
          <Link href="https://x.com/devioinc" className="text-blue-400 hover:text-blue-600 mx-1">
            Join us on X
          </Link>
          <br />
          we will come back to you soon !
        </p>
        <div className="flex justify-center">
          <button
            onClick={closeModal}
            className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all ease-in-out duration-300"
          >
            Close
          </button>
        </div>
      </Modal>

      
    </motion.div>
    
  );
};

export default Insider;



const ModernLoader = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="loader">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
      <style jsx>{`
        .loader {
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 50px;
        }
        .dot {
          width: 20px;
          height: 20px;
          background-color: rgb(0, 255, 148);
          border-radius: 50%;
          animation: bounce 1.2s infinite ease-in-out both;
        }
        .dot:nth-child(1) { animation-delay: -1.1s; }
        .dot:nth-child(2) { animation-delay: -1.0s; }
        .dot:nth-child(3) { animation-delay: -0.9s; }
        .dot:nth-child(4) { animation-delay: -0.8s; }
        .dot:nth-child(5) { animation-delay: -0.7s; }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }
      `}</style>
    </>
  )
}
