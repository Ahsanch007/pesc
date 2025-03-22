import React from 'react';
import { motion } from 'motion/react';
export default function Heading({ heading, className }) {
  return (
    <motion.h1
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      viewport={{ once: true }}
      className={`text-white text-center ff_SDGlitchDemo [text-shadow:0px_4.537px_0px_#000] text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase !leading-[100%] mb-2 md:mb-4 ${className}`}
    >
      {heading}
    </motion.h1>
  );
}
