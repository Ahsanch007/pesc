import React, { useRef, useState } from "react";
import { CurrencyData } from "../../component/helper/helper2";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import { useEffect } from "react";
// import crypto from 'crypto'
import CryptoJS from "crypto-js";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const BACKEND_ENDPOINT = "https://pesc-backend.jrswap-mvp.com";
export default function ReferralCard() {
  const {t} = useTranslation();
  const { address } = useAccount();
  const [referralCode, setReferralCode] = useState("");
  const [referralEarning, setReferralEarning] = useState(0);
  const [referralCount, setReferralCount] = useState(0);
  const generateReferralCode = async () => {
    if (!address) {
      toast.error("Please connect wallet!");
      return;
    }

    const referral =
      "PESC-" +
      CryptoJS.SHA256(address)
        .toString(CryptoJS.enc.Hex)
        .slice(0, 8)
        .toUpperCase();

    setReferralCode(referral);

    try {
      await axios.post(`${BACKEND_ENDPOINT}/user/setReferral`, {
        walletAddress: address,
        referral,
        referred:referral,
        referralAddress: address
      });
    } catch (error) {
      console.error("Error setting referral:", error);
    }
  };

  useEffect(() => {
    const getReferral = async (walletAddress) => {
      const result = await axios.post(`${BACKEND_ENDPOINT}/user/getReferral`, {
        walletAddress,
      });
      const referral = result.data.data.referral;
      setReferralCode(referral);
      setReferralEarning(result.data.data.referralCount);
      setReferralCount(result.data.data.referralCount);
    };

    if (address) {
      getReferral(address);
    } else {
      setReferralCode("");
    }
  }, [address]);
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, rotateY: 90 }}
        whileInView={{ opacity: 1, rotateY: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="w-full lg:max-w-[350px] xl:max-w-[350px] lg:min-w-[350px] xl:min-w-[350x] bg-white border-4 border-black rounded-[32px] shadow-[3px_4px_0px_0px_#02AF08] overflow-hidden"
      >
        <div className="bg-[#02AF08] grid grid-cols-7 gap-4 p-4 border-b-[3px] border-black p-4 lg:p-5 xl:p-3 text-center">
          <div className="col-span-3">
            <h5>$pepc {t("earned")}</h5>
            <div className="grid grid-cols-6">
              <div className="col-span-1"></div>
              <div className="col-span-2 bg-yellow m-1 max-w-7 rounded-xl border-2 border-solid border-black">
                {referralCount?referralCount:0}
              </div>
              <div className="col-span-2 bg-gray-400 m-1 max-w-7 rounded-xl"></div>
              <div className="col-span-1"></div>
            </div>
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-3">
            <h5>$usd {t("earned")} </h5>
            <div className="text-[#FFCF47]">${referralEarning?referralEarning:0}</div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.2 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="p-4 md:p-5 xl:p-[30px] space-y-3 sm:space-y-4"
        >
          <div className="bg-[#2065D0] rounded-2xl border-4 border-black px-3.5 md:px-5 xl:px-7 py-3.5 md:py-5 space-y-2.5 sm:space-y-1">
            <div className="space-y-2 sm:space-y-2 md:space-y-2">
              <div className="flex gap-2">{}</div>
            </div>
            <motion.div
              className="space-y-2 sm:space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              viewport={{ once: true }}
            >
              <motion.div
                className="flex gap-1 lg:gap-3 justify-center items-center"
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
                viewport={{ once: true }}
              >
                <motion.p
                  className="text-white text-sm sm:text-base md:text-lg !leading[150%] text-nowrap"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  {t("affiliat")}
                </motion.p>
              </motion.div>
              <div className="flex flex-col gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  viewport={{ once: true }}
                  className="w-full"
                >
                  {referralCode ? (
                    <div className="bg-[#02AF08] rounded-2xl border-white border-[2px] border-black p-2 lg:p-2 text-center">
                      <p className="uppercase text-[#FFCF47] text-xl">
                        {referralCode}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-[#02AF08] rounded-2xl border-white border-[2px] border-black p-2 lg:p-2 text-center">
                      <p className="uppercase text-[#FFCF47] text-xl">
                        {t("referral_link")}
                      </p>
                      <p className="text-white text-base">
                        {t("get_code")}
                      </p>
                    </div>
                  )}
                </motion.div>
                {referralCode ? (
                  ""
                ) : (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    viewport={{ once: true }}
                    onClick={generateReferralCode}
                    className={`w-full bg-[#FFA500] text-black text-base sm:text-lg xl:text-xl font-bold !leading-[150%] uppercase rounded border-2 border-white shadow-[2px_3px_0px_0px_#000] p-2`}
                  >
                    {t("Generate")}
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      <a
        href={"/buy-and-stake"}
        className="mt-4 block text-center bg-[#02AF08] text-white sm:text-base xl:text-lg font-bold !leading-[150%] uppercase rounded border-2 border-white shadow-[2px_3px_0px_0px_#000] p-2"
      >
        <span className="text-lg">15%</span>{" "}
        <span className="text-sm">{t("earn_referral")}</span>
      </a>
      <a
        href={"/buy-and-stake"}
        className="mt-4 block text-center bg-[#02AF08] text-white sm:text-base xl:text-lg font-bold !leading-[150%] uppercase rounded border-2 border-white shadow-[2px_3px_0px_0px_#000] p-2"
      >
        <span className="text-lg">15%</span>{" "}
        <span className="text-sm">{t("earn_friend")}</span>
      </a>
    </div>
  );
}
