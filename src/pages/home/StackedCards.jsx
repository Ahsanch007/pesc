import { motion } from "framer-motion";
import { CrossIcon } from "../../component/Icons";
import { useTranslation } from "react-i18next";

const StackedCards = () => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, x: 30 },
    visible: (custom) => ({
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { delay: custom * 0.15, type: "spring", stiffness: 200, damping: 10 },
    }),
  };

  const offsets = [-10, 0];
    const { t, i18n: { changeLanguage, language } } = useTranslation();

  return (
    <div className="bg-white rounded-[32px] border-4 min-w-[50px] max-w-[500px] border-black shadow-[8px_8px_0px_0px_#02AF08] overflow-hidden padding-bottom">
      {offsets.map((offset, index) => (
        <motion.div
          key={index}
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
          className="absolute bg-white rounded-[4px] border-[2px] border-black w-full"
          style={{ top: `${offset}px`, right: `${offset}px`, zIndex: index }}
        >
          <div className="bg-secondary flex justify-between px-2 xl:px-4 py-1.5 rounded-t-[2px] items-center border-b-[2px] border-black">
            <p className="ff_SDGlitchDemo uppercase text-base xl:text-lg 2xl:text-[22px] font-normal text-white">
              {t("welcome")} $PESC
            </p>
            <span>
              <CrossIcon />
            </span>
          </div>
          <p className="text-2sm  font-bold px-1.5 xl:px-4 py-2 xl:py-5">
            <text style={{color:"#ff0000"}}>{t("crypto")}</text> {t("stackedCard_1")} <text style={{color:"#ff0000"}}>{t("stackedCard_2")}</text>{t("stackedCard_3")} {t("stackedCard_4")}<text style={{color:"#02af08"}}>{t("stackedCard_5")}</text> {t("stackedCard_6")} <text style={{color:"#02af08"}}>{t("stackedCard_7")}</text>{t("stackedCard_8")}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default StackedCards;
