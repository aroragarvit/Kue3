import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { Navbar } from "./layouts/Navbar";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import App from "./App";
import AddQuestion from "./pages/addQuestion";
import Sidebar from "./layouts/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Kue3",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <BrowserRouter>
            <Navbar />
            <Flex flexDirection={"row-reverse"}>
              <Sidebar />
              <Routes>
                <Route path="/addquestion" element={<AddQuestion />} />
                <Route path="/" element={<App />} />
              </Routes>
            </Flex>
          </BrowserRouter>
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  </React.StrictMode>
);
