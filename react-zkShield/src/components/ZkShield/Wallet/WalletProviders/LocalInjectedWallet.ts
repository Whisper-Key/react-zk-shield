import { get } from "http";
import { IWalletProvider } from "../IWalletProvider.js";
import { WalletConnectResult } from "../WalletConnectResult.js";
import { WalletAccount } from "../WalletAccount.js";
import { SignedMessageResult } from "../SignedMessageResult.js";
import { WalletTransactionResult } from "../WalletTransactionResult.js";
import { ChainSelectedResult } from "../ChainSelectedResult.js";
import { INetwork } from "../../Network/INetwork.js";
import { LocalBlockchain } from "../../Network/LocalBlockchain.js";
import { PrivateKey } from "o1js";

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
        return this.walletAvailable;
    }
    connect(): Promise<WalletConnectResult> {
        try {
            if (!this.connectedZkApps.includes(this.environment.location.origin)) {
                this.connectedZkApps.push(this.environment.location.origin);
            }

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

    async sendZkTransaction(transaction: any, fee: number, memo: string): Promise<WalletTransactionResult> {
        try {
            if (!this.connectedZkApps.includes(this.environment.location.origin)) {
                return new WalletTransactionResult(false, "", "Not connected", "Not connected", "Not connected", "Not connected");
            }

            await transaction.prove();
            const { hash } = await transaction.sign([this.localAccount]).send();
            return new WalletTransactionResult(true, hash, "", "", "", hash);
        } catch (e: any) {
            var result = this.getWalletTransactionError(e);
            return result;
        }
    }

    signMessage(message: string): Promise<SignedMessageResult> {
        throw new Error("Method not implemented.");
    }
    selectChain(chainID: string): Promise<ChainSelectedResult> {
        throw new Error("Method not implemented.");
    }

    getWalletTransactionError(e: any): WalletTransactionResult {
        return new WalletTransactionResult(false, "", e.code, e.message, e.message, e.data);
    }
}