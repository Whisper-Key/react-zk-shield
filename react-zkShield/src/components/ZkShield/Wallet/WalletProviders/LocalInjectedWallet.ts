import { get } from "http";
import { IWalletProvider } from "../IWalletProvider.js";
import { WalletConnectResult } from "../WalletConnectResult.js";
import { WalletAccount } from "../WalletAccount.js";
import { SignedMessageResult } from "../SignedMessageResult.js";
import { WalletTransactionResult } from "../WalletTransactionResult.js";
import { ChainSelectedResult } from "../ChainSelectedResult.js";
import { INetwork } from "../../Network/INetwork.js";
import { LocalBlockchain } from "../../Network/LocalBlockchain.js";

export class LocalInjectedWallet implements IWalletProvider {

    name: string = "Local Injected Wallet";
    description: string = "A local wallet injected into the browser, using the Mina Local Blockchain. This is for development purposes only.";
    walletAvailable: boolean = true;
    localBlockchain: LocalBlockchain;
    connected: boolean = false;
    connectedZkApps: string[] = [];
    environment: any;
    constructor(environment: any, walletAvailable: boolean) {
        this.environment = environment;
        this.walletAvailable = walletAvailable;
    }

    hasWallet(): boolean {
        return this.walletAvailable;
    }
    connect(): Promise<WalletConnectResult> {
        try {
            console.log("LocalInjectedWallet.connect");
            if (!this.connectedZkApps.includes(this.environment.location.origin)) {
                this.connectedZkApps.push(this.environment.location.origin);
            }
            console.log("LocalInjectedWallet.connect", this.connectedZkApps);

            return Promise.resolve(new WalletConnectResult(true, "", "", "", ""));
        } catch (e: any) {
            return Promise.resolve(new WalletConnectResult(false, e.code, e.message, e.message, e.data));
        }
    }

    disconnect(): Promise<WalletConnectResult> {
        try {
            if (this.connectedZkApps.includes(this.environment.location.origin)) {
                this.connectedZkApps = this.connectedZkApps.filter((value) => value !== this.environment.location.origin);
            }
            return Promise.resolve(new WalletConnectResult(true, "", "", "", ""));
        } catch (e: any) {
            return Promise.resolve(new WalletConnectResult(false, e.code, e.message, e.message, e.data));
        }
    }
    sendZkTransaction(json: string, fee: number, memo: string): Promise<WalletTransactionResult> {
        throw new Error("Method not implemented.");
    }
    signMessage(message: string): Promise<SignedMessageResult> {
        throw new Error("Method not implemented.");
    }
    selectChain(chainID: string): Promise<ChainSelectedResult> {
        throw new Error("Method not implemented.");
    }
}