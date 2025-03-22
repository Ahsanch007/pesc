import React, { useEffect, useRef, useState } from "react";
import { CurrencyData, CurrencyDataBNB } from "../helper/helper2";
import { CloseMinMaxIcon, DropDownDownArrow } from "../helper/Icon";
import { motion } from "framer-motion";
import { useSwitchChain } from "wagmi";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
//change in real production
import { sepolia, bscTestnet } from "viem/chains";
import { useTranslation } from "react-i18next";
import {
  useAccount,
  useConfig,
  useDisconnect,
  useBalance,
  useSendTransaction,
  useWalletClient,
  useWriteContract,
} from "wagmi";
import {
  getBalance,
  readContract,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import {
  ETH_CHAIN_ID,
  BNB_CHAIN_ID,
  ETH_USDT,
  BNB_USDT,
  ETH_VAULT,
  BNB_VAULT,
  PRESALE,
  PRICE_DECIMALS,
} from "../../config";
import ERC20Abi from "../../abi/ERC20.json";
import ETHVaultAbi from "../../abi/ETHVault.json";
import BNBVaultAbi from "../../abi/BNBVault.json";
import PresaleAbi from "../../abi/Presale.json";
import { toast } from "react-toastify";
import { parseEther, encodeFunctionData } from "viem";
import { BigNumber } from "ethers";
// import { ConnectButtonBuyModal } from "../wallet/wallet";
import { ConnectButtonBuyModal } from "../wallet/walletBuyModal";
import { BuyPescModal } from "../wallet/buyPescModal";
import chainium from "../..//assets/img/chainium.png";
import { signSmartContractData } from "@wert-io/widget-sc-signer";
import WertWidget from "@wert-io/widget-initializer";

// import ethLogo from "../../assets/img/ETH.svg";
// import bnbLogo from "../../assets/img/BNB.svg";
export default function BuyTokenNow({locate}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [currency, setCurrency] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(0.000356);
  const [currentChain, setCurrentChain] = useState("ETH");
  const [amount, setAmount] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);
  const maxValue = 0.33284;
  const { address, chain } = useAccount();
  const [tokenBalance, setTokenBalance] = useState(null);
  const [totalSold, setTotalSold] = useState(0);
  const [currentCurrencyData, setCurrentCurrencyData] = useState(CurrencyData);
  const { switchChainAsync } = useSwitchChain();
  const [endDate, setEndDate] = useState(0);
  const config = useConfig();
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { disconnect } = useDisconnect();
  const [wertData, setWertData] = useState("");
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  //ALEK
  const getChainByName = (chain) => {
    switch (chain) {
      case "BNB":
        return bscTestnet;
      case "ETH":
        return sepolia;
      default:
        return sepolia;
    }
  };

  function formatNumberWithCommas(value) {
    // Convert the string to a number first
    const numberValue = parseInt(value, 10);
    // Use toLocaleString to format the number with commas
    return numberValue.toLocaleString();
  }

  useEffect(() => {
    const fetchInfo = async () => {
      let price = await readContract(config, {
        address: currentChain === "ETH" ? ETH_VAULT : BNB_VAULT,
        abi: currentChain === "ETH" ? ETHVaultAbi : BNBVaultAbi,
        functionName: "TOKEN_PRICE_USD",
        args: [],
        chainId: currentChain === "ETH" ? ETH_CHAIN_ID : BNB_CHAIN_ID,
      });
      const humanReadablePrice = Number(price) / 10 ** 18;
      setTokenPrice(humanReadablePrice);

      let totalSold = await readContract(config, {
        address: PRESALE,
        abi: PresaleAbi,
        functionName: "getTotalTokensSold",
        args: [],
        chainId: ETH_CHAIN_ID,
      });
      const humanReadableAmount = Number(totalSold) / 10 ** 18;
      setTotalSold(humanReadableAmount);

      let endSaleDate = await readContract(config, {
        address: currentChain === "ETH" ? ETH_VAULT : BNB_VAULT,
        abi: currentChain === "ETH" ? ETHVaultAbi : BNBVaultAbi,
        functionName: "endSaleDate",
        args: [],
        chainId: currentChain === "ETH" ? ETH_CHAIN_ID : BNB_CHAIN_ID,
      });
      setEndDate(Number(endSaleDate) * 1000);
    };
    fetchInfo();
  }, []);

  useEffect(() => {
    if (!address) {
      return;
    }
    const fetchBalance = async () => {
      let balance;
      if (currency === 0) {
        balance = await getBalance(config, {
          address: address,
        });
        setTokenBalance(Number(balance?.formatted));
      } else {
        balance = await readContract(config, {
          address: chain?.id === ETH_CHAIN_ID ? ETH_USDT : BNB_USDT,
          abi: ERC20Abi,
          functionName: "balanceOf",
          args: [address],
          chainId: chain?.id,
        });
        const decimals = chain?.id === ETH_CHAIN_ID ? 6 : 18;
        const humanReadableBalance = Number(balance) / 10 ** decimals;
        setTokenBalance(humanReadableBalance);
      }
    };
    fetchBalance();
  }, [address, chain, currency]);

  async function changeSelectedChain(chainName) {
    try {
      if (chainName === "CARD") {
        setCurrentChain("CARD");
        setCurrency(1);
        return;
      }
      const _chain = getChainByName(chainName);
      const switchedChain = await switchChainAsync({ chainId: _chain?.id });
      if (switchedChain.id === ETH_CHAIN_ID) {
        setCurrentChain("ETH");
        setCurrentCurrencyData(CurrencyData);
        setCurrency(0);
      } else {
        setCurrentChain("BNB");
        setCurrentCurrencyData(CurrencyDataBNB);
        setCurrency(0);
      }
      // setCurrentNetworkId(switchedChain.id)
    } catch (error) {
      console.error("Failed to switch chain:", error.message);
    }
  }
  //ALEK

  useEffect(() => {
    if (!chain) {
      console.log("currentChain", currentChain);
      const handleCalculateAmount = async (value) => {
        const decimals =
          currentChain === "ETH" ? (currency === 0 ? 18 : 6) : 18;
        const tokenAmount = await readContract(config, {
          address: currentChain === "ETH" ? ETH_VAULT : BNB_VAULT,
          abi: currentChain === "ETH" ? ETHVaultAbi : BNBVaultAbi,
          functionName: "calculateTokenAmountPay",
          args: [amount * 10 ** decimals, currency],
          chainId: currentChain === "ETH" ? 11155111 : 97,
        });
        setBuyAmount(Number(tokenAmount) / 10 ** 18);
      };
      handleCalculateAmount(amount);
    } else {
      const handleCalculateAmount = async (value) => {
        const decimals =
          chain?.id === ETH_CHAIN_ID ? (currency === 0 ? 18 : 6) : 18;
        const tokenAmount = await readContract(config, {
          address: chain?.id === ETH_CHAIN_ID ? ETH_VAULT : BNB_VAULT,
          abi: chain?.id === ETH_CHAIN_ID ? ETHVaultAbi : BNBVaultAbi,
          functionName: "calculateTokenAmountPay",
          args: [amount * 10 ** decimals, currency],
          chainId: chain?.id,
        });
        setBuyAmount(Number(tokenAmount) / 10 ** 18);
      };
      handleCalculateAmount(amount);
    }
  }, [amount, currency, chain, currentChain]);
  useEffect(() => {
    switchChainAsync({ chainId: 11155111 });
  }, []);
  const getMaxValue = () => {
    setAmount(tokenBalance);
  };
  useEffect(() => {
    if (chain?.id === ETH_CHAIN_ID) {
      setCurrentChain("ETH");
      setCurrentCurrencyData(CurrencyData);
    } else if (chain?.id === BNB_CHAIN_ID) {
      setCurrentChain("BNB");
      setCurrentCurrencyData(CurrencyDataBNB);
    }
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [chain, address]);

  const [time, setTimeLeft] = useState({
    days: 1,
    hours: 5,
    minutes: 1,
    seconds: 1,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // const difference = targetDate.getTime() - now.getTime();
      const difference = endDate > now.getTime() ? endDate - now.getTime() : 0;
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({
          days: String(days).padStart(2, "0"),
          hours: String(hours).padStart(2, "0"),
          minutes: String(minutes).padStart(2, "0"),
          seconds: String(seconds).padStart(2, "0"),
        });
      } else {
        // If the countdown has ended
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const BACKEND_ENDPOINT = "https://pesc-backend.jrswap-mvp.com";

  const getReferral = async (walletAddress) => {
    const result = await axios.post(`${BACKEND_ENDPOINT}/user/getReferral`, {
      walletAddress,
    });
    console.log(result);
    console.log("wallet-address", walletAddress);
    if (result.data.data) {
      return result.data.data.referralAddress;
    } else {
      return walletAddress;
    }
  };

  useEffect(() => {
    if (address === undefined || !amount || currentChain != "CARD") return;
    // const refAddress =  getReferral(address);
    const bytecodeData = encodeFunctionData({
      abi: ETHVaultAbi,
      functionName: "buyTokenEthPay",
      value: parseEther(amount.toString()),
      args: [0, 0, address, address, false],
    });
    console.log("aria byteCodeData = ", bytecodeData);
    setWertData(bytecodeData);
  }, [amount]);

  const handlePurchase = async (stake) => {
    if (!address) {
      toast.error("Please Connect Wallet");
      return;
    }
    if (amount <= 0) {
      toast.error("Please enter valid amount");
      return;
    }
    // if(amount <= 0 || amount * 10 ** (chain?.id === ETH_CHAIN_ID ? (currency === 0 ? 18 : 6) : 18) > tokenBalance) {
    //   toast.error("Please enter valid amount")
    //   return;
    // }
    const refAddress = await getReferral(address);
    if (currentChain === "CARD") {
      const signedData = signSmartContractData(
        {
          address: "0x2ff0ec69341f43cc462251bd49bb63681adafcb0",
          commodity: "ETH", //USDT on mainnet
          network: "sepolia",
          commodity_amount: amount,
          sc_address: "0x108c18e332c0e1f12399C99d004ecEF72a8Bc7c3",
          sc_input_data: wertData,
        },
        "0x57466afb5491ee372b3b30d82ef7e7a0583c9e36aef0f02435bd164fe172b1d3"
      );
      const otherWidgetOptions = {
        partner_id: "01JMMZC89TJAEJEKDRXGSZD8CS",
        click_id: uuidv4(), // unique id of purhase in your system
        origin: "https://sandbox.wert.io", // this option needed only for this example to work
        listeners: {
          // close: () => { setInAction(false) },
          // error: (error) => {
          //     setInAction(false)
          // },
          loaded: () => console.log("loaded"),
        },
      };
      const wertWidget = new WertWidget({
        ...signedData,
        ...otherWidgetOptions,
      });
      wertWidget.open();
    } else {
      try {
        const decimals =
          chain?.id === ETH_CHAIN_ID ? (currency === 0 ? 18 : 6) : 18;
        const allowance = await readContract(config, {
          address: chain?.id === ETH_CHAIN_ID ? ETH_USDT : BNB_USDT,
          abi: ERC20Abi,
          functionName: "allowance",
          args: [address, chain?.id === ETH_CHAIN_ID ? ETH_VAULT : BNB_VAULT],
          chainId: chain?.id,
        });
        if (
          Number(allowance) < Number(amount * 10 ** decimals) &&
          currency !== 0
        ) {
          const approve_hash = await writeContract(config, {
            address: chain?.id === ETH_CHAIN_ID ? ETH_USDT : BNB_USDT,
            abi: ERC20Abi,
            functionName: "approve",
            args: [
              chain?.id === ETH_CHAIN_ID ? ETH_VAULT : BNB_VAULT,
              chain?.id === ETH_CHAIN_ID
                ? BigNumber.from(
                    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
                  )
                : amount * 10 ** decimals,
            ],
            chainId: chain?.id,
          });
          const transactionApproveReceipt = await waitForTransactionReceipt(
            config,
            {
              hash: approve_hash,
            }
          );
          if (transactionApproveReceipt.status == "success") {
            toast.success(`You approved successfully`);
          } else {
            toast.error(`Transaction was failed`);
          }
        }
        const buy_hash = await writeContract(config, {
          address: chain?.id === ETH_CHAIN_ID ? ETH_VAULT : BNB_VAULT,
          abi: chain?.id === ETH_CHAIN_ID ? ETHVaultAbi : BNBVaultAbi,
          functionName:
            chain?.id === ETH_CHAIN_ID ? "buyTokenEthPay" : "buyTokenBNBPay",
          args:
            chain?.id === ETH_CHAIN_ID
              ? [currency, amount * 10 ** decimals, refAddress, address, stake]
              : [currency, amount * 10 ** decimals, refAddress, stake],
          value: currency === 0 ? parseEther(amount.toString()) : 0,
          chainId: chain?.id,
        });
        const transactionApproveReceiptBuy = await waitForTransactionReceipt(
          config,
          {
            hash: buy_hash,
          }
        );
        if (transactionApproveReceiptBuy.status == "success") {
          if (stake) {
            toast.success(`You purchased and staked $PESC successfully`);
          } else {
            toast.success(`You purchased $PESC successfully`);
          }
        } else {
          toast.error(`Transaction was failed`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();
  return (
    <>
      <motion.div
        initial={{ opacity: 0, rotateY: 90 }}
        whileInView={{ opacity: 1, rotateY: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        viewport={{ once: true }}
        className={`w-full ${locate === 'home' ? '' : 'lg:max-w-[400px] xl:max-w-[478px] lg:min-w-[400px] xl:min-w-[478px]'}  bg-white border-4 border-black rounded-[32px] shadow-[3px_4px_0px_0px_#FFF] overflow-hidden`}
      >
        <div className="bg-[#02AF08]  border-b-[3px] border-black px-3 xl:px-5 py-2">
          <div className="flex justify-between items-center gap-4 pb-2">
            <p className="text-white text-lg md:text-xl xl:text-[20px] font-bold uppercase !leading-[125%]">
              {t("buy_modal_title")}
            </p>
            <span className="shrink-0 w-full max-w-10 sm:max-w-12 md:max-w-14 xl:max-w-16">
              <CloseMinMaxIcon />
            </span>
          </div>
          {/* <p className="text-white text-lg md:text-xl xl:text-[22px] font-bold uppercase !leading-[125%] text-center sm:mt-3"> */}
          <p className="text-white text-lg md:text-xl xl:text-[20px] font-bold uppercase !leading-[125%] text-center">
            1 $pesc =<span>${tokenPrice}</span>
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.2 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="p-1 md:p-2 xl:p-3 space-y-1 sm:space-y-2"
        >
          <div className="bg-[#2065D0] rounded-2xl border-4 border-black px-2 md:px-3 xl:px-4 py-2 md:py-3.5 space-y-2.5 sm:space-y-5">
            {/* <div className="space-y-3 sm:space-y-4 md:space-y-6"> */}
            <div className="space-y-3">
              <div className="flex justify-between">
                {Object.entries(time).map(([key, value], index) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 1,
                      ease: "easeInOut",
                      type: "spring",
                      delay: index * 0.2,
                    }}
                    viewport={{ once: true }}
                    key={index}
                    className="w-full lg:max-w-[78px] flex flex-col items-center justify-center bg-white rounded-[4px] p-1.5 sm:p-2"
                  >
                    <p className="text-[#141414] text-base min-[480px]:text-lg sm:text-xl font-bold !leading-[147%]">
                      {value.toString().padStart(2, "0")}
                    </p>
                    <p className="text-[#141414] text-[10px] min-[480px]:text-xs font-bold !leading-[150%]">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </p>
                  </motion.div>
                ))}
              </div>
              <div className="bg-white rounded border border-black p-0.5 sm:p-1">
                <div
                  className={`flex items-center gap-0.5 sm:gap-[3px] overflow-hidden`}
                  style={{
                    width: `${
                      (Number((totalSold * tokenPrice).toFixed(3)) * 100) /
                      4023750
                    }%`,
                  }}
                >
                  {[
                    [...Array(150).keys()].map((key, index) => {
                      return (
                        <motion.span
                          initial={{ opacity: 0, translateX: "100%" }}
                          whileInView={{ opacity: 1, translateX: 0 }}
                          transition={{
                            duration: 0.6,
                            ease: "easeInOut",
                            type: "spring",
                            delay: index * 0.07,
                          }}
                          viewport={{ once: true }}
                          key={key}
                          className="shrink-0 inline-block bg-[#008000] rounded-sm w-1.5 sm:w-[9px] h-3 sm:h-[14px]"
                        ></motion.span>
                      );
                    }),
                  ]}
                </div>
              </div>
            </div>
            <motion.div
              // className="space-y-2 sm:space-y-4"
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              viewport={{ once: true }}
            >
              <motion.p
                className="text-[#C2C7CF] text-sm sm:text-base !leading-[137%] flex flex-wrap gap-y-0.5 gap-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-nowrap">USD {t("raised")}:</span>
                <span className="text-nowrap text-white font-bold">
                  ${formatNumberWithCommas(totalSold * tokenPrice)}
                  <span className="text-white font-bold"> / $4,023,750</span>
                </span>
              </motion.p>

              <motion.div
                className="flex gap-1 lg:gap-3 justify-center items-center"
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
                viewport={{ once: true }}
              >
                <motion.span
                  className="w-full h-0.5 bg-white"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
                  viewport={{ once: true }}
                ></motion.span>
                {address ? (
                  <motion.p
                    className="text-white text-sm sm:text-base md:text-lg !leading[150%] uppercase text-nowrap"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {chain?.id === ETH_CHAIN_ID ? "eth" : "bnb"} {t("balance")}{" "}
                    = {Number(tokenBalance).toFixed(3)}
                  </motion.p>
                ) : (
                  <motion.p
                    className="text-white text-sm sm:text-base md:text-lg !leading[150%] uppercase text-nowrap"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {t("connect_wallet")}
                  </motion.p>
                )}
                <motion.span
                  className="w-full h-0.5 bg-white"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
                  viewport={{ once: true }}
                ></motion.span>
              </motion.div>
            </motion.div>

            {/* <div className="space-y-2 sm:space-y-4"> */}
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, rotateY: 90 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col min-[425px]:flex-row items-end gap-2.5"
              >
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  viewport={{ once: true }}
                  className={`w-full ${
                    currentChain === "ETH"
                      ? "bg-[#02AF08] text-white"
                      : "bg-black/30 text-white/50"
                  } text-white text-base sm:text-lg xl:text-xl gap-3 font-bold !leading-[150%]  items-center uppercase rounded border-2 border-black shadow-[2px_3px_0px_0px_#000] p-2`}
                  onClick={() => {
                    changeSelectedChain("ETH");
                  }}
                >
                  {/* <motion.img
                  src={ethLogo}
                  style={{ width: "30px", height: "30px" }}
                  alt="Example"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                /> */}
                  ETH
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  viewport={{ once: true }}
                  className={`w-full ${
                    currentChain === "BNB"
                      ? "bg-[#02AF08] text-white"
                      : "bg-black/30 text-white/50"
                  } text-white text-base sm:text-lg xl:text-xl gap-3 font-bold !leading-[150%]  items-center uppercase rounded border-2 border-black shadow-[2px_3px_0px_0px_#000] p-2`}
                  onClick={() => {
                    changeSelectedChain("BNB");
                  }}
                >
                  BNB
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  viewport={{ once: true }}
                  className={`w-full ${
                    currentChain === "CARD"
                      ? "bg-[#02AF08] text-white"
                      : "bg-black/30 text-white/50"
                  } text-white text-base sm:text-lg xl:text-xl gap-3 font-bold !leading-[150%]  items-center uppercase rounded border-2 border-black shadow-[2px_3px_0px_0px_#000] p-2`}
                  onClick={() => {
                    changeSelectedChain("CARD");
                  }}
                >
                  CARD
                </motion.button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, rotateY: 90 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col min-[425px]:flex-row items-end gap-2.5"
              >
                <div className="space-y-1 w-full">
                  <p className="text-sm text-[#C7D8F3] font-bold !leading-[140%] flex justify-between gap-2">
                    <span>
                      {t("pay_with")} $
                      {currentChain !== "CARD"
                        ? currentCurrencyData[currency].value
                        : "usd"}
                    </span>{" "}
                    <span onClick={getMaxValue} className="cursor-pointer">
                      {currentChain !== "CARD" && t("max")}
                    </span>
                  </p>
                  <div className="flex items-center justify-between gap-3 border rounded-lg p-[9.4px] bg-[#F1F4F6]">
                    <input
                      name="tokenvalue"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full text-left bg-transparent outline-none text-sm sm:text-base md:text-lg font-bold text-black !leading-[140%]"
                    />
                    {/* <span className="shrink-0">{currentCurrencyData[currency].icon}</span> */}
                  </div>
                </div>
                {currentChain !== "CARD" && (
                  <div ref={dropdownRef} className="relative w-full max-w-xs">
                    <div
                      className="ml-auto min-[425px]:w-full flex items-center justify-center gap-2 border rounded-lg p-2 sm:p-1.5 bg-[#F1F4F6] cursor-pointer"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <p className="flex items-center gap-2 text-sm sm:text-base md:text-lg text-black font-bold leading-normal">
                        <span className="shrink-0 transition-all duration-300 ease-in-out hover:rotate-[360deg]">
                          {currentCurrencyData[currency].icon}
                        </span>
                        <span>{currentCurrencyData[currency].value}</span>
                      </p>
                      <DropDownDownArrow />
                    </div>
                    {isOpen && (
                      <div className="absolute mt-1 sm:mt-2 w-full bg-white border rounded-lg shadow-md p-1 sm:p-2">
                        {currentCurrencyData.map((item, index) => (
                          <div
                            key={item.value}
                            className="flex items-center gap-2 p-1 sm:p-2 cursor-pointer hover:bg-gray-100 rounded text-sm sm:text-base md:text-lg"
                            onClick={() => {
                              setCurrency(index);
                              setIsOpen(false);
                            }}
                          >
                            <span className="shrink-0 transition-all duration-300 ease-in-out hover:rotate-[360deg]">
                              {item.icon}
                            </span>
                            <span className="font-bold">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, rotateY: 90 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-1"
              >
                <p className="text-sm text-[#C7D8F3] font-bold !leading-[140%]">
                  {t("receive")} {buyAmount} $pesc
                </p>
                <div className="flex items-center justify-between gap-3 border rounded-lg py-1.5 px-2 md:px-3 bg-[#F1F4F6]">
                  <input
                    name="tokenvalue"
                    type="number"
                    value={buyAmount}
                    disabled
                    className="w-full bg-transparent outline-none text-sm sm:text-base md:text-lg font-bold text-black !leading-[140%]"
                  />
                  {/* <span className="shrink-0">{selectedCurrency?.icon}</span> */}
                </div>
              </motion.div>
            </div>
          </div>
          {/* <p className="text-black text-sm sm:text-base xl:text-lg font-bold !leading-[140%] text-center">
          0.005 ETH is reserved for gas.the actual amount used will depend on
          the network
        </p> */}
          <div className="flex flex-col gap-4">
            {currentChain !== "CARD" && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                viewport={{ once: true }}
                className="w-full block text-center bg-[#FFCF47] text-[#1C1B1A] text-sm sm:text-base xl:text-lg font-bold !leading-[150%] uppercase rounded border-2 border-black shadow-[2px_3px_0px_0px_#000] p-1.5"
                onClick={async () => await handlePurchase(true)}
              >
                {t("buy_stake")}
              </motion.button>
            )}

            {/* {address?<motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            viewport={{ once: true }}
            className="w-full bg-[#02AF08] text-white text-base sm:text-lg xl:text-xl font-bold !leading-[150%] uppercase rounded border-2 border-black shadow-[2px_3px_0px_0px_#000] p-2"
            onClick={async () => handlePurchase(false)}
          >
            Buy with crypto
          </motion.button>:<motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            viewport={{ once: true }}
            className="w-full bg-[#02AF08] text-white text-base sm:text-lg xl:text-xl font-bold !leading-[150%] uppercase rounded border-2 border-black shadow-[2px_3px_0px_0px_#000] p-2"
            onClick={handleOpenModal}
          >
            Connect Wallet
          </motion.button>} */}
            {address ? (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                viewport={{ once: true }}
                className="w-full bg-[#02AF08] text-white text-base sm:text-lg xl:text-xl font-bold !leading-[150%] uppercase rounded border-2 border-black shadow-[2px_3px_0px_0px_#000] p-1.5"
                onClick={async () => handlePurchase(false)}
              >
                {currentChain === "CARD" ? t("buy_with_card") : t("buy_with_crypto")}
              </motion.button>
            ) : (
              <ConnectButtonBuyModal
                label={t("connect_wallet_btn")}
                showBalance={false}
              />
            )}
          </div>
          {/* <p className="text-black text-sm sm:text-base xl:text-md font-bold !leading-[140%] flex items-center text-center"> */}
          <div className="flex w-full justify-center">
            <p className="text-black text-sm font-bold !leading-[140%] flex items-center text-center">
              {t("made_by")}
              <img src={chainium} width="14px" height="14px" />
              CHAINIUM
            </p>
          </div>
        </motion.div>
      </motion.div>
      <BuyPescModal open={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
