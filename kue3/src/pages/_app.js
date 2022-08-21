import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { Navbar } from "../layouts/Navbar";
import { Sidebar } from "../layouts/Sidebar";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains([chain.hardhat, chain.polygonMumbai], [publicProvider()]);

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

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Navbar />
          <Flex flexDirection={"row-reverse"}>
            {/* <Sidebar /> */}
            <Component {...pageProps} />
          </Flex>
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default MyApp;
