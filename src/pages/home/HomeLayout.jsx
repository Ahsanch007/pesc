import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, HashNavigation } from "swiper/modules";
import { LeftArrowIcon, RightArrowIcon } from "./../../component/helper/Icon";
import Home from "./Home";
import AboutUs from "./../about-us/AboutUs";
import HowtoBuy from "./../how-to-buy/HowtoBuy";
import Tokenomics from "./../tokenomics/Tokenomics";
import Roadmap from "./../roadmap/Roadmap";
import Faq from "./../faq/Faq";
import Referral from "./../referral/Referral";
import SideIcons from "./../../component/SideIcons";
import BuyTokenNow from "../../component/common/BuyTokenNow";
import HowToBuycard from "../how-to-buy/HowToBuycard";
import Auditcard from "../how-to-buy/Auditcard";
import FeaturedIn from "../how-to-buy/FeaturedIn";
import TokenomicsCard from "../tokenomics/TokenomicsCard";
import Roadmapcard from "../roadmap/RoadmapPhaseCard";
import { AboutUsData } from "../../component/helper/helper2";
import layoutVideo from "./../../assets/video/layout.mp4";
import mobile1 from "./../../assets/gif/character2.gif";
import mobile9 from "./../../assets/gif/headlogo.gif";
import mobile10 from "./../../assets/gif/dddgg.gif";
import mobile8 from "./../../assets/gif/character3.png";
import mobile2 from "./../../assets/img/mobile_2.png";
import mobile3 from "./../../assets/img/mobile_3.jpg";
import mobile4 from "./../../assets/img/mobile_4.png";
import mobile7 from "./../../assets/img/desk.png";
import mobile5 from "./../../assets/gif/anim3.gif";
import mobile11 from "./../../assets/gif/peperobot3.png";

import mustread1 from "./../../assets/img/mustread1.png";
import mustread2 from "./../../assets/img/mustread2.png";
import mustread3 from "./../../assets/img/mustread3.png";
import mustread4 from "./../../assets/img/mustread3.png";
import mobile6 from "./../../assets/img/mobile_6.png";
import { motion } from "motion/react";
import { useParams } from "react-router-dom";
import { useAccount } from "wagmi";
import axios from "axios";
import FooterSlider from "../../component/FooterSlider";
import Heading from "../../component/common/Heading";
import { useTranslation } from "react-i18next";

const mustreads = { mustread1, mustread2, mustread3, mustread4 };

export default function HomeLayout() {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();
  const { address } = useAccount();
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const BACKEND_ENDPOINT = "https://pesc-backend.jrswap-mvp.com";
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const referred = params.get("ref");
    console.log("-------referral----------");
    const setReferred = async (walletAddress, referred) => {
      try {
        await axios.post(`${BACKEND_ENDPOINT}/user/setReferred`, {
          walletAddress,
          referred,
        });
      } catch (error) {
        console.error("referral error: ", error);
      }
    };
    if (referred && address) {
      console.log("refferred", referred);
      setReferred(address, referred);
    }
  }, []);

  return (
    <>
      <div className="hidden lg:block">
        <div className="w-full h-full">
          <Swiper
            spaceBetween={30}
            hashNavigation={{ watchState: true }}
            navigation={false}
            modules={[Navigation, HashNavigation]}
            className="w-full h-max"
            
            onSwiper={(swiper) => setSwiperInstance(swiper)}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
          >
            <SwiperSlide data-hash="home">
              <Home />
            </SwiperSlide>
            {AboutUsData.map((data, index) => {
              return (
                <SwiperSlide
                  key={index}
                  data-hash={`about-us${index === 0 ? "" : index + 1}`}
                >
                  <AboutUs
                    chapterName={t(data.chapter)}
                    chapterTitle={t(data.title)}
                    chapterContent={t(data.content)}
                    index = {index}
                  />
                </SwiperSlide>
              );
            })}
            <SwiperSlide data-hash="how-to-buy">
              <HowtoBuy />
            </SwiperSlide>
            <SwiperSlide data-hash="tokenomics">
              <Tokenomics />
            </SwiperSlide>
            <SwiperSlide data-hash="roadmap">
              <Roadmap />
            </SwiperSlide>
            <SwiperSlide data-hash="faq">
              <Faq />
            </SwiperSlide>
            <SwiperSlide data-hash="referral">
              <Referral />
            </SwiperSlide>
          </Swiper>
          {!isBeginning && (
            <button
              className="hidden lg:inline-block absolute top-1/2 -translate-y-1/2 left-0 z-30 min-w-10 w-14 xl:w-[70px] rounded-full group"
              onClick={() => swiperInstance?.slidePrev()}
            >
              <LeftArrowIcon />
            </button>
          )}
          {!isEnd && (
            <button
              className="hidden lg:inline-block absolute top-1/2 -translate-y-1/2 right-0 z-30 min-w-10 w-14 xl:w-[70px] rounded-full group"
              onClick={() => swiperInstance?.slideNext()}
            >
              <RightArrowIcon />
            </button>
          )}
        </div>
        <SideIcons />
      </div>
      <div className="lg:hidden py-4 sm:space-y-10 md:space-y-12 relative">
        {/* <div className={`w-fit mx-auto`}>
          <img src={Character4} alt="Character" />
        </div> */}
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="ff_SDGlitchDemo text-center text-white uppercase text-4xl md:text-5xl lg:text-6xl xl:text-9xl 2xl:text-[101px] text-[80px] leading-[100%]"
        >
          E$CAPE
        </motion.h1>
        <motion.p
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="ff_SDGlitchDemo text-center text-white uppercase text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-[40px] text-[20px] leading-[100%]"
        >
          Félicitations ! Vous êtes parmi les premiers à la fête ! Achetez et
          misez dès maintenant pendant la prévente pour maximiser vos
          récompenses avant que le prix ne monte en flèche !
        </motion.p>
        <img
          src={mobile9}
          width="80%"
          style={{
            paddingBottom: "-10px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <div id="buy" className="px-4">
          <BuyTokenNow />
        </div>
        {/* <video autoPlay loop muted playsInline className="h-full w-full">
          <source src={layoutVideo} type="video/mp4" />
        </video> */}
        <br />
        <div id="audit" className="px-4">
          <div className="w-1/2">
            <Heading heading={t("Audit")} />
          </div>
          <Auditcard />
        </div>
        <br />
        <div id="FeaturedIn" className="px-4">
          <div className="w-1/2"></div>
          <FeaturedIn />
        </div>
        <br />

        <div id="how-to-buy" className="px-4">
          <div className="w-1/2">
            <Heading heading={t("how_to_buy")} />
          </div>
          <HowToBuycard />
        </div>
        <img src={mobile5} width="100%" />
        <FooterSlider text={t("flow_text")} />
        <div id="about" className="space-y-6 p-4">
          {AboutUsData.map((data, index) => {
            const mustreadPath = mustreads[`mustread${index + 1}`];
            return (
              <>
                <AboutUs
                  key={index}
                  chapterName={t(data.chapter)}
                  chapterTitle={t(data.title)}
                  chapterContent={t(data.content)}
                  joinBtn={AboutUsData.length - 1 === index}
                />
                {index < AboutUsData.length - 1 && mustreadPath && (
                  <img
                    src={mustreadPath}
                    width="100%"
                    alt={`mustread-${index}`}
                  />
                )}
              </>
            );
          })}
        </div>
        <FooterSlider text={t("flow_text")} />
        <br />
        <img src={mobile4} width="100%" />
        <div id="token" className="px-4">
          <div className="w-1/2">
            <Heading heading={t("tokenomics")} />
          </div>
          <TokenomicsCard />
        </div>
        <br></br>
        <FooterSlider text={t("flow_text")} />
        <br></br>
        <div id="roadmap" className="px-4">
          <Roadmapcard />
        </div>
        <br></br>
        <FooterSlider text={t("flow_text")} />
        <br></br>
        <div id="faq" className="px-4">
          <Faq />
        </div>
        <img src={mobile11} width="100%" />
        <FooterSlider text={t("flow_text")} />
        <div id="referral" className="px-4">
          <Referral />
        </div>
        {/* <img src={mobile6} width="100%"/> */}
      </div>
    </>
  );
}
