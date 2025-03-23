import React from 'react';
import { CloseMinMaxIcon } from '../../component/helper/Icon';
import { motion } from "framer-motion";
// import Character3 from '../../assets/gif/must.png';
import Piece3 from '../../assets/img/bg_piece/piece3.webp';
import Character1 from '../../assets/gif/peperobot3.png';
import Character2 from '../../assets/img/mustread3.png';
import Character3 from '../../assets/img/mustread2.png';
import Character4 from '../../assets/img/mustread1.png';

export default function AboutChapterCard({ chapterName, chapterTitle, chapterContent, index }) {
  return (
    <motion.div
      initial={{ rotateY: 90, opacity: 0, scale: 0.8 }}
      whileInView={{ rotateY: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      viewport={{ once: true }}
      className='text-justify relative'
    >
      {/* Background Images */}
      {index===0&&<div className="hidden lg:block w-full max-w-[150px] xl:max-w-[300px] absolute left-[71%] bottom-[70%] -z-10 -translate-x-1/2">
        <img src={Character1} alt="Character" className="w-full" />
      </div>}
      {index===1&&<div className="hidden lg:block w-full max-w-[150px] xl:max-w-[300px] absolute left-[71%] bottom-[85%] -z-10 -translate-x-1/2">
        <img src={Character2} alt="Character" className="w-full" />
      </div>}
      {index===2&&<div className="hidden lg:block w-full max-w-[150px] xl:max-w-[300px] absolute left-[71%] bottom-[80%] -z-10 -translate-x-1/2">
        <img src={Character3} alt="Character" className="w-full" />
      </div>}
      {index===3&&<div className="hidden lg:block w-full max-w-[150px] xl:max-w-[300px] absolute left-[71%] bottom-[85%] -z-10 -translate-x-1/2">
        <img src={Character4} alt="Character" className="w-full" />
      </div>}
      
     
      {/* Chapter Title */}
      <h2 className="w-full  text-white text-4xl lg:text-5xl xl:text-6xl ff_SDGlitchDemo text-left uppercase !leading-[60%] ml-5 mb-5 xl:mb-7">
        {chapterName}
      </h2>

      {/* Chapter Content Card */}
      <div className="bg-white rounded-[32px] overflow-hidden border-4 border-black shadow-[3px_4px_0px_0px_#02AF08] m-1 max-w-full  mx-auto">
        <div className="bg-[#02AF08] border-b-[6px] border-black flex justify-between items-center gap-4 px-2 md:px-6 lg:px-8 py-2 md:py-4 lg:py-5">
          <h3 className="text-white  ff_SDGlitchDemo text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[38px] uppercase !leading-[100%]">
            {chapterTitle}
          </h3>
          <span className="shrink-0 w-full max-w-10 sm:max-w-12 md:max-w-16 lg:max-w-20 xl:max-w-24">
            <CloseMinMaxIcon />
          </span>
        </div>
        <div className="p-2 md:p-3">
          <div className="bg-[#2065D0] rounded-2xl border-[5px] border-black p-4 lg:p-6">
            <p className="text-white lg:text-lg xl:text-xl font-bold uppercase !leading-[131%]">
              {chapterContent}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
