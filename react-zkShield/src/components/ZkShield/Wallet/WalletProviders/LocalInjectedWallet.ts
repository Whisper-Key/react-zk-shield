import { get } from "http";
import { IWalletProvider } from "../IWalletProvider.js";
import { WalletConnectResult } from "../WalletConnectResult.js";
import { WalletAccount } from "../WalletAccount.js";
import { SignedMessageResult } from "../SignedMessageResult.js";
import { WalletTransactionResult } from "../WalletTransactionResult.js";
import { ChainSelectedResult } from "../ChainSelectedResult.js";
import { INetwork } from "../../Network/INetwork.js";
import { LocalBlockchain } from "../../Network/LocalBlockchain.js";
import { CircuitString, PrivateKey, Signature } from "o1js";

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
    connect(): Promise<WalletConnectResult> {
        try {
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
            console.log("LocalInjectedWallet.disconnect", this.connectedZkApps);
            return Promise.resolve(new WalletConnectResult(false, "", "", "", ""));
        } catch (e: any) {
            return Promise.resolve(new WalletConnectResult(true, e.code, e.message, e.message, e.data));
        }
    }

    async sendZkTransaction(transaction: any, fee: number, memo: string): Promise<WalletTransactionResult> {
        try {
            if (!this.connectedZkApps.includes(this.environment.location.origin)) {
                return new WalletTransactionResult(false, "", "Not connected", "Not connected", "Not connected", "Not connected");
            }
            console.log("LocalInjectedWallet.sendZkTransaction", transaction, fee, memo);
            await transaction.prove();
            const { hash } = await transaction.sign([this.localAccount]).send();
            return new WalletTransactionResult(true, hash, "", "", "", hash);
        } catch (e: any) {
            var result = this.getWalletTransactionError(e);
            return result;
        }
    }

    signMessage(message: string): Promise<SignedMessageResult> {
        console.log("LocalInjectedWallet.signMessage", message);
        const signature = Signature.create(this.localAccount, CircuitString.fromString(message).toFields());
        return Promise.resolve(new SignedMessageResult(true, "", "", "", signature, null));
    }

    selectChain(chainID: string): Promise<ChainSelectedResult> {
        console.log("LocalInjectedWallet.selectChain", chainID);
        return Promise.resolve(new ChainSelectedResult(false, chainID, "Cannot change chain", "Cannot change chain", "Cannot change chain", "Cannot change chain"));
    }

    getWalletTransactionError(e: any): WalletTransactionResult {
        return new WalletTransactionResult(false, "", e.code, e.message, e.message, e.data);
    }
}