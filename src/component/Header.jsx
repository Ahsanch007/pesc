import React, { useState } from "react";
import LanguageDropDown from "./LanguageDropDown";
import { headerData } from "./Helper";
import { Link } from "react-router-dom";
import { MenubtnIcon } from "./helper/Icon";
import SideBar from "./common/SideBar";
import logoImg from './../assets/img/$PESC.png'
import FooterSlider from "./FooterSlider";
import Slider from "react-slick";
import { ConnectButton } from "./wallet/wallet";
import { useTranslation } from "react-i18next";

const Header = ({ text }) => {
  const {t} = useTranslation();
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);
  var settings = {
    dots: false,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 8000,
    pauseOnHover: false,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1.9,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1.6,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.3,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
    setIsSidebarOpen(!isSidebarOpen)
  }
  return (
    <div className="sticky top-0 z-50 lg:static">
      <div className="w-full max-w-[1] mx-auto lg:pt-4 bg-black/40 lg:bg-transparent backdrop-blur-[2px] lg:backdrop-blur-none">
      <div className="flex flex-wrap items-center justify-between px-4 lg:px-5">
      <div className="xl:w-auto flex items-center gap-3">
        <Link to={'/'}
          className="ff_SDGlitchDemo text-2xl lg:text-[28px] xl:text-[33px] font-bold text-white leading-[140%] 
          [text-shadow:0px_4.537px_0px_#000] flex items-center gap-3"
        >
          <span className="w-full max-w-10 lg:max-w-14">
            <img src={logoImg} alt="logo img" className="w-full h-auto" style={{ border: '2px solid white', borderRadius: '50%' }}/>
          </span>
          <span>$PESC</span>
        </Link>
      </div>
      <ul className="hidden lg:flex flex-wrap xl:gap-4 gap-3 xl:w-auto">
        {headerData.map((obj, i) => (
          <li key={i}>
            <a href={obj.path}
              className={`${obj.bg} truncate text-nowrap uppercase inline-block 
              xl:pb-2 xl:pt-3 pt-2 pb-1 xl:px-4 px-3 rounded-[4px] border border-white 
              xl:shadow-[4px_4px_0px_0px_#fff] shadow-[3px_3px_0px_0px_#fff] 
              xl:text-xl text-lg font-bold transition-all duration-300 ease-in-out 
              hover:shadow-none hover:bg-opacity-95`}
            >
              {t(obj.value)}
            </a>
          </li>
        ))}
      </ul>
      <div className="hidden lg:flex flex-wrap gap-3 items-center xl:w-auto justify-end">
        <button className="rounded-[4px] border-[2px] border-white text-amber-400 bg-primary 
          bg-opacity-0 xl:py-2 py-1 xl:px-4 px-3 xl:text-xl text-lg font-bold text-white 
          transition-all duration-300 ease-in-out hover:bg-opacity-90">
          {t("WHITEPAPER")}
        </button>
        <LanguageDropDown />
        <ConnectButton
              label="Buy $PESC"
              showBalance={false}
            />
        {/* <button className="w-auto rounded-[4px] border-[2px] border-white bg-primary 
          xl:py-2 py-1 xl:px-4 px-3 xl:text-xl text-lg font-bold text-white 
          transition-all duration-300 ease-in-out hover:bg-opacity-90">
          CONNECT WALLET
        </button> */}
      </div>
      <button onClick={toggleSidebar} className="w-16 lg:hidden">
        <MenubtnIcon />
      </button>
    </div>
        <div className="bg-zinc-800 relative z-10 mt-4">
          <Slider {...settings}>
            {numbers.map((number, i) => (
              <div key={i}>
                <div className="flex gap-4 items-center py-3 px-3{text}">
                  <span className="inline-block w-4  h-4 rounded-full bg-green-500 "></span>
                  <p className="text-base lg:text-lg font-bold text-nowrap" style={{color:"#00ff1a"}}>
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <SideBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={toggleSidebar} />
    </div>
  );
};

export default Header;
