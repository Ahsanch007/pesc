import React, { useState } from 'react'
import { CloseMinMaxIcon, DropdownWhiteBorderIcon } from '../../component/helper/Icon';
import { HowToBuyData } from '../../component/helper/helper2';
import { HowToBuyData_2 } from '../../component/helper/helper2';
import { motion } from "framer-motion";
import Piece6 from '../../assets/img/bg_piece/piece6.webp';
import { useTranslation } from 'react-i18next';

export default function HowToBuycard() {
  const [openIndex, setOpenIndex] = useState(0);
  const {t} = useTranslation();

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? openIndex : index);
  };
  return (
    <motion.div
      initial={{ rotateY: 90 }}
      whileInView={{ rotateY: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      viewport={{ once: true }}
      className='bg-white rounded-[32px] border-4 border-black shadow-[8px_8px_0px_0px_#02AF08] overflow-hidden text-justify'>
        
      {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              className='bg-[#02AF08] border-b-4 border-black p-2 md:p-3 lg:p-4 flex justify-between items-center gap-4'
            >
              <h3 className='text-white ff_SDGlitchDemo text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase !leading-[120%]'>
                {t("how_to_buy")}
              </h3>
              <span className='shrink-0 w-full max-w-10 sm:max-w-12 md:max-w-16 lg:max-w-20 xl:max-w-24'>
                <CloseMinMaxIcon />
              </span>
            </motion.div>
      <div className="bg-white px-4 py-4">
        <div className='rounded-3xl md:p-5 xl:p-2 space-y-4 overflow-hidden'>
          {HowToBuyData_2.map((data, index) => (
            <div
              key={index} className='transition-all duration-300 ease-in-out hover:scale-[102%]'>
              <div
                className='flex items-center justify-between gap-4 bg-[#02AF08] border-2 border-black rounded-2xl shadow-[2px_4px_0px_0px_#000] p-2 cursor-pointer '
                onClick={() => handleToggle(index)}
              >
                <h4 className='text-white text-[16px] md:text-[20px] xl:text-[24px] font-bold uppercase !leading-[100%]'>
                  {t(data.que)}
                </h4>
                <span className={`transition-transform w-6 lg:w-8 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <DropdownWhiteBorderIcon />
                </span>
              </div>
              {openIndex === index && (
                <div className='w-[89%]  mx-auto bg-[#4169E1] text-sm sm:text-base rounded-b-2xl shadow-[2px_4px_0px_0px_#000] border-[3px] md:border-4 border-green-600 border-dashed border-t-0 mt-1 p-2 sm:p-4 '>
                  <p>{t(data.ans)}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className='relative flex gap-2 px-4 md:px-10 pb-4 md:pb-5'>
        {[
          { bg: "#C4FAC4", shape: "rounded" },
          { bg: "#EE323D", shape: "rounded-full" },
          { bg: "#2EB335", shape: "rounded-full" }
        ].map((item, index) => (
          <motion.span
            key={index}
            initial={{ scale: 0.4, opacity: 0.4 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              type: "spring",
              stiffness: 200,
              damping: 10,
              delay: index * 0.2
            }}
            className={`${item.shape === 'rounded' ? 'w-8 md:w-11' : 'w-6 md:w-7'} h-6 md:h-7 ${item.shape} border-[3px] lg:border-[5px] border-black`}
            style={{ backgroundColor: item.bg }}
          ></motion.span>
        ))}
        <motion.img
        src={Piece6}
        alt="Example Image"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        whileHover={{ scale: 1.1 }}
        className='max-w-[60px] absolute right-[20px] top-[-15px] scale-150 ml-[290px]'
      />
      </div>
      
    </motion.div>
  )
}
