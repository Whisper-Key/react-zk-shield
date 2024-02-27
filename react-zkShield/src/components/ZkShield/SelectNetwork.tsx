import { IWalletProvider } from "./Wallet/IWalletProvider.js";
import { WalletProviderRegistry } from "./Wallet/WalletProviderRegistry.js";
import { useState, useEffect } from 'react';
import React from "react";
export interface SelectNetworkProps {
    networkSelectedHandler: any;
  }
  interface SelectNetworkState {
    networksLoaded: boolean;
    networks: IWalletProvider[] | null;
  }
const SelectNetwork: React.FC<SelectNetworkProps> = ({ networkSelectedHandler }) => {

    const [state, setState] = useState<SelectNetworkState>({
        networksLoaded: false,
        networks: null,
    });

    const supportedNetworks = ["local", "mainnet",
    "devnet",
    "berkeley",
    "testworld2"];

    const networkChanged = (event: any) => {
        console.log("SelectNetwork.networkChanged", event.target.value);
        networkSelectedHandler(event.target.value);
    }
    return (
        <div>
            <h1>Select Network</h1>
            <select onChange={networkChanged}>
                <option>Select a network</option>

                {supportedNetworks.map((network) => (
                    <option key={network}>
                        {network}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectNetwork;