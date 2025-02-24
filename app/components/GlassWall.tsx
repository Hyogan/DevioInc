import React from 'react';
import { motion } from 'framer-motion';

const GlassWall: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="grid grid-cols-3 gap-4">
        {[...Array(9)].map((_, index) => (
          <motion.div
            key={index}
            className="w-32 h-32 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </div>
      <motion.div
        className="absolute text-white p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p>
          We are trapped behind a glass wall of distractions, lost in a digital
          world designed to consume our attention. Devio is here to break that
          barrier, bringing back true ownership, focus, and freedom in the
          crypto space.
        </p>
        <div className="mt-4">
          <a href="https://x.com/DevioInc" className="text-white underline">
            x.com/DevioInc
          </a>
          <p>Take back control</p>
        </div>
      </motion.div>
    </div>
  );
};


export default GlassWall;