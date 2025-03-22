import React, { useState } from 'react'
import { DropDownUpArrow } from '../../component/helper/Icon'
import { FaqDropDownData } from '../../component/helper/helper2'
import TitleBar from '../../component/common/TitleBar';
import JoinOurCommunity from '../../component/common/JoinOurCommunity';
import Heading from '../../component/common/Heading';
import BuyTokenNow from '../../component/common/BuyTokenNow';
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import SideIcons2 from "../../component/SideIcons2";


export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? openIndex : index);
  };
  const {t} = useTranslation();

  return (
    <div className='flex flex-col lg:flex-row justify-between gap-6 lg:gap-8 xl:gap-12 md:p-4'>
      <motion.div
        initial={{ rotateY: 90 }}
        whileInView={{ rotateY: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        viewport={{ once: true }}
        className='w-full lg:max-w-[543px]'
      >
        <Heading heading={t('FAQ')} />
        <div className='rounded-[27px] bg-white shadow-[6.877px_6.877px_0px_0px_#02AF08] px-4 md:px-7 pb-2 md:pb-4 pt-2 md:pt-4 overflow-hidden'>
          <TitleBar />
          <ul
            className='space-y-1.5'
          >
            {FaqDropDownData.map((data, index) => (
              <li
                key={index}
                className='bg-[#2065D0] border-2 border-black shadow-[2px_3px_0px_0px_#151715] rounded-[21px] overflow-hidden transition-all duration-300 ease-in-out hover:scale-[102%]'
              >
                <div role="button" onClick={() => handleToggle(index)} className='flex justify-between items-center gap-4 cursor-pointer p-2 md:p-4'>
                  <h2 className='text-white text-base sm:text-lg md:text-xl font-bold !leading-[125%] uppercase'>
                    {t(data.question)}
                  </h2>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-4 sm:w-5 md:w-6"
                  >
                    <DropDownUpArrow />
                  </motion.span>
                </div>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === index ? "auto" : 0, opacity: openIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="text-white text-sm md:text-base !leading-[140%] uppercase px-4 md:px-6 pb-4 md:pb-6">
                    {t(data.answer)}
                  </p>
                  {data.question === "FaqDropDownData_q_3" && (
                    <SideIcons2 />
                  )}
                  
                </motion.div>
              </li>
            ))}
          </ul>
        </div>
        {/* <div className='hidden lg:block'>
          <JoinOurCommunity />
        </div> */}
      </motion.div>
      <div className='hidden lg:block'>
        <BuyTokenNow />
      </div>
    </div>
  );
}
