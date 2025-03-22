import { ConnectButton as RainbowkitConnectButton } from "@rainbow-me/rainbowkit";
const formatAddress = (addr) => {
    return `${addr?.substring(0, 5)}...${addr?.substring(addr.length - 3)}`
  }
export const ConnectButton = ({ label, showBalance }) => {
  return (
    <RainbowkitConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        const ready = mounted
        const connected = ready && account && chain
        return (
        //   <div className = "w-full">
        <>
            {(() => {
              if (!connected) {
                return (
                  <button
                    variant="default"
                    onClick={openConnectModal}
                    type="button"
                    className="rounded-[4px] border-[2px] border-white bg-primary xl:py-2 py-1 xl:px-4 px-3 xl:text-xl text-lg font-bold text-white transition-all duration-300 ease-in-out hover:bg-opacity-90"
                  >
                    {label}
                  </button>
                )
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                )
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button variant="outline" onClick={openAccountModal} type="button" className="rounded-[4px] border-[2px] border-white bg-primary xl:py-2 py-1 xl:px-4 px-3 xl:text-xl text-lg font-bold text-white transition-all duration-300 ease-in-out hover:bg-opacity-90">
                    {formatAddress(account.address)}
                    {showBalance ? ` (${account.displayBalance})` : ""}
                  </button>
                </div>
              )
            })()}
        
        </>
        )
      }}
    </RainbowkitConnectButton.Custom>
  )
}
