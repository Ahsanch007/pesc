import React from 'react'
import { CrossIcon } from '../../component/Icons'
import { welcomeCardData } from '../../component/Helper'
import JoinOurCommunity from '../../component/common/JoinOurCommunity'
import BuyTokenNow from '../../component/common/BuyTokenNow'
import { motion } from 'motion/react'
import StackedCards from './StackedCards'
import HomeWelcomeCard from './HomeWelcomeCard.jsx'
import { useTranslation } from "react-i18next";
export default function Home() {
  const { t, i18n: { changeLanguage, language } } = useTranslation();
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-3 2xl:flex gap-4 xl:gap-5 justify-between p-4">
      <div className="pt-10">
        <motion.h2
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="2xl:text-[32px] xl:text-[30px] text-2xl font-bold text-white uppercase max-w-[600px] leading-[120%]">
          {t("break")} <text style={{ color: "#00ff1a" }}>{t("free")}</text>.{t("take")} <text style={{ color: "#00ff1a" }}>{t("control")}</text>. {t("join_the_movement")}
        </motion.h2>
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="ff_SDGlitchDemo text-white uppercase text-4xl md:text-5xl lg:text-6xl xl:text-9xl 2xl:text-[161px] text-[140px] leading-[120%]">
          $PESC
        </motion.h1>
      </div>
      <div className="">
        <div className='scale-75 mx-[70px] mt-[30px]'>
          <StackedCards />
        </div>
        <div className='mt-[100px] 2xl:scale-75'>
          <HomeWelcomeCard />
        </div>
        <div className='-mt-[70px]'>
          <JoinOurCommunity />
        </div>
      </div>
      <div className="  hidden 2xl:block ">

        <BuyTokenNow />
      </div>
      <div className="w-full  2xl:hidden ">

        <BuyTokenNow locate={'home'} />
      </div>
    </div>
  )
}
