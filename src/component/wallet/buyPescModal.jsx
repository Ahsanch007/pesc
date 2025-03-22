import React from "react";
import { useAccount, useConnect } from "wagmi";
import ReactDOM from "react-dom";

export const BuyPescModal = ({ open, onClose }) => {
  const { connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect({
      onSettled(data, error) {
        if (error) {
          console.log("Failed to connect: ", error);
        }
        onClose();
      },
    });

  const handleMetamask = () => {
    if (isConnected) {
      return;
    }
    console.log("test!");
    connect({ connector: connectors[0] });
  };

  const handleWallet = () => {
    if (isConnected) {
      return;
    }
    connect({ connector: connectors[2] });
  };

  const handleCoinbase = () => {
    if (isConnected) {
      return;
    }
    connect({ connector: connectors[1] });
  };
  return ReactDOM.createPortal(
    <div >
      {open && (
        <div
          className="fixed z-[9999999] min-w-screen min-h-screen inset-0 bg-[#74C37B] bg-opacity-70 flex justify-center items-center"
          onClick={onClose}
        >

          <div
            className="bg-[#215bb8]  p-4  rounded-[10px] transition-all w-[358px] mx-auto lg:min-w-[25em] lg:w-full max-w-lg "
            style={{ boxShadow: "0 10px 10px 1px #0000004d" }}
            onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside it
          >
            <div className="flex flex-col  items-center w-full">
              <div
                className="py-[12px] px-[15px] w-full    flex items-center justify-center relative "
                style={{
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              >
                <h4 className="text-[1rem] text-white font-medium text-center ">
                  Connect Wallet
                </h4>
                <img
                  src="/assets/close-white.svg"
                  className="absolute right-[20px] w-[12px] h-auto cursor-pointer"
                  onClick={onClose}
                  alt=""
                />
              </div>
              <div className="mt-4 w-full px-4">
                <button
                  className="flex justify-between items-center border-[2px] border-black text-[14px] min-w-[100px] w-full py-2 px-3 mb-3 bg-[#2EB335] text-black rounded-[.4rem] "
                  onClick={() => {
                    handleMetamask();
                    onClose();
                  }}
                >
                  Meta Mask
                  <img
                    src="/assets/wallet-metamask.png"
                    className="w-[32px] h-[32px] "
                    alt=""
                  />
                </button>
                <button
                  className="flex justify-between items-center border-[2px] border-black text-[14px] min-w-[100px] w-full py-2 px-3 mb-3 bg-[#2EB335] text-black rounded-[.4rem] "
                  onClick={() => {
                    handleWallet();
                    onClose();
                  }}
                >
                  Wallet Connect
                  <img
                    src="/assets/wallet.svg"
                    className="w-[32px] h-[32px] "
                    alt=""
                  />
                </button>
                <button
                  className="flex justify-between items-center border-[2px] border-black text-[14px] min-w-[100px] w-full py-2 px-3 mb-3 bg-[#2EB335] text-black rounded-[.4rem] "
                  onClick={() => {
                    handleCoinbase();
                    onClose();
                  }}
                >
                  Coinbase Wallet
                  <img
                    src="/assets/coinbase.svg"
                    className="w-[32px] h-[32px] "
                    alt=""
                  />
                </button>
                {/* <w3m-button /> */}
                <a
                  href="https://bestwallet.com/en?referrer=singular_click_id%3D14489700-1e19-4dac-bb37-95178873889b"
                  target="_blank"
                  className=""
                >
                  {/* <button className="border border-[#ffffff2b] gap-2 transition-all w-full rounded-[80px] flex items-center justify-center text-white py-[12px] px-[10px] ">
                    <img src="/assets/ani-wallet.svg" alt="" />I don’t have a wallet
                  </button> */}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>,
     document.body
  );
};
