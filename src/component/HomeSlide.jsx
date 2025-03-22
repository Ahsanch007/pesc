import React from "react";
import CryptoCard from "./CryptoCard";
import { CrossIcon, RightArrowIcon } from "./Icons";
import { welcomeCardData } from "./Helper";

const HomeSlide = () => {
  return (
    <div className="flex gap-5 justify-between 2xl:ps-16 ps-10 pe-16 2xl:pe-24">
      <div className="pt-10">
        <h2 className="2xl:text-[44px] text-[36px] font-bold text-white uppercase max-w-[538px] leading-[120%]">
          The Meme Revolution of AI & Tech!
        </h2>
        <h1 className="ff_SDGlitchDemo text-white uppercase 2xl:text-[161px] text-[140px] leading-[120%]">
          $PESC
        </h1>
        <div className="border-[2px] border-black rounded-[16px] shadow-[4px_4px_0px_0px_#02AF08] max-w-[410px]">
          <div className="bg-primary flex justify-between 2xl:px-6 px-4 2xl:py-4 py-3 rounded-[16px_16px_0_0] items-center border-b-[2px] border-black">
            <p className="ff_SDGlitchDemo 2xl:text-[23px] text-xl font-normal text-white">
              Welcome to $MRBOT
            </p>
            <span>
              <CrossIcon />
            </span>
          </div>
          <div className="bg-white p-5 flex gap-4 flex-col rounded-[0px_0px_16px_16px]">
            {welcomeCardData.map((obj, i) => (
              <div
                className={`bg-secondary 2xl:px-5 px-4 2xl:py-4 py-3 2xl:text-[19px] text-base font-bold border-[3px] border-black 2xl:max-w-[350px] max-w-[270px] rounded-[5px] uppercase text-white ${
                  i % 2 === 0 ? "ms-auto" : ""
                }`}
                key={i}
              >
                <p>{obj}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="2xl:mt-7 mt-5 max-w-[410px]">
          <button className="bg-primary text-white border-[2px] border-white uppercase 2xl:text-xl text-base font-bold 2xl:rounded-[12px] rounded-[8px] 2xl:px-6 px-4 2xl:pt-5 pt-3 2xl:pb-4 pb-2 flex gap-2 items-center mx-auto hover:opacity-95 cursor-pointer">
            Join our community
            <span>
              <RightArrowIcon />
            </span>
          </button>
        </div>
      </div>
      <div className="2xl:max-w-[348px] max-w-[300px] relative mt-20 me-10 2xl:me-0">
        <div className="2xl:min-w-[348px] min-w-[300px] bg-white rounded-[4px] border-[2px] border-black absolute top-[-20px] right-[-20px] 2xl:max-w-[348px] max-w-[300px]">
          <div className="bg-secondary flex justify-between px-4 py-1.5 rounded-[2px_2px_0_0] items-center border-b-[2px] border-black">
            <p className="ff_SDGlitchDemo text-[22px] font-normal text-white">
              Welcome to $MRBOT
            </p>
            <span>
              <CrossIcon />
            </span>
          </div>
          <p className="text-xl font-bold px-4 py-5">
            Your Ticket to the Meme Revolution
          </p>
        </div>
        <div className="2xl:min-w-[348px] min-w-[300px] bg-white rounded-[4px] border-[2px] border-black absolute top-[-10px] right-[-10px] 2xl:max-w-[348px] max-w-[300px]">
          <div className="bg-secondary flex justify-between px-4 py-1.5 rounded-[2px_2px_0_0] items-center border-b-[2px] border-black">
            <p className="ff_SDGlitchDemo text-[22px] font-normal text-white">
              Welcome to $MRBOT
            </p>
            <span>
              <CrossIcon />
            </span>
          </div>
          <p className="text-xl font-bold px-4 py-5">
            Your Ticket to the Meme Revolution
          </p>
        </div>
        <div className="2xl:min-w-[348px] min-w-[300px] bg-white rounded-[4px] border-[2px] border-black relative z-10 ">
          <div className="bg-secondary flex justify-between px-4 py-1.5 rounded-[2px_2px_0_0] items-center border-b-[2px] border-black">
            <p className="ff_SDGlitchDemo text-[22px] font-normal text-white">
              Welcome to $MRBOT
            </p>
            <span>
              <CrossIcon />
            </span>
          </div>
          <p className="text-xl font-bold px-4 py-5">
            Your Ticket to the Meme Revolution
          </p>
        </div>
      </div>
      <CryptoCard />
    </div>
  );
};

export default HomeSlide;
