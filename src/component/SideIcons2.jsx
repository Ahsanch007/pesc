import React from "react";
import { Bird, Telegram, Twitter } from "./Icons";
import { Link } from "react-router-dom";

const SideIcons2 = () => {
  return (
    <div className="flex items-center space-x-2 pl-[50%] sm:pl-[50%] md:pl-[70%] lg:pl-[50%] pb-[1%]">
      <Link to={'https://t.me/PepeScapePortal'} target="_blank" className="group" >
        <Telegram />
      </Link>
      <Link to={'https://x.com/pepescapecoin?s=21&t=NuIrPSa6FxtjXsqx4k_8nA'} target="_blank" className="group" >
        <Twitter />
      </Link>
      <Link to={'https://bird.com'} target="_blank" className="group" >
        <Bird />
      </Link>
    </div>
  );
};

export default SideIcons2;
