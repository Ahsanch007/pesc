import React from "react";
import Header from "./Header";
import SideIcons from "./SideIcons";
import FooterSlider from "./FooterSlider";
import HomeSlide from "./HomeSlide";
import Slider from "react-slick";

const MainSlider = () => {
  var settings = {
    dots: false,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
  };
  return (
    <>
      <div className="bg_home min-h-screen 2xl:min-h-[1000px] bg-cover bg-center">
        <Header />
        <div className="container px-5 mx-auto py-10 relative 2xl:max-w-[1670px] 2xl:mt-10">
          <Slider {...settings}>
            <HomeSlide />
            <HomeSlide />
            <HomeSlide />
          </Slider>

          <SideIcons />
        </div>
      </div>
      <FooterSlider />
    </>
  );
};

export default MainSlider;
