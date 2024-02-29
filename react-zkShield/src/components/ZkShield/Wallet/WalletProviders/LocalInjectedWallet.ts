import { get } from "http";
import { IWalletProvider } from "../IWalletProvider.js";
import { WalletConnectResult } from "../WalletConnectResult.js";
import { WalletAccount } from "../WalletAccount.js";
import { SignedMessageResult } from "../SignedMessageResult.js";
import { WalletTransactionResult } from "../WalletTransactionResult.js";
import { ChainSelectedResult } from "../ChainSelectedResult.js";

export class LocalInjectedWallet implements IWalletProvider {
    
    name: string = "Local Injected Wallet";
    description: string = "A local wallet injected into the browser, using the Mina Local Blockchain. This is for development purposes only.";

    hasWallet(): boolean {
        throw new Error("Method not implemented.");
    }
    connect(): Promise<WalletConnectResult> {
        throw new Error("Method not implemented.");
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