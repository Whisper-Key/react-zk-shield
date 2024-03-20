import { withVersionNumber } from "o1js/dist/node/bindings/lib/binable.js";
import { IWalletProvider } from "./Wallet/IWalletProvider.js";
import { useState, useEffect } from 'react';
import React from "react";

  interface SelectNetworkState {
    networksLoaded: boolean;
    networks: IWalletProvider[] | null;
  }
const ChooseNetworkComponent = () => {

    const [state, setState] = useState<SelectNetworkState>({
        networksLoaded: false,
        networks: null,
    });

    // how do we tie these to supported network classes?
    const supportedNetworks = ["local", "berkeley"];
    let environment:any = null;
    
    useEffect(() => {

        (async () => {
            environment = window;
        })();
    }, []);

    const networkChanged = (event: any) => {
        console.log("SelectNetwork.networkChanged", event.target.value);
        environment!.zkshield!.changeNetwork(event.target.value);
    }
    return (
        <div>
            <select onChange={networkChanged}>
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

export { ChooseNetworkComponent };