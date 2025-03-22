import React from "react";
import BringFriendCard from "./BringFriendCard";
import ReferralCard from "./ReferralCard";
import BuyTokenNow from "../../component/common/BuyTokenNow";
import Character1 from "../../assets/gif/ro.gif";
import { useTranslation } from "react-i18next";

export default function Referral() {
  const {t} = useTranslation();
  return (
    <div className=" mx-auto flex flex-col lg:flex-row justify-between relative items-start gap-6 lg:gap-8 xl:gap-12 p-4">
              <div
          className={
            "hidden w-full lg:max-w-[100px] xl:max-w-[200px] lg:block absolute bottom-[-100px] left-[150px] -z-10 -translate-x-1/2"
          }
        >
        
        </div>
      <div className="w-full lg:max-w-[300px] xl:max-w-[350px] relative">
        <ReferralCard />

      </div>
      <div className="w-full lg:max-w-[450px] xl:max-w-[800px] ">
        <h2 className="text-white text-center lg:text-xl ff_SDGlitchDemo [text-shadow:0px_4.537px_0px_#000] xl:text-6xl uppercase !leading-[100%] mb-4 md:mb-7">
          {t("bring")}
        </h2>
        <BringFriendCard />
      </div>
      <div className="hidden lg:block">
        <BuyTokenNow />
      </div>
    </div>
  );
}
