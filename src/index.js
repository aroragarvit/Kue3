import "@rainbow-me/rainbowkit/styles.css";
import AddQuestion from "./pages/addQuestion";
import QuestionDesc from "./pages/questionDesc";
import Home from "./pages/home";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { Navbar } from "./layouts/Navbar";
import { Sidebar } from "./layouts/Sidebar";

import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [chain.hardhat, chain.polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Kue3",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  persister: null,
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
                <Route path="/" element={<Home />} />
                <Route path="/addquestion" element={<AddQuestion />} />
                <Route path="/questionDesc/:id" element={<QuestionDesc />} />
              </Routes>
            </Flex>
          </BrowserRouter>
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  </React.StrictMode>
);
