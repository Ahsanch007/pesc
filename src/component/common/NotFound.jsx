import React from 'react';
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <motion.div
        className='fixed inset-0 flex flex-col items-center justify-center h-screen text-center bg-black/50 backdrop-blur-lg'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.h1
          className='text-8xl font-extrabold text-red-600'
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          404
        </motion.h1>
        <motion.p
          className='text-2xl text-white mt-4'
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          Oops! This page does not exist.
        </motion.p>

      </motion.div>
    </div>
  );
};

export default NotFound;
