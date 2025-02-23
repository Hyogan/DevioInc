import Link from 'next/link';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Notif = () => {
  const [isNotifExtended, setIsNotifExtended] = useState(true);

  const handleUpdateisNotifExtended = () => {
    setIsNotifExtended(!isNotifExtended);
  };

  return (
    <>
      <h3 className="text-lg flex w-full items-center justify-center font-semibold text-primary text-gray-950">
        <Link href="/#token" className="w-full flex items-center justify-center text-md text-gray-600">
          <img src="devio.png" className="w-[50px] h-[50px]" alt="Logo devio" />
          <span>🚀 $DEVIO</span>
        </Link>
      </h3>
      <div className="w-full flex flex-col items-start">
        {/* Content Section with Animation */}
        <AnimatePresence>
          {isNotifExtended && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-full overflow-hidden flex flex-col"
            >
              <span>The Devio Currency – Funding the future of screen-time management!</span>
              <span>🔹 Earn & Trade with $DEVIO</span>
              <span>🔹 Join Exclusive Airdrops & Rewards</span>
              <span>🔹 Be Part of the Web3 Revolution</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* X (Twitter) Link */}
        <a
          href="https://x.com/devioinc"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-start text-blue-500 hover:underline text-sm"
        >
          <img src="logo-x.jpg" className="w-[40px] h-[40px]" alt="Logo X" />
          <span className="font-bold">Join us on X</span>
        </a>

        {/* Toggle Button */}
        <button
          onClick={handleUpdateisNotifExtended}
          className="flex items-center justify-center bg-blue-700 px-4 rounded-lg py-2 text-white hover:bg-blue-950 transition-all duration-300"
        >
          <span>{isNotifExtended ? '▲ Less' : '▼ More'}</span>
        </button>
      </div>
    </>
  );
};

export default Notif;
