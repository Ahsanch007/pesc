import React from 'react';
import { GreenCircle } from '../helper/Icon';
import { motion } from "framer-motion";

export default function TitleBar() {
  return (
    <div className='w-full flex justify-between items-center gap-4 md:gap-6 mb-4 md:mb-6'>
      <div className='flex gap-1 md:gap-2'>
        {[...Array(3).keys()].map((_, index) => (
          <motion.span
            key={index}
            className='w-8 max-w-4 md:max-w-6 lg:max-h-none'
            initial={{ scale: 0.4 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, duration: 1 }}
          >
            <GreenCircle />
          </motion.span>
        ))}
      </div>
      <motion.div
        className='bg-[#02AF08] rounded-full border-2 border-white h-7 max-h-4 md:max-h-6 w-full'
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      ></motion.div>
    </div>
  );
}