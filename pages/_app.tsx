import type { AppProps } from "next/app";
import { ThirdwebProvider, localWallet, metamaskWallet, smartWallet } from "@thirdweb-dev/react";
import "../styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "mumbai";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider 
        activeChain={activeChain}
        supportedWallets={[
            smartWallet({
                factoryAddress: "0x640b17bD959c3528aF1dB7a1E70233e8E7E5327F",
                thirdwebApiKey: "7527e7b843c07b73a1de496d8cac15ad476f1f1049a3c3017c7e3c00f44fb2a45b0f0e549841eefe03003c7e38d6ca3f36e0dab700b987f3b1513161e8ebdfc5",
                gasless: true,
                personalWallets: [
                    metamaskWallet(),
                    localWallet()
                ]
            })
        ]}    
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
