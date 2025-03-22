import React, { useState } from 'react';
import { CloseIcon, CloseMinMaxIcon, CopyIcon } from '../../component/helper/Icon';
import { TokenomicsCardData } from '../../component/helper/helper2';
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function TokenomicsCard() {
  const [copied, setCopied] = useState(false);
  const contractAddress = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx xxxxxxx";
  const { t} = useTranslation();

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ rotateY: 90, opacity: 0, scale: 0.8 }}
      whileInView={{ rotateY: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      viewport={{ once: true }}
      className='w-full rounded-[32px] border-4 border-black shadow-[8px_8px_0px_0px_#02AF08] overflow-hidden bg-white relative z-10 mt-4'
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        className='bg-[#02AF08] border-b-4 border-black p-2 md:p-3 lg:p-4 flex justify-between items-center gap-4'
      >
        <h3 className='text-white ff_SDGlitchDemo text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase !leading-[120%]'>
          {t("tokenomics")}
        </h3>
        <span className='shrink-0 w-full max-w-10 sm:max-w-12 md:max-w-16 lg:max-w-20 xl:max-w-24'>
          <CloseMinMaxIcon />
        </span>
      </motion.div>

      {/* Card Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        viewport={{ once: true }}
        className="p-3 md:py-5 px-3 lg:px-5 space-y-4 md:space-y-6"
      >
        <div className='grid gap-3 xl:gap-4 grid-cols-2 sm:grid-cols-3'>
          {TokenomicsCardData.map((data, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`${index === TokenomicsCardData.length - 1 ? 'col-span-2' : ''} border-2 border-black rounded-xl overflow-hidden bg-[#2065D0]`}
            >
              <div className='bg-[#02AF08] flex justify-end border-b-2 border-black p-1'>
                <CloseIcon />
              </div>
              <div className='flex flex-col justify-center items-center px-3 py-4'>
                <p className='text-white text-center text-base lg:text-lg xl:text-xl font-bold !leading-[141%]'>{t(data.title)}</p>
                <p className='text-white text-center text-base md:text-lg lg:text-xl xl:text-[32px] font-bold !leading-[141%]' style={{color:"#02AF08"}}>{data.pera}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contract Address Copy Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className='flex items-center gap-4 bg-[#FFCF47] rounded-2xl border border-black shadow-[0px_4px_0px_0px_#000] p-2 sm:p-3.5'
        >
          <p className='text-black text-xl font-bold uppercase !leading-[141%] flex items-center gap-2 w-full text-nowrap overflow-hidden'>
            CA:
            <span className='truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-full'>
              {contractAddress}
            </span>
          </p>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative"
          >
            <button onClick={handleCopy} className='w-auto shrink-0 px-1 sm:px-2 md:px-1 py-0.5 sm:py-2 rounded-lg group'>
              <CopyIcon />
            </button>
            {copied && (
              <span
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-2 py-1 rounded-md"
              >
                Copied!
              </span>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
