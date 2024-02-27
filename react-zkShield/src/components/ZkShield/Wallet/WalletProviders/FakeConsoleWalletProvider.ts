import { ChainSelectedResult } from "../ChainSelectedResult.js";
import { IWalletProvider } from "../IWalletProvider.js";
import { SignedMessageResult } from "../SignedMessageResult.js";
import { WalletConnectResult } from "../WalletConnectResult.js";
import { WalletTransactionResult } from "../WalletTransactionResult.js";

export class FakeConsoleWalletProvider implements IWalletProvider {
    name: string = "FakeConsoleWalletProvider";
    description: string = "Fake Console Wallet Provider";
    walletFound: boolean = false;
    connectResult: WalletConnectResult = new WalletConnectResult(false, "", "", "", "");
    sendZkTransactionResult: WalletTransactionResult = new WalletTransactionResult(false, "", "", "", "", "");
    signMessageResult: SignedMessageResult = new SignedMessageResult(false, "", "", "", "", "");

    constructor(walletFound: boolean, connectResult: WalletConnectResult, sendZkTransactionResult: WalletTransactionResult, signMessageResult: SignedMessageResult) {
        this.walletFound = walletFound;
        this.connectResult = connectResult;
        this.sendZkTransactionResult = sendZkTransactionResult;
        this.signMessageResult = signMessageResult;
    }
    selectChain(chainID: string): Promise<ChainSelectedResult> {
        console.log("FakeConsoleWalletProvider.selectChain", chainID);
        return Promise.resolve(new ChainSelectedResult(true, chainID, "", "", "", ""));
    }

    hasWallet(): boolean {
        console.log("FakeConsoleWalletProvider.hasWallet", this.walletFound);
        return this.walletFound;
    }
    connect(): Promise<WalletConnectResult> {
        const result = this.connectResult;
        console.log("FakeConsoleWalletProvider.connect", result);
        return Promise.resolve(result);
    }
    sendZkTransaction(json: string, fee: number, memo: string): Promise<WalletTransactionResult> {
        const result = this.sendZkTransactionResult
        console.log("FakeConsoleWalletProvider.sendZkTransaction", result);
        return Promise.resolve(result);
    }
    signMessage(message: string): Promise<SignedMessageResult> {
        const result = this.signMessageResult;
        console.log("FakeConsoleWalletProvider.signMessage", result);
        return Promise.resolve(result);
    }

}