import { IWalletProvider } from "./Wallet/IWalletProvider.js";
import { WalletProviderRegistry } from "./Wallet/WalletProviderRegistry.js";
import { useState, useEffect, useImperativeHandle, Ref, forwardRef } from 'react';
import React from "react";
import { LocalInjectedWallet } from "./Wallet/WalletProviders/LocalInjectedWallet.js";
export interface LocalInjectedWalletUIProps {
    providerSelectedHandler: any;
    network: string;
    localAccount: string;
}
interface LocalInjectedWalletUMethods {
    toggleWallet: () => void;
  }

interface LocalInjectedWalletUIState {
    showConnect: boolean;
    showSendZkTransaction: boolean;
    showSignMessage: boolean;
    showWallet: boolean;
}
const LocalInjectedWalletUI: React.ForwardRefRenderFunction<LocalInjectedWalletUMethods, LocalInjectedWalletUIProps> = ({ providerSelectedHandler, network, localAccount }, ref : Ref<LocalInjectedWalletUMethods>) => {

    const confirmDivRef = React.createRef();
    const [state, setState] = useState<LocalInjectedWalletUIState>({
        showConnect: true,
        showSendZkTransaction: true,
        showSignMessage: true,
        showWallet: false
    });

    useEffect(() => {

        (async () => {
            //const localWalletProvider = (window as any).zkshield.walletProvider as LocalInjectedWallet;


        })();
    }, []);

    const toggleWallet = () => {
        setState({ ...state, showWallet: !state.showWallet });
    }

    useImperativeHandle(ref, () => ({
        toggleWallet
      }));

    return (
        <div>
            <div>
                <button onClick={() => toggleWallet()}>{state.showWallet ? "Hide Wallet" : "Show Wallet"}</button>
            </div>
            {state.showWallet &&
                <div>
                    <h1>Local Blockchain Wallet</h1>
                    <div>
                        {state.showConnect &&
                            <>
                                <p>Connect with {window.location.origin}</p>
                                <div>
                                    <button>Cancel</button>
                                    <button>Connect</button>
                                </div>
                            </>
                        }
                    </div>
                    <div>
                        {state.showSendZkTransaction &&
                            <>
                                <p>Send ZK Transaction</p>
                                <div>
                                    <button>Cancel</button>
                                    <button>Approve</button>
                                </div>
                            </>
                        }
                    </div>
                    <div>
                        {state.showSignMessage &&
                            <>
                                <p>Sign message</p>
                                <p>Message: </p>
                                <div>
                                    <button>Cancel</button>
                                    <button>Sign</button>
                                </div>
                            </>
                        }
                    </div>
                </div>
            }
        </div>
    );
}

export default forwardRef(LocalInjectedWalletUI);