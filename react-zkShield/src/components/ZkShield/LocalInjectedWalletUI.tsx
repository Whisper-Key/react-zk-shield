import { IWalletProvider } from "./Wallet/IWalletProvider.js";
import { WalletProviderRegistry } from "./Wallet/WalletProviderRegistry.js";
import { useState, useEffect, useImperativeHandle, Ref, forwardRef } from 'react';
import { PublicKey, PrivateKey, Mina } from "o1js";

import React from "react";
import { LocalInjectedWallet } from "./Wallet/WalletProviders/LocalInjectedWallet.js";
import { AddressUtitlities } from "../../modules/AddressUtitlities.js";
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
    account: PublicKey | null,
    balance: bigint | null,
}
const LocalInjectedWalletUI: React.ForwardRefRenderFunction<LocalInjectedWalletUMethods, LocalInjectedWalletUIProps> = ({ providerSelectedHandler, network, localAccount }, ref: Ref<LocalInjectedWalletUMethods>) => {

    const confirmDivRef = React.createRef();
    const [state, setState] = useState<LocalInjectedWalletUIState>({
        showConnect: true,
        showSendZkTransaction: true,
        showSignMessage: true,
        showWallet: true,
        account: null,
        balance: null
    });



    useEffect(() => {

        (async () => {
            const local = Mina.LocalBlockchain({ proofsEnabled: false });
            Mina.setActiveInstance(local);
            const publicKey = PrivateKey.fromBase58(localAccount).toPublicKey();
            local.addAccount(publicKey, '10_000_000_000');
            const account = Mina.getAccount(publicKey);
            //const localWalletProvider = (window as any).zkshield.walletProvider as LocalInjectedWallet;
            setState({ ...state, account:  publicKey, balance: account.balance.toBigInt()});

        })();
    }, []);

    const toggleWallet = () => {

        const currentMode = window.document.getElementById('local-wallet-toggle')!.innerText;
        console.log("currentMode", currentMode);

        window.document.getElementById('local-wallet-toggle')!.innerText = currentMode === "Show Wallet" ? "Hide Wallet" : "Show Wallet";
        window.document.getElementById('local-wallet')!.style.display = currentMode == "Show Wallet" ? 'none' : 'block';
    }

    // useImperativeHandle(ref, () => ({
    //     toggleWallet
    // }));

    const sdk = (window as any).zkshield;
    sdk.localConnector = {};
    sdk.localConnector.showConnect = () => {
        setState({ ...state, showConnect: true });
    }
    sdk.localConnector.showSendZkTransaction = () => {
        setState({ ...state, showSendZkTransaction: true });
    }

    const hideWallet = () => {
        // window.document.getElementById('local-wallet-toggle')!.innerText = "Show Wallet";
        window.document.getElementById('local-wallet')!.style.display ='none';
        window.document.getElementById('local-wallet-hide')!.style.display ='none';
        window.document.getElementById('local-wallet-show')!.style.display ='';
        console.log("hide wallet from wallet UI");
    }

    const showWallet = () => {
        // window.document.getElementById('local-wallet-toggle')!.innerText = "Hide Wallet";
        window.document.getElementById('local-wallet')!.style.display ='block';
        window.document.getElementById('local-wallet-show')!.style.display ='none';
        window.document.getElementById('local-wallet-hide')!.style.display ='';
        console.log("show wallet from wallet UI");
    }

    const copyAddress = () => {
        navigator.clipboard.writeText(state.account!.toBase58());
    }

    return (
        <div>
            <div>
                <button id="local-wallet-hide" className="btn btn-sm btn-accent" onClick={hideWallet}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
</svg>Hide Wallet</button>
                <button id="local-wallet-show" className="btn btn-sm btn-accent" style={{ "display": "none" }} onClick={showWallet}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
</svg>Show Wallet</button>
            </div>
                <div id="local-wallet">
                    <h1>Local Blockchain Wallet</h1>
                    <div>
                        { state.account != null && 
                            <a onClick={copyAddress} style={{"cursor": "pointer"}}>
                            {AddressUtitlities.shortenAddress(state.account.toBase58())}
                            </a>
                        }
                    </div>
                    <div>
                        {state.balance != null &&
                            <span>{state.balance.toString()} MINA</span>
                        }
                    </div>
                    <div>
                        <div id="local-wallet-connect" style={{ "display": "none" }}>
                            <p>Connect with {window.location.origin}</p>
                            <div>
                                <button className="btn btn-sm" id="local-wallet-connect-cancel">Cancel</button>
                                <button className="btn btn-sm btn-primary" id="local-wallet-connect-connect">Connect</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div id="local-wallet-sendZkTransaction" style={{ "display": "none" }}>
                            <p>Send ZK Transaction</p>
                            <p>Information...</p>
                            <div>
                                <button className="btn btn-sm" id="local-wallet-sendZkTransaction-cancel">Cancel</button>
                                <button className="btn btn-sm btn-primary" id="local-wallet-sendZkTransaction-approve">Approve</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div id="local-wallet-signMessage" style={{ "display": "none" }}>

                            <p>Sign message</p>
                            <p>Message: </p>
                            <div>
                                <button className="btn btn-sm" id="local-wallet-signMessage-cancel">Cancel</button>
                                <button className="btn btn-sm btn-primary" id="local-wallet-signMessage-sign">Sign</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default forwardRef(LocalInjectedWalletUI);