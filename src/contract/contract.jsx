import { createPublicClient, http } from "viem";
import ETHVaultAbi from "./ETHVaultAbi.json";
import BNBVaultAbi from "./BNBVaultAbi.json";
import presaleAbi from "./presaleAbi.json";
import ERC20Abi from "./ERC20Abi.json";

export const contractAddresses = {
  USDT: {
    ETH: "0xFf09cc355c0e4202c7fbf86169B345c8f55b2c20",
    BNB: "0xFf09cc355c0e4202c7fbf86169B345c8f55b2c20",
  },
  Vault: {
    ETH: "0xEad75567A826a4caB62fc9196DDc3C62b23Ad902",
    BNB: "0xEad75567A826a4caB62fc9196DDc3C62b23Ad902",
  },
  Presale: "0x397e10E460C6A1292Ba705d605275bc136030C50",
};

export const getRpcNode = (chain) => {
  switch (chain) {
    case "ETH":
      return http(
        "https://eth-sepolia.g.alchemy.com/v2/jZMYGhxXdn2G9vVQpe2gpLTjRdEQRTLK"
      );
    case "BNB":
      return http(
        "https://bnb-testnet.g.alchemy.com/v2/jZMYGhxXdn2G9vVQpe2gpLTjRdEQRTLK"
      );
    default:
      return http(
        "https://eth-sepolia.g.alchemy.com/v2/jZMYGhxXdn2G9vVQpe2gpLTjRdEQRTLK"
      );
  }
};

export const getTokenBalance = async (walletAddress, chainName) => {

  const client = createPublicClient({
    chain: getChainByName(chainName),
    transport: getRpcNode(chainName),
  });

  const balance = await client.readContract({
    address: contractAddresses.USDT[chainName],
    abi: ERC20Abi,
    functionName: "balanceOf",
    args: [walletAddress],
  });
  const decimals = chainName === "BNB" ? 18 : 6;
  const humanReadableBalance = Number(balance) / 10 ** decimals;
  return {
    balance,
    humanReadableBalance,
  };
};

export const buyToken = async (chainName, amount, type) => {
  try {
    if (chainName === "ETH") {
      if (type === "ether") {
        const hash = await writeContract(config, {
          abi: ETHVaultAbi,
          address: contractAddresses.Vault.ETH,
          functionName: "buyTokenEthPay",
          args: [],
          value: parseUnits(amount.toString(), 18),
        });
        const transactionApproveReceiptBuy = await waitForTransactionReceipt(
          config,
          {
            hash: hash,
          }
        );
        if (transactionApproveReceiptBuy.status == "success") {
          toast.success(`You purchased $PESC successfully`);
        } else {
          toast.error(`Transaction was failed`);
        }
      } else if (type === "USDT") {
        const allowance = await readContract(config, {
          abi: ERC20Abi,
          address: contractAddresses.USDT.ETH,
          functionName: "allowance",
          args: [senderAddress, contractAddresses.Vault.ETH],
        });
        if (Number(allowance) < Number(parseUnits(amount.toString(), 6))) {
          try {
            const hash = await writeContract(config, {
              abi: ERC20Abi,
              address: contractAddresses.USDT.ETH,
              functionName: "approve",
              args: [contractAddresses.Vault.ETH, parseUnits(amount.toString(), 6)],
            });
            const transactionApproveReceipt = await waitForTransactionReceipt(
              config,
              {
                hash: hash,
              }
            );
            if (transactionApproveReceipt.status == "success") {
              const hash = await writeContract(config, {
                abi: presaleAbi,
                address: contractAddresses.Vault.ETH,
                functionName: "buyTokensWithUSDT",
                args: [parseUnits(amount.toString(), 6)],
              });
              const transactionApproveReceiptBuy =
                await waitForTransactionReceipt(config, {
                  hash: hash,
                });
              if (transactionApproveReceiptBuy.status == "success") {
                toast.success(`You purchased $PESC successfully`);
              } else {
                toast.error(`Transaction was failed`);
              }
            } else {
              toast.error(`Transaction was failed`);
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            const hash = await writeContract(config, {
              abi: presaleAbi,
              address: contractAddresses.Vault.ETH,
              functionName: "buyTokensWithUSDT",
              args: [parseUnits(amount.toString(), 6)],
            });
            const transactionApproveReceiptBuy =
              await waitForTransactionReceipt(config, {
                hash: hash,
              });
            if (transactionApproveReceiptBuy.status == "success") {
              toast.success(`You purchased $PESC successfully`);
            } else {
              toast.error(`Transaction was failed`);
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    } else {
      if (type === "ether") {
        const hash = await writeContract(config, {
          abi: presaleAbi,
          address: contractAddresses.Vault.BNB,
          functionName: "buyTokenBNBPay",
          args: [],
          value: parseUnits(amount.toString(), 18),
        });
        const transactionApproveReceiptBuy = await waitForTransactionReceipt(
          config,
          {
            hash: hash,
          }
        );
        if (transactionApproveReceiptBuy.status == "success") {
          toast.success(`You purchased $PESC successfully`);
        } else {
          toast.error(`Transaction was failed`);
        }
      } else if (type === "USDT") {
        const allowance = await readContract(config, {
          abi: ethTokenAbi,
          address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
          functionName: "allowance",
          args: [senderAddress, "0x8ecE1A114ae4768545211Ec3f5Bb62987165cd79"],
        });
        if (Number(allowance) < Number(parseUnits(amount.toString(), 6))) {
          try {
            const hash = await writeContract(config, {
              abi: USDT_ABI,
              address: USDT_ADDRESS,
              functionName: "approve",
              args: [CONTRACT_ADDRESS, parseUnits(amount.toString(), 6)],
            });
            const transactionApproveReceipt = await waitForTransactionReceipt(
              config,
              {
                hash: hash,
              }
            );
            if (transactionApproveReceipt.status == "success") {
              const hash = await writeContract(config, {
                abi: presaleAbi,
                address: CONTRACT_ADDRESS,
                functionName: "buyTokensWithUSDT",
                args: [parseUnits(amount.toString(), 6)],
              });
              const transactionApproveReceiptBuy =
                await waitForTransactionReceipt(config, {
                  hash: hash,
                });
              if (transactionApproveReceiptBuy.status == "success") {
                toast.success(`You purchased $PESC successfully`);
              } else {
                toast.error(`Transaction was failed`);
              }
            } else {
              toast.error(`Transaction was failed`);
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            const hash = await writeContract(config, {
              abi: presaleAbi,
              address: CONTRACT_ADDRESS,
              functionName: "buyTokensWithUSDT",
              args: [parseUnits(amount.toString(), 6)],
            });
            const transactionApproveReceiptBuy =
              await waitForTransactionReceipt(config, {
                hash: hash,
              });
            if (transactionApproveReceiptBuy.status == "success") {
              toast.success(`You purchased $PESC successfully`);
            } else {
              toast.error(`Transaction was failed`);
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
  } catch (error) {
    console.log("error", error);
    toast.error("Transaction was failed");
  }
};
