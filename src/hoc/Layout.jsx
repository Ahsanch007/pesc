import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Header from './../component/Header';
import FooterSlider from './../component/FooterSlider';
import Character1 from './../assets/gif/character2.gif';
import Character7 from './../assets/gif/headlogo.gif';
import Character2 from './../assets/gif/dddgg.gif';
import Character3 from './../assets/gif/must.png';
import Character6 from './../assets/gif/must.png';
import Character4 from './../assets/img/2.png';
import Character8 from './../assets/gif/headlogo.gif';
import Piece1 from './../assets/img/bg_piece/piece1.webp';
import Piece2 from './../assets/img/bg_piece/piece2.webp';
import Piece3 from './../assets/img/bg_piece/piece3.webp';
import Piece4 from './../assets/img/bg_piece/piece4.webp';
import Piece5 from './../assets/img/bg_piece/piece5.webp';
import Piece6 from './../assets/img/bg_piece/piece6.webp';
import Piece7 from './../assets/img/bg_piece/piece7.webp';
import Piece8 from './../assets/img/bg_piece/piece8.webp';
import Piece9 from './../assets/img/bg_piece/piece9.webp';
import Piece10 from './../assets/img/bg_piece/piece10.webp';
import Piece11 from './../assets/img/bg_piece/piece11.webp';
import bgVideo from './../assets/video/vect.mp4';
import desktopBg from './../assets/gif/bg.gif';
import mobileBg from './../assets/gif/bg.gif';
import { useTranslation } from 'react-i18next';



export default function Layout({ children }) {
  const [bgImage, setBgImage] = useState(mobileBg);
  const { t } = useTranslation();
  const location = useLocation();
  const hash = location.hash.replace('#', '');

  useEffect(() => {
    const updateBg = () => {
      if (window.innerWidth >= 1024) {
        setBgImage(desktopBg);
      } else {
        setBgImage(mobileBg);
      }
    };

    updateBg(); // Set initial background
    window.addEventListener('resize', updateBg);

    return () => window.removeEventListener('resize', updateBg);
  }, []);

  const getCharacterImg = () => {
    if (location.pathname === '/' && ['home'].includes(hash)) {
      return Character7;
    }
    if (location.pathname === '/' && ['faq', 'about'].includes(hash)) {
      return Character2;
    }
    if (location.pathname === '/' && ['about-us2'].includes(hash)) {
      return Character1;
    }
    if (location.pathname === '/' && ['how-to-buy'].includes(hash)) {
      return Character4;
    }
    if (location.pathname === '/' && ['about-us', 'about-us3', 'about-us4', 'roadmap'].includes(hash)) {
      return Character6;
    }
    if (location.pathname === '/' && ['tokenomics', 'referral'].includes(hash)) {
      return Character1;
    }
    if (location.pathname === '/buy-and-stake') {
      return null;
    }
    return Character7;
  };

  const getBgPieceImg = () => {
    if (location.pathname === '/' && ['home'].includes(hash)) {
      return [Piece1, Piece2];
    }
    if (location.pathname === '/' && ['about', 'about-us', 'about-us2', 'about-us3', 'about-us4'].includes(hash)) {
      return [Piece5, Piece4];
    }
    if (location.pathname === '/' && ['how-to-buy'].includes(hash)) {
      return [Piece4];
    }
    if (location.pathname === '/' && ['tokenomics'].includes(hash)) {
      return [Piece8, Piece9, Piece4];
    }
    if (location.pathname === '/' && ['roadmap'].includes(hash)) {
      return [Piece5, Piece11, Piece4];
    }
    if (location.pathname === '/' && ['faq'].includes(hash)) {
      return [Piece5, Piece10];
    }
    if (location.pathname === '/' && ['referral'].includes(hash)) {
      return [Piece5, Piece9, Piece4];
    }
    return [Piece1, Piece2];
  };

  let divClass = '';
  let pieceClass = [];

  switch (hash) {
    case '':
    case 'home':
      divClass = 'hidden w-full lg:max-w-[250px] xl:max-w-[450px] lg:block absolute left-[230px] bottom-40 2xl:bottom-10 -translate-x-1/2 overflow-hidden';
      pieceClass = [
        'w-full lg:max-w-[80px] xl:max-w-[100px] lg:block absolute left-[28%] bottom-[30%] -translate-x-1/2',
        'w-full lg:max-w-[150px] xl:max-w-[180px] lg:block absolute xl:left-[77%] bottom-0 -translate-x-1/2'
      ];
      break;
    case 'tokenomics':
      divClass = 'hidden w-full lg:max-w-[250px] xl:max-w-[500px] lg:block absolute left-[17%] bottom-0 -translate-x-1/2';
      pieceClass = [
        'hidden w-full lg:max-w-[350px] xl:max-w-[700px] lg:block absolute left-[17%] top-0 -z-10 -translate-x-1/2',
        'hidden w-full lg:max-w-[350px] xl:max-w-[700px] lg:block absolute left-[17%] bottom-10 -z-10 -translate-x-1/2',
        'hidden w-full lg:max-w-[100px] xl:max-w-[130px] lg:block absolute left-[96.6%] bottom-10 -translate-x-1/2'
      ];
      break;
    case 'how-to-buy':
      divClass = 'hidden w-full lg:max-w-[450px] xl:max-w-[900px] lg:block absolute left-1/2 bottom-0 left-[52%] bottom-[1%] -translate-x-1/2';
      pieceClass = [
        'hidden w-full lg:max-w-[100px] xl:max-w-[130px] lg:block absolute left-[96.6%] bottom-10 -translate-x-1/2'
      ];
      break;
    case 'about':
    case 'about-us':
    case 'about-us2':
    case 'about-us3':
    case 'about-us4':
      divClass = 'hidden';
      pieceClass = [
        'w-full lg:max-w-[150px] xl:max-w-[192px] lg:block absolute left-[26%] top-0 -z-10 -translate-x-1/2',
        'hidden w-full lg:max-w-[100px] xl:max-w-[130px] lg:block absolute left-[96.6%] bottom-10 -translate-x-1/2'
      ];
      break;
    case 'faq':
      divClass = 'hidden w-full lg:max-w-[250px] xl:max-w-[500px] lg:block absolute left-1/2 bottom-0 -translate-x-1/2';
      pieceClass = [
        'w-full lg:max-w-[150px] xl:max-w-[192px] lg:block absolute left-[26%] top-0 -z-10 -translate-x-1/2',
        'hidden w-full lg:max-w-[150px] xl:max-w-[460px] lg:block absolute left-[88%] bottom-[40px] -translate-x-1/2'
      ];
      break;
    case 'referral':
      divClass = 'hidden';
      pieceClass = [
        'w-full lg:max-w-[150px] xl:max-w-[192px] lg:block absolute left-[26%] top-0 -z-10 -translate-x-1/2',
        'hidden w-full lg:max-w-[350px] xl:max-w-[700px] lg:block absolute left-[17%] bottom-[40%] -z-10 -translate-x-1/2',
        'hidden w-full lg:max-w-[100px] xl:max-w-[130px] lg:block absolute left-[96.6%] bottom-10 -translate-x-1/2'
      ];
      break;
    case 'roadmap':
      divClass = 'hidden';
      pieceClass = [
        'w-full lg:max-w-[150px] xl:max-w-[192px] lg:block absolute left-[26%] top-0 -z-10 -translate-x-1/2',
        'hidden w-full lg:max-w-[350px] xl:max-w-[700px] scale-110 lg:block absolute left-[60%] bottom-[80px] -translate-x-1/2',
        'hidden w-full lg:max-w-[100px] xl:max-w-[130px] lg:block absolute left-[96.6%] bottom-10 -translate-x-1/2'
      ];
      break;
    default:
      divClass = 'bg-gray-500';
  }

  const characterImg = getCharacterImg();
  const bgPieceImg = getBgPieceImg();
  const bgClass = () => {
    if (location.pathname === '/') {
      return 'bg_home';  // Background for the homepage
    } else if (location.pathname === '/about') {
      return 'bg_home2'; // Background for the "about" page
    } else if (location.pathname === '/faq') {
      return 'bg_home3'; // Background for the "faq" page
    }
    return 'bg_home'; // Default background class
  };
  return (
    <div className={` bgBanner`}>
     {/* <div className={`min-h-screen 2xl:min-h-[1000px] bg-cover bg-center`}> */}
      {/*<img src={bgVideo} alt="Character" className="absolute top-0 left-0 w-full h-full object-cover -z-20" />*/}
      <Header text={t('flow_text')} />
      <div className="relative">

      <div className={divClass}>
        <img src={characterImg} alt="Character" style={{ width: '100%', height: '50%' }} className="w-full" />
      </div>
      {bgPieceImg.map((pcdata, index) => (
        <div className={pieceClass[index]} key={index}>
          <img src={pcdata} alt="Piece" className="w-full" />
        </div>
      ))}
      <main className="w-full h-full max-w-[1700px] mx-auto lg:px-5">{children}</main>
      <FooterSlider text={t('flow_text')} />
      </div>

    </div>
  );
}