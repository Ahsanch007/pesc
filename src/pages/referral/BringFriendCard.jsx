import React, { useState } from 'react';
import { motion } from "framer-motion";

import "./Referral.css";
import { useEffect } from 'react';
import axios from "axios";
import { h1 } from 'motion/react-client';
import { useTranslation } from "react-i18next";

export default function ReferralCard() {
  const BACKEND_ENDPOINT = "https://pesc-backend.jrswap-mvp.com";
  const [cardData, setCardData] = useState([]);
  const {t} = useTranslation();
  useEffect(()=>{
    const getTopReferralers = async () => {
      const result = await axios.post(`${BACKEND_ENDPOINT}/user/getTopReferral`);
      console.log("result:", result.data.data);
      setCardData(result.data.data);
    };
    getTopReferralers();
  },[])



  // const cardData = [
  //   { rating: '1', address: "0x82fbd8", numberofreferrals: '01', totalearnings: "4,412,00"},
  //   { rating: '2', address: "0x82fbd8", numberofreferrals: '01', totalearnings: "4,412,00"},
  //   { rating: '3', address: "0x82fbd8", numberofreferrals: '01', totalearnings: "4,412,00"},
  //   { rating: '4', address: "0x82fbd8", numberofreferrals: '01', totalearnings: "4,412,00"},
  //   { rating: '5', address: "0x82fbd8", numberofreferrals: '01', totalearnings: "4,412,00"},
  //   { rating: '6', address: "0x82fbd8", numberofreferrals: '01', totalearnings: "4,412,00"},
  // ];
  function getShortAddress(str){
    if (str.length <= 6) return str; // If string length is 6 or less, return full string
  
    const firstThree = str.slice(0, 3);
    const lastThree = str.slice(-3); // Get last 3 characters
  
    return firstThree + "..." + lastThree; // Concatenate with "..."
  }

  return (
    <motion.div
      initial={{ rotateY: 90 }}
      whileInView={{ rotateY: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      viewport={{ once: true }}
      className="bg-[#ffffff] rounded-[27px] overflow-hidden border-[3px] border-black shadow-[6.877px_6.877px_0px_0px_#02AF08] px-4 md:px-7 py-3 md:py-5 m-2 md:m-4 h-full">
      <motion.div
        initial={{ rotateY: 90, opacity: 0, scale: 0.8 }}
        whileInView={{ rotateY: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: true }}
        className='w-full rounded-[32px] border-4 border-black overflow-hidden bg-white relative z-10 mt-4'
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-[#2065D0] p-1 md:py-1 px-1 space-y-1 md:space-y-1"
        >
          <div className='grid gap-3 xl:gap-4 grid-cols-1 sm:grid-cols-1'>
              <motion.div
                  className="table-container"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
              >
                  <table className="animated-table">
                      <thead>
                      <tr>
                          <th></th>
                          <th>{t("RATING")}</th>
                          <th>{t("ADDRESS")}</th>
                          <th>{t("number_referral")}</th>
                          <th>{t("total_earning")}</th>
                          <th></th>
                      </tr>
                      </thead>
                      <tbody>
                      {cardData.map((item, index) => (
                          <motion.tr
                          key={index}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                          <td></td>
                          <td>
                            <div className='rank'>{index + 1}</div>
                            <div className='avatar'></div>
                          </td>
                          <td>{getShortAddress(item.walletAddress)}</td>
                          <td>{item.referralCount}</td>
                          <td>
                            <div className='rank'>{item.rating}</div>
                            {0}
                          </td>
                          <td></td>
                          </motion.tr>
                      ))}
                      </tbody>
                  </table>
              </motion.div>
          </div>

          {/* Contract Address Copy Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className=''
          >
          {/* <div className='text-center'>
            <span className='text-white text-2xl truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-full cursor-pointer'>
              {"SE ALL"}
            </span>
          </div> */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative"
            >
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
      {/* <div className='grid grid-cols-12 mt-5'>
        <div className='col-span-0.5'></div>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          viewport={{ once: true }}
          className='col-span-3 w-full bg-[#FFA500] m-2 text-white text-base sm:text-lg xl:text-xl font-bold !leading-[150%] uppercase rounded border-2 border-black shadow-[2px_3px_0px_0px_#000] p-2'>
            buy
        </motion.button>
        
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          viewport={{ once: true }}
          className='col-span-3 w-full bg-[#FFA500] m-2 text-white text-base sm:text-lg xl:text-xl font-bold !leading-[150%] uppercase rounded border-2 border-black shadow-[2px_3px_0px_0px_#000] p-2 ml-6'>
            stake
        </motion.button>
        
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          viewport={{ once: true }}
          className='col-span-3 w-full bg-[#FFFFFF] m-2 text-black text-base text-xs sm:text-lg lg:text-lg xl:text-xl font-bold !leading-[150%] uppercase rounded border-2 border-black shadow-[2px_3px_0px_0px_#000] p-2 ml-10 overflow-hidden'>
            history
        </motion.button>
        <div className='col-span-0.5'></div>
      </div> */}
    </motion.div>
  );
}
