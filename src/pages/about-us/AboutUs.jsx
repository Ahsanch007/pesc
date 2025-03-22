import React from 'react';
import BuyTokenNow from '../../component/common/BuyTokenNow';
import 'swiper/css';
import 'swiper/css/navigation';
import JoinOurCommunity from '../../component/common/JoinOurCommunity';
import AboutChapterCard from './AboutChapterCard'

export default function AboutUs({ chapterName, chapterTitle, chapterContent,index, joinBtn = true }) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8 xl:gap-12 md:p-4">
      <div className="w-full lg:max-w-[350px] xl:max-w-[800px] lg:ml-[100px] lg:mt-[0px] xl:mt-[140px]">
        <AboutChapterCard chapterName={chapterName} chapterTitle={chapterTitle} chapterContent={chapterContent} index={index} />
        {/* {joinBtn === true && <JoinOurCommunity />} */}
      </div>
      <div className='hidden lg:block'>
        <BuyTokenNow />
      </div>
    </div>
  );
}
