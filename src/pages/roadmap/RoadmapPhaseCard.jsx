import React, { useRef } from 'react';
import TitleBar from '../../component/common/TitleBar';
import Heading from '../../component/common/Heading';
import { Swiper, SwiperSlide } from 'swiper/react';
import { RoadmapSliderData } from '../../component/helper/helper2';
import { Navigation } from 'swiper/modules';
import { LeftArrowIcon, RightArrowIcon } from '../../component/helper/Icon';
import JoinOurCommunity from '../../component/common/JoinOurCommunity';
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";


const RoadmapPhaseCard = ({ heading, points }) => {
  const { t} = useTranslation();
  return (
    <motion.div
      initial={{ rotateY: 90 }}
      whileInView={{ rotateY: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      viewport={{ once: true }}
      className="bg-[#2065D0] rounded-[27px] overflow-hidden border-[3px] border-black shadow-[6.877px_6.877px_0px_0px_#02AF08] px-4 md:px-7 py-3 md:py-4 m-2 md:m-4 h-full">
      <TitleBar />
      <div className="bg-white rounded-[21px] overflow-hidden border-[3px] border-black mt-6 h-full">
        <div className="bg-[#02AF08] border-b-2 border-black px-4 py-2 lg:py-4 xl:py-6">
          <motion.h3
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="text-white ff_SDGlitchDemo text-xl md::text-2xl lg::text-3xl xl:text-[38px] text-center uppercase leading-[120%]">
            {heading}
          </motion.h3>
        </div>
        
        <ul className="p-2 sm:p-4 md:p-6 space-y-4 xl:space-y-1 h-full ">
          {points.map((point, i) => (
            <li
              key={i} className="flex  gap-3 md:gap-4">
              <span className="bg-[#02AF08] mt-[2px] inline-block shadow-[1.81px_1.81px_0px_0px_#000] rounded-full h-4 w-4 shrink-0"></span>
              <p className="text-black text-base sm:text-md md:text-lg lg:text-[16px] font-bold uppercase leading-[131%]">
                {t(point)}
              </p>
            </li>
          ))}
        </ul>
      </div>
      
    </motion.div>
  )
}
export default function Roadmapcard() {
  const swiperRef = useRef(null);
  const { t} = useTranslation();

  return (
    <div className="w-full lg:max-w-[455px] xl:max-w-[1100px] h-auto mt-15">
      <div className='w-1/2'>
        <Heading heading={t('Roadmap')} />
      </div>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        navigation={false}
        modules={[Navigation]}
        className="mySwiper max-w-full"
      >
        {RoadmapSliderData.map((data, index) => (
          <SwiperSlide key={index}>
            <RoadmapPhaseCard heading={t(data.heading)} points={data.points} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center gap-4">
        <button
          className="min-w-10 w-14 xl:w-[70px] group p-1"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <LeftArrowIcon />
        </button>
        <button
          className="min-w-10 w-14 xl:w-[70px] group p-1"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <RightArrowIcon />
        </button>
      </div>
    </div>
  );
}