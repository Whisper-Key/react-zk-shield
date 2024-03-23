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
    let environment: any = null;

    useEffect(() => {

        (async () => {
            environment = window;
        })();
    }, []);

    const networkChanged = (event: any) => {
        console.log("SelectNetwork.networkChanged", event.target.value);
        environment!.zkshield!.changeNetwork(event.target.value);
    }

    const connectHandler = () => {
        if(environment!.zkshield!.networkSet === null || environment!.zkshield!.networkSet === undefined) {
            environment!.zkshield!.networkSet = false;
        }
        if(environment!.zkshield!.connected === null || environment!.zkshield!.connected === undefined) {
            environment!.zkshield!.connected = false;
        }
        if (environment!.zkshield!.networkSet && !environment!.zkshield!.connected) {
            console.log("wallet connect networkSet", environment!.zkshield!.networkSet);
            console.log("wallet connect connected", environment!.zkshield!.connected);

            window.document.getElementById('local-wallet-choose-network-connect')!.innerHTML = "Disconnect";
            window.document.getElementById('local-wallet-choose-network-connect')!.className = "btn join-item";
            environment!.zkshield!.launch();
        } else if(environment!.zkshield!.networkSet && environment!.zkshield!.connected) {
            window.document.getElementById('local-wallet-choose-network-connect')!.innerHTML = "Connect";
            window.document.getElementById('local-wallet-choose-network-connect')!.className = "btn btn-primary join-item";
            environment!.zkshield!.disconnect();
        } else {
            console.log("network not set");
        }
    }
    return (
        <div>



            <div className="join">

                <select onChange={networkChanged} className="select select-bordered join-item">
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
                <button id="local-wallet-choose-network-connect" onClick={connectHandler} className="btn join-item btn-primary">Connect</button>
            </div>

        </div>
    );
}

export { ChooseNetworkComponent };