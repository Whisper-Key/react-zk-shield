import { IWalletProvider } from "./Wallet/IWalletProvider.js";
import { WalletProviderRegistry } from "./Wallet/WalletProviderRegistry.js";
import { useState, useEffect } from 'react';
import React from "react";
export interface SelectProviderProps {
    providerSelectedHandler: any;
    network: string;
  }

  interface SelectProviderState {
    providersLoaded: boolean;
    providers: IWalletProvider[] | null;
  }
const SelectProvider: React.FC<SelectProviderProps> = ({ providerSelectedHandler, network }) => {

    const [state, setState] = useState<SelectProviderState>({
        providersLoaded: false,
        providers: null,
    });

    useEffect(() => {
    
        (async () => {
            console.log("SelectProvider.useEffect");
            const aurolib = (window as any).mina;
            console.log("SelectProvider.aurolib", aurolib);
            console.log("SelectProvider.network", network);
            const registry = new WalletProviderRegistry(aurolib, network).supportedProviders;
            setState({ providersLoaded: true, providers: registry });
          
        })();
      }, []);

    const connectProvider = (provider: IWalletProvider) => {
        providerSelectedHandler(provider);
    }

    return (
        <div>
            <h1>Select Wallet Provider</h1>
            <ul>
                {state.providersLoaded && state.providers!.map((provider) => (
                    <li key={provider.name} style={{ cursor: "pointer"}} onClick={() => connectProvider(provider) }>
                        <span title={provider.description}>{provider.name}</span>
                        {/* <button onClick={() => connectProvider(provider) }>Connect to {provider.name}</button> */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SelectProvider;