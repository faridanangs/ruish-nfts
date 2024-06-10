'use client';

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, getDefaultConfig, midnightTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider, http } from "wagmi";
import { localhost, mainnet, avalanche, arbitrum, zetachain, anvil } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export const configure = getDefaultConfig({
    appName: "Ruish-NFTs",
    chains: [localhost, mainnet, avalanche, zetachain, anvil, arbitrum ],
    projectId: "11ee",
    transports: {
        [localhost.id]: http("http://127.0.0.1:7545"),
        [mainnet.id]: http(),
        [avalanche.id]: http(),
        [zetachain.id]: http(),
        [anvil.id]: http(),
        [arbitrum.id]: http(),
    }
}) 

const queryClient = new QueryClient();

export function WProviders({children}){
    return (
        <WagmiProvider config={configure}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider coolMode theme={midnightTheme()}>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}