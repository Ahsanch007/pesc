import React, { useState } from "react";
import {
  CloseMinMaxIcon,
  CloseIcon,
  DropdownWhiteBorderIcon,
} from "../../component/helper/Icon";
import { CrossIcon } from "../../component/Icons";
import { HowToBuyData } from "../../component/helper/helper2";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function HomeWelcomeCard() {
  const [openIndex, setOpenIndex] = useState(0);
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? openIndex : index);
  };
  return (
    <motion.div
      initial={{ rotateY: 90 }}
      whileInView={{ rotateY: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      viewport={{ once: true }}
      className="bg-white rounded-[32px] border-4 border-black shadow-[8px_8px_0px_0px_#02AF08] overflow-hidden"
    >
      <div className="bg-[#02AF08] border-b-4 border-black flex justify-end py-2 md:py-3 px-4 md:px-6 xl:px-8">
        <span className="shrink-0 h-full max-w-10 sm:max-w-12 md:max-w-16 lg:max-w-20 xl:max-w-24">
          <CloseIcon />
        </span>
      </div>
      <div className="bg-white px-4 md:px-6 lg:px-4 py-3">
        <div className="rounded-3xl  space-y-4  text-justify">
          {HowToBuyData.map((data, index) => (
            <div
              key={index}
              className="transition-all duration-300 ease-in-out hover:scale-[102%]"
            >
              <div
                className="flex items-center justify-between gap-4 bg-[#136FFF] border-2 border-black rounded-2xl shadow-[2px_4px_0px_0px_#000] p-3 cursor-pointer "
                onClick={() => handleToggle(index)}
              >
                <h4 className="text-white text-lg  2xl:text-[32px] font-bold uppercase !leading-[100%]">
                  {t(data.que)}
                </h4>
                <span
                  className={`transition-transform w-8 lg:w-10 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <DropdownWhiteBorderIcon />
                </span>
              </div>
              {openIndex === index && (
                <div className="w-[95%]  mx-auto bg-[#000000] text-sm text-white 2xl:text-base rounded-b-2xl shadow-[2px_4px_0px_0px_#000] border-[3px] md:border-4 border-black border-dashed border-t-0 mt-1 p-2 sm:p-4 ">
                  <p>{t(data.ans)}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
