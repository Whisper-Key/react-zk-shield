import { IWalletProvider, ChainSelectedResult, SignedMessageResult, WalletConnectResult, WalletTransactionResult } from "zkshield";
export class AwesomeWalletProvider implements IWalletProvider {
    requestAccounts(): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
   
    name: string = "Awesome Wallet";
    description: string = "An awesome wallet to behold.";

    hasWallet(): boolean {
        console.log("AwesomeWalletProvider.hasWallet");
        return true;
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