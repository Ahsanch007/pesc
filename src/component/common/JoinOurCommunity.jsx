import React from 'react';
import { RightPointArrowIcon } from '../helper/Icon';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";
export default function JoinOurCommunity() {
    const { t, i18n: { changeLanguage, language } } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)" }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-full max-w-[322px] mx-auto"
    >
      <Link
        to='https://t.me/PepeScapePortal'
        className='flex items-center justify-center gap-2 bg-[#02AF08] border-2 border-white rounded-xl shadow-[1px_4px_0px_0px_#111214] text-base sm:text-lg md:text-xl text-white font-bold uppercase !leading-[150%] mt-4 md:mt-6 lg:mt-10 px-4 py-4 md:py-[18px] text-nowrap group transition-all duration-300 ease-in-out hover:bg-opacity-95 group'
      >
        <span>{t("join_society")}</span>
        <span
          className="shrink-0 group-hover:translate-x-2 transition-all duration-300 ease-in-out"
        >
          <RightPointArrowIcon />
        </span>
      </Link>
    </motion.div>
  );
}
