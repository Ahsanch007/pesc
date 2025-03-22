import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./component/common/NotFound";
import Layout from "./hoc/Layout";
import TokenStaking from "./pages/tokenstaking/TokenStaking";
import HomeLayout from "./pages/home/HomeLayout";

import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia, bscTestnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import Logo from "./assets/img/$PESC.png";
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css"
const config = getDefaultConfig({
  appName: "PESC_PRESALE",
  //change in real production
  projectId: "ba6f0f2f6fb89aefa6ae395478e308d3",
  //change in real production
  chains: [sepolia, bscTestnet],
  transports: {
    // [mainnet.id]: http('https://mainnet.infura.io/v3/'),
    [sepolia.id]: http("https://ethereum-sepolia-rpc.publicnode.com"),
    // [bsc.id]: http('https://bsc-dataseed.binance.org/'),
    [bscTestnet.id]: http("https://bsc-testnet-rpc.publicnode.com"),
  },
  ssr: false, // If your dApp uses server side rendering (SSR)
});
const queryClient = new QueryClient();

const CustomAvatar = () => {
  return <img src={Logo} width="60px" height="60px" style={{ border: '2px solid white', borderRadius: '50%' }}/>;
};

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme()}
          avatar={CustomAvatar}
          modalSize="compact"
        >
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <Layout>
                    <HomeLayout />
                  </Layout>
                }
              />
              <Route
                path="/buy-and-stake"
                element={
                  <Layout>
                    <TokenStaking />
                  </Layout>
                }
              />
              <Route
                path="*"
                element={
                  <Layout>
                    <NotFound />
                  </Layout>
                }
              />
            </Routes>
          </Router>
          <ToastContainer autoClose={3000} draggableDirection="x" />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
