import { IWalletProvider } from "./Wallet/IWalletProvider.js";
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

    // how do we tie these to supported network classes?
    const supportedNetworks = ["local", "berkeley"];

    const networkChanged = (event: any) => {
        console.log("SelectNetwork.networkChanged", event.target.value);
        networkSelectedHandler(event.target.value);
    }
    return (
        <div>
            <h1>Select Network</h1>
            <select onChange={networkChanged} className="select select-bordered w-full max-w-xs">
                <option>Select a network</option>
                
                {supportedNetworks.map((network) => (
                    <option key={network}>
                        {network}
                    </option>
                ))}
                <option disabled>mainnet</option>
                <option disabled>devnet</option>
                <option disabled>testworld2</option>
            </select>
        </div>
    );
}

export default SelectNetwork;