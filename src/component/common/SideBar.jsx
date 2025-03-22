import React from "react";
import { motion } from "framer-motion";
import { MenuCloseIcon } from "../helper/Icon";
import { Link } from "react-router-dom";
import { SidebarData } from "../helper/helper2";
import SideIcons from "../SideIcons";
import logoImg from "./../../assets/img/$PESC.png";
import { ConnectButton } from "../wallet/wallet";
import LaunguageDropMobile from './LaunguageDropMobile';
// import { BuyPescModal } from "../wallet/buyPescModal";
// import { useAccount, useDisconnect } from "wagmi";
// import { useState } from "react";

const SideBar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const { address } = useAccount();
  // const { disconnect } = useDisconnect();
  // const handleOpenModal = () => setIsModalOpen(true);
  // const handleCloseModal = () => setIsModalOpen(false);
  if (!isSidebarOpen) return null;
  return (
    <>
      {/* Backdrop with fade-in effect */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen bg-black/30 backdrop-blur-[2px] z-50 lg:hidden"
      ></div>

      {/* Sidebar sliding in */}
      <div className="fixed top-0 right-0 bg-[#02AF08] sm:rounded-s-3xl shadow-lg z-50 w-full max-w-[380px] h-screen border-s-4 border-black p-10 lg:hidden">
        <SideIcons />

        {/* Header Section */}
        <div className="flex justify-between gap-4 items-center">
          <div>
            <Link
              to={"/"}
              className="ff_SDGlitchDemo text-2xl lg:text-[28px] xl:text-[33px] font-bold text-white leading-[140%] [text-shadow:0px_4.537px_0px_#000] flex items-center gap-3"
            >
              <span className="w-full max-w-14 lg:max-w-18">
                <img src={logoImg} alt="logo img" className="w-full w-14" style={{ border: '2px solid white', borderRadius: '50%' }} />
              </span>
              <span>$PESC</span>
            </Link>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="w-12">
            <MenuCloseIcon />
          </button>
        </div>

        {/* Navigation Links with Stagger Animation */}
        <motion.ul
          className="flex flex-col gap-4 mt-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
          viewport={{ once: true }}
        >
          {SidebarData.map((data, i) => (
            <motion.li
              key={i}
              variants={{
                hidden: { opacity: 0, x: 30 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
            >
              <a
                href={data.href}
                onClick={() => setIsSidebarOpen(false)}
                className="text-2xl font-black text-[#1C1B1A] transition-all duration-300 ease-in-out uppercase"
              >
                {data.title}
              </a>
            </motion.li>
          ))}
        </motion.ul>
        <div className="h-4"></div>
        
        <LaunguageDropMobile />
        <div className="h-4"></div>
        <div className="h-4"></div>
        <div className="h-4"></div>

        <ConnectButton label = "&nbsp;&nbsp;Buy $PESC&nbsp;&nbsp;" showBalance={false}/>
        
        {/* {!address ? (
          <button
            className="rounded-[4px] border-[2px] border-white bg-primary xl:py-2 py-1 xl:px-4 px-3 xl:text-xl text-lg font-bold text-white transition-all duration-300 ease-in-out hover:bg-opacity-90"
            onClick={handleOpenModal}
          >
            Buy $PESC
          </button>
        ) : (
          <button
            className="rounded-[4px] border-[2px] border-white bg-primary xl:py-2 py-1 xl:px-4 px-3 xl:text-xl text-lg font-bold text-white transition-all duration-300 ease-in-out hover:bg-opacity-90"
            onClick={() => disconnect()}
          >
            {address.slice(0, 5)}...{address.slice(-3)}
          </button>
        )} */}
      </div>
      {/* <BuyPescModal open={isModalOpen} onClose={handleCloseModal} /> */}
    </>
  );
};
export default SideBar;
