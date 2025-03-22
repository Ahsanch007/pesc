import React from 'react';
import { CloseIcon } from '../../component/helper/Icon';
import { TokenStakingData } from '../../component/helper/helper2';
import chartimg from './../../assets/img/chartImg.png';
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import stakingAbi from "../../abi/StakingManager.json";
import {
  useConfig,
  useAccount
} from "wagmi";
import { STAKING, ETH_CHAIN_ID } from '../../config';
import {
  readContract,
} from "@wagmi/core";
import { useEffect } from 'react';
import { useState } from 'react';
export default function TokenStaking() {
  const {t} = useTranslation();
    const config = useConfig();
  const [totalStakedAmount, setTotalStakedAmount] = useState("");
  const [userStakedAmount, setUserStakedAmount] = useState("");
  const [userTokenAmount, setUserTokenAmount] = useState(""); 
  const [userReward, setUserReward] = useState("");
  const { address, chain } = useAccount();

  useEffect(() => {
      const fetchInfo = async () => {
        let totalAmount = await readContract(config, {
          address:STAKING ,
          abi: stakingAbi,
          functionName: "tokensStaked",
          args: [],
          chainId: ETH_CHAIN_ID,
        });
        setTotalStakedAmount((Number(totalAmount)/(10**18)).toFixed(2));
      };
      const fetchUserInfo = async () => {
        if(address){
          let totalAmount = await readContract(config, {
            address:STAKING ,
            abi: stakingAbi,
            functionName: "getRewards",
            args: [address],
            chainId: ETH_CHAIN_ID,
          });
          let stakedAmount = await readContract(config, {
            address:STAKING ,
            abi: stakingAbi,
            functionName: "poolStakers",
            args: [address],
            chainId: ETH_CHAIN_ID,
          });
          console.log("totalAmount",totalAmount);
          console.log("stakedAmount",stakedAmount);
          setUserStakedAmount((Number(stakedAmount[0])/(10**18)).toFixed(2));
          setUserReward((Number(totalAmount)/(10**18)).toFixed(2));
        }else{
          setUserStakedAmount(0);
          setUserReward(0);
        }
      };
      fetchUserInfo();
      fetchInfo();
    }, [address]);



  const handleContent = (index, idx, content)=>{
    if(index === 1 && idx === 1){
      return totalStakedAmount;
    }else if(index === 0 && idx === 0){
      return userStakedAmount;
    }else if(index === 3){
      return userReward;
    }else{
      return content;
    }

  }
  return (
    <div className='mb-8 lg:mb-12 xl:mb-16 2xl:mb-24 p-4 relative z-10'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className='space-y-3.5 md:space-y-6 lg:space-y-8 xl:space-y-11 max-w-[929px]'
      >
        <h2 className='text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[83px] font-bold uppercase !leading-[125%]'>
          $pesc {t("token_staking")}
        </h2>
        <p className='text-white text-sm sm:text-base md:text-lg lg:text-[22px] font-bold uppercase !leading-[150%]'>
          {t("staking_desc")}
        </p>
      </motion.div>

      <motion.div
        className="flex justify-center gap-5 flex-wrap mt-4 md:mt-6 lg:mt-8 xl:mt-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } }
        }}
      >
        {TokenStakingData.map((data, index) => (
          <motion.div
            key={index}
            className='w-full sm:max-w-[48%] xl:max-w-[23.7%] bg-white rounded-2xl overflow-hidden flex flex-col sm:min-h-[260px]'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            <div className='flex items-center justify-between gap-4 bg-[#2065D0] border-b-2 border-black p-4'>
              <h3 className='ff_SDGlitchDemo text-white text-[22px] uppercase !leading-[110%]'>{t(data.heading)}</h3>
              <CloseIcon />
            </div>
            <div className='p-3 sm:p-4 md:px-6 md:pt-6 pb-4 flex flex-col flex-grow'>
              <div className='space-y-2 flex-grow'>
                {data.data.map((subdata, idx) => (
                  <div key={idx}>
                    <p className={`text-[#0E0F10] text-sm sm:text-base font-bold uppercase !leading-[142%] pb-0.5 ${subdata.className}`}>
                      {t(subdata.title)}
                    </p>
                    {subdata.text.map((text, i) => (
                      <p key={i} className={`text-[#0E0F10] text-sm sm:text-base font-bold uppercase !leading-[142%] ${text.highlight ? 'flex gap-3' : ''} ${subdata.className}`}>
                        {handleContent(index, idx, text.text)}
                        <span className={text.highlight ? 'text-[#02AF08]' : ''}>{ text.type}</span>
                      </p>
                    ))}
                  </div>
                ))}
              </div>
              {data.btn && (
                <motion.div
                  className='mt-4'
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <a href={data.btn.href} className='w-full inline-block bg-[#02AF08] text-white text-xl font-bold !leading-[150%] rounded border-2 border-black text-center uppercase p-1.5 transition-all duration-300 ease-in-out'>
                    {t(data.btn.text)}
                  </a>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className='w-full max-w-[963px] bg-white rounded-2xl overflow-hidden flex flex-col sm:min-h-[260px] mt-6 md:mt-8 lg:mt-10 border border-black shadow-[3px_4px_0px_0px_#FFF]'
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className='flex items-center justify-between gap-4 bg-[#2065D0] border-b-2 border-black p-4'>
          <h3 className='ff_SDGlitchDemo text-white text-[22px] uppercase !leading-[110%]'>Welcome to $PESC</h3>
          <CloseIcon />
        </div>
        <div className='p-3 sm:p-4 md:px-6 md:pt-6 pb-4 flex flex-col flex-grow'>
          <motion.img
            src={chartimg}
            alt='chart'
            className='w-full h-auto'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          />
        </div>
      </motion.div>
    </div>
  );
}