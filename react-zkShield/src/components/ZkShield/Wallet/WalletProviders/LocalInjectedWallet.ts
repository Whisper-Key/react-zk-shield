import { get } from "http";
import { IWalletProvider } from "../IWalletProvider.js";
import { WalletConnectResult } from "../WalletConnectResult.js";
import { WalletAccount } from "../WalletAccount.js";
import { SignedMessageResult } from "../SignedMessageResult.js";
import { WalletTransactionResult } from "../WalletTransactionResult.js";
import { ChainSelectedResult } from "../ChainSelectedResult.js";
import { INetwork } from "../../Network/INetwork.js";
import { LocalBlockchain } from "../../Network/LocalBlockchain.js";
import { CircuitString, PrivateKey, Signature, Types, Mina } from "o1js";
// import * as o1 from "o1js";

export class LocalInjectedWallet implements IWalletProvider {

    name: string = "Local Injected Wallet";
    description: string = "A local wallet injected into the browser, using the Mina Local Blockchain. This is for development purposes only.";
    walletAvailable: boolean = true;
    localBlockchain: LocalBlockchain;
    connected: boolean = false;
    connectedZkApps: string[] = [];
    environment: any;
    localAccount: PrivateKey;
    constructor(environment: any, localAccount: string, walletAvailable: boolean) {
        this.environment = environment;
        this.walletAvailable = walletAvailable;
        this.localAccount = PrivateKey.fromBase58(localAccount);
    }

    hasWallet(): boolean {
        console.log("LocalInjectedWallet.hasWallet", this.walletAvailable);
        return this.walletAvailable;
    }
    async connect(): Promise<WalletConnectResult> {
        let connected = false;
        try {
            if (!this.connectedZkApps.includes(this.environment.location.origin)) {
                this.showWallet();
                connected = (await this.showConnectDialog()) === 'connected';
                console.log("LocalInjectedWallet.connect", connected);

                if (connected) {
                    this.connectedZkApps.push(this.environment.location.origin);
                    return Promise.resolve(new WalletConnectResult(true, "", "", "", ""));

                } else {
                    return Promise.resolve(new WalletConnectResult(false, "", "", "", ""));
                }

            }
            return Promise.resolve(new WalletConnectResult(true, "", "", "", ""));

        } catch (e: any) {
            return Promise.resolve(new WalletConnectResult(false, e.code, e.message, e.message, e.data));
        }
    }

    showConnectDialog(): Promise<string> {
        return new Promise((resolve, reject) => {

            this.environment.document.getElementById('local-wallet-connect')!.style.display = 'block';
            const cancelButton = this.environment.document.getElementById('local-wallet-connect-cancel');
            if (cancelButton) {
                cancelButton.addEventListener('click', () => {
                    this.environment.document.getElementById('local-wallet-connect')!.style.display = 'none';

                    reject('cancelled');
                });
            }

            const connectButton = this.environment.document.getElementById('local-wallet-connect-connect');
            if (connectButton) {
                connectButton.addEventListener('click', () => {
                    this.environment.document.getElementById('local-wallet-connect')!.style.display = 'none';

                    resolve('connected');
                });
            }
        });
    }


    disconnect(): Promise<WalletConnectResult> {
        try {
            if (this.connectedZkApps.includes(this.environment.location.origin)) {
                this.connectedZkApps = this.connectedZkApps.filter((value) => value !== this.environment.location.origin);
            }
            console.log("LocalInjectedWallet.disconnect", this.connectedZkApps);
            return Promise.resolve(new WalletConnectResult(false, "", "", "", ""));
        } catch (e: any) {
            return Promise.resolve(new WalletConnectResult(true, e.code, e.message, e.message, e.data));
        }
    }

    async sendZkTransaction(json: any, fee: number, memo: string): Promise<WalletTransactionResult> {
        const command = JSON.parse(json) as Types.Json.ZkappCommand;
        console.log("LocalInjectedWallet.sendZkTransaction.command");
        const transaction = Mina.Transaction.fromJSON(command);

        console.log("LocalInjectedWallet.sendZkTransaction.transaction");
        //return Promise.resolve(new WalletTransactionResult(true, "", "cancelled", "user reject", "User rejected the transaction", ""));
        this.showWallet();

        let approved = false;
        try {
            if (!this.connectedZkApps.includes(this.environment.location.origin)) {
                return new WalletTransactionResult(false, "", "Not connected", "Not connected", "Not connected", "Not connected");
            }
            approved = (await this.showSendZkDialog()) === 'approved';
            console.log("LocalInjectedWallet.approved", approved);
            if (approved) {
                const chain = Mina.LocalBlockchain({ proofsEnabled: false });
                Mina.setActiveInstance(chain)
                console.log("LocalInjectedWallet.sendZkTransaction", transaction, fee, memo);
                //await transaction.prove();
                const { hash } = await transaction.sign([this.localAccount]).send();
                console.log("LocalInjectedWallet.sendZkTransaction.hash", hash);
                return Promise.resolve(new WalletTransactionResult(true, hash()!, "", "", "", hash));

            } else {
                return Promise.resolve(new WalletTransactionResult(true, "", "cancelled", "user reject", "User rejected the transaction", ""));
            }
        } catch (e: any) {
            var result = this.getWalletTransactionError(e);
            console.log("LocalInjectedWallet.sendZkTransaction.error", result);
            return Promise.resolve(result);
        }
    }

    showSendZkDialog(): Promise<string> {
        return new Promise((resolve, reject) => {

            this.environment.document.getElementById('local-wallet-sendZkTransaction')!.style.display = 'block';
            const cancelButton = this.environment.document.getElementById('local-wallet-sendZkTransaction-cancel');
            if (cancelButton) {
                cancelButton.addEventListener('click', () => {
                    this.environment.document.getElementById('local-wallet-sendZkTransaction')!.style.display = 'none';

                    reject('cancelled');
                });
            }

            const connectButton = this.environment.document.getElementById('local-wallet-sendZkTransaction-approve');
            if (connectButton) {
                connectButton.addEventListener('click', () => {
                    this.environment.document.getElementById('local-wallet-sendZkTransaction')!.style.display = 'none';

                    resolve('approved');
                });
            }
        });
    }


    async signMessage(message: string): Promise<SignedMessageResult> {
        this.showWallet();
        let shouldSign = false;
        console.log("LocalInjectedWallet.signMessage.message", message);
        shouldSign = (await this.showSignMessageDialog()) === 'signed';
        if (shouldSign) {
            const signature = Signature.create(this.localAccount, CircuitString.fromString(message).toFields());
           console.log("LocalInjectedWallet.signMessage.signature", signature.toJSON());
            return Promise.resolve(new SignedMessageResult(true, "", "", "", signature, null));
        } else {
            return Promise.resolve(new SignedMessageResult(false, "", "cancelled", "user reject", "User rejected the signing", null));
        }
    }

    showSignMessageDialog(): Promise<string> {
        return new Promise((resolve, reject) => {

            this.environment.document.getElementById('local-wallet-signMessage')!.style.display = 'block';
            const cancelButton = this.environment.document.getElementById('local-wallet-signMessage-cancel');
            if (cancelButton) {
                cancelButton.addEventListener('click', () => {
                    this.environment.document.getElementById('local-wallet-signMessage')!.style.display = 'none';

                    reject('cancelled');
                });
            }

            const connectButton = this.environment.document.getElementById('local-wallet-signMessage-sign');
            if (connectButton) {
                connectButton.addEventListener('click', () => {
                    this.environment.document.getElementById('local-wallet-signMessage')!.style.display = 'none';

                    resolve('signed');
                });
            }
        });
    }


    selectChain(chainID: string): Promise<ChainSelectedResult> {
        console.log("LocalInjectedWallet.selectChain", chainID);
        return Promise.resolve(new ChainSelectedResult(false, chainID, "Cannot change chain", "Cannot change chain", "Cannot change chain", "Cannot change chain"));
    }

    getWalletTransactionError(e: any): WalletTransactionResult {
        return new WalletTransactionResult(false, "", e.code, e.message, e.message, e.data);
    }

    hideWallet(): void {
        // this.environment.document.getElementById('local-wallet-toggle')!.innerText = "Show Wallet";
        this.environment.document.getElementById('local-wallet')!.style.display ='none';
        this.environment.document.getElementById('local-wallet-hide')!.style.display ='none';
        this.environment.document.getElementById('local-wallet-show')!.style.display ='block';
     }

    showWallet(): void {
        // this.environment.document.getElementById('local-wallet-toggle')!.innerText = "Hide Wallet";
        this.environment.document.getElementById('local-wallet')!.style.display ='block';
        this.environment.document.getElementById('local-wallet-show')!.style.display ='none';
        this.environment.document.getElementById('local-wallet-hide')!.style.display ='block';
    }
}