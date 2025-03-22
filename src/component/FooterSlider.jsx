import React from "react";
import Slider from "react-slick";

const FooterSlider = ({ text }) => {
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
  return (
    <div className="bg-secondary relative z-10">
      <Slider {...settings}>
        {numbers.map((number, i) => (
          <div key={i}>
            <div className="flex gap-4 items-center py-3 px-3{text}">
              <span className="inline-block w-4  h-4 rounded-full bg-white "></span>
              <p className="text-base lg:text-lg font-bold text-white text-nowrap">
                {text}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FooterSlider;
