import React from "react";
import { Bird, Telegram, Twitter } from "./Icons";
import { Link } from "react-router-dom";

const SideIcons = () => {
  return (
    <div className="fixed 2xl:right-0 lg:right-[1.5%] right-0 top-[28%] flex flex-col gap-2 xl:pr-1.5 2xl:pr-3 z-[999]">
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

export default SideIcons;
