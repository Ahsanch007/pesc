import React from 'react';
import BuyTokenNow from '../../component/common/BuyTokenNow';
import 'swiper/css';
import 'swiper/css/navigation';
import Character3 from '../../assets/gif/must.png';
import Character8 from '../../assets/gif/peperobot3.png';

import Roadmapcard from './RoadmapPhaseCard';

export default function Roadmap() {
  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8 xl:gap-12 p-4">
        <div>
          <div className={"hidden w-full lg:max-w-[150px] sm:left-[22%] xl:max-w-[300px] xl:left-[18%] 2xl:left-[40%] lg:block absolute left-[41%] sm:top-[-6%] xl:top-[-6%] 2xl:top-[-6%] -z-10 -translate-x-1/2"}>
            <img src={Character3} alt="Character" className='w-full' />
          </div>
          <div className='lg:max-w-[800px] 2xl:max-w-[1100px] xl:min-w-[700px] mx-auto w-auto mt-10'>
            <Roadmapcard />
          </div>
        </div>
        <BuyTokenNow />
      </div>

    </div>
  );
}
