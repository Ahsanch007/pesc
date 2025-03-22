import React, { useState } from 'react'
import { CloseMinMaxIcon, DropdownWhiteBorderIcon } from '../../component/helper/Icon';
import { HowToBuyData } from '../../component/helper/helper2';
import { HowToBuyData_2 } from '../../component/helper/helper2';
import { motion } from "framer-motion";
import Piece6 from '../../assets/img/bg_piece/piece6.webp';
import coinsult from '../../assets/svg/coinsult.svg';
import solidproof from '../../assets/svg/solidproof.svg';
import { useTranslation } from 'react-i18next';

export default function Auditcard() {
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
        
      
      <div className="bg-white px-4 py-4">
        <div className='rounded-3xl md:p-5 xl:p-2 space-y-4 overflow-hidden'>
          
            <div
               className='transition-all duration-300 ease-in-out hover:scale-[102%]'>
              <div
                className='flex items-center justify-between gap-4 bg-[#02AF08] border-2 border-black rounded-2xl shadow-[2px_4px_0px_0px_#000] p-2 cursor-pointer '
                
              >
                <h4 className='text-white text-[16px] md:text-[20px] xl:text-[24px] font-bold uppercase !leading-[100%]'>
                Token Audit 
                </h4>
                <span className={`transition-transform w-6 lg:w-8 rotate-180}`}>
                  <DropdownWhiteBorderIcon />
                </span>
              </div>
              
              <div className='w-[85%] mx-auto bg-[#191700] text-sm sm:text-base rounded-b-2xl shadow-[2px_4px_0px_0px_#000] border-[3px] md:border-4 border-green-600 border-dashed border-t-0 mt-1 p-2 sm:p-4 flex justify-between'>
  <motion.img 
    src={coinsult} 
    width="48%" 
    alt="Your Image" 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    transition={{ duration: 1 }} 
  />
  <motion.img 
    src={solidproof} 
    width="48%" 
    alt="Your Image" 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    transition={{ duration: 1 }} 
  />
</div>
              
            </div>

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
       
      </div>
      
    </motion.div>
  )
}
