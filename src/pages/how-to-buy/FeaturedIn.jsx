import React, { useState } from 'react';
import Slider from 'react-slick';
import feature_1 from '../../assets/svg/feature_1.svg';
import feature_2 from '../../assets/svg/feature_2.svg';
import feature_3 from '../../assets/svg/feature_3.svg';
import feature_4 from '../../assets/svg/feature_4.svg';
import feature_5 from '../../assets/svg/feature_5.svg';
import feature_6 from '../../assets/svg/feature_6.svg';

export default function FeaturedIn() {
  const [slickOptions] = useState({
    dots: false, // Disable dots
    infinite: true,
    speed: 500,
    autoplay: true, // Enable auto sliding
    autoplaySpeed: 2000, // Time between each slide change in ms
    slidesToShow: 2, // Show one slide at a time vertically
    slidesToScroll: 1,
    vertical: false, // Enable vertical slide
    verticalSwiping: false, // Enable swiping vertically
    arrows: false, // Disable left and right arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  });

  const featuredLinks = [
    {
      href: 'https://cryptopotato.com/pepeto-the-rising-memecoin-contender-set-to-rival-pepe-in-2025/',
      imgSrc: feature_1,
      alt: 'featured-img',
    },
    {
      href: 'https://cryptoslate.com/press-releases/pepeto-the-rising-memecoin-contender-set-to-rival-pepe-in-2025/',
      imgSrc: feature_2,
      alt: 'featured-img',
    },
    {
      href: 'https://cryptodaily.co.uk/2024/11/pepeto-the-rising-memecoin-contender-set-to-rival-pepe-in-2025',
      imgSrc: feature_3,
      alt: 'featured-img',
    },
    {
      href: 'https://www.cryptotimes.io/2024/11/14/pepeto-the-rising-memecoin-contender-set-to-rival-pepe-in-2025/',
      imgSrc: feature_4,
      alt: 'featured-img',
    },
    {
      href: 'https://coinpedia.org/press-release/pepeto-next-memecoin-to-surpass-pepe-in-2025/',
      imgSrc: feature_5,
      alt: 'featured-img',
    },
    {
      href: 'https://www.binance.com/en/square/post/15610461587521',
      imgSrc: feature_6,
      alt: 'featured-img',
    },
  ];

  return (
    <div
        className="feature py-0 d-lg-none d-block mt-4"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Slider
          {...slickOptions}
          style={{
            width: '100%', // Set width of the slider to be 80% of the container
            height: 'auto',
          }}
        >
          {featuredLinks.map((link, index) => (
            <div key={index} className="item">
              <a target="_blank" href={link.href}>
                <img loading="lazy" alt={link.alt} className="featured-img px-3" src={link.imgSrc} />
              </a>
            </div>
          ))}
        </Slider>
      </div>
  );
}
