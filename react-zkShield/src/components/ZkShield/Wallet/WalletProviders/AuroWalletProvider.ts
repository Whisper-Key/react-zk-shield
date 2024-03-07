import { get } from "http";
import { IWalletProvider } from "../IWalletProvider.js";
import { WalletAccount } from "../WalletAccount.js";
import { SignedMessageResult } from "../SignedMessageResult.js";
import { WalletTransactionResult } from "../WalletTransactionResult.js";
import { ChainSelectedResult } from "../ChainSelectedResult.js";
import { WalletConnectResult } from "../WalletConnectResult.js";

export class AuroWalletProvider implements IWalletProvider {
    name: string = "Auro Wallet";
    description: string = "Auro Wallet Provider";
    mina: any;

    constructor(mina: any) {
        this.mina = mina;
        console.log("AuroWalletProvider.constructor", mina);
    }
    async selectChain(chainID: string): Promise<ChainSelectedResult> {
        try {
            await this.mina.switchChain({chainId: chainID.trim(),});
            console.log("AuroWalletProvider.selectChain", chainID);
            return Promise.resolve(new ChainSelectedResult(true, chainID, "", "", "", ""));
        } catch (e: any) {
            console.log("AuroWalletProvider.selectChain", e);
            return Promise.resolve(new ChainSelectedResult(false, chainID, e.code, e.message, e.message, e.data));
        }
    }

    async sendZkTransaction(transaction: any, fee: number, memo: string): Promise<WalletTransactionResult> {
        const json = transaction.toJSON();
        try {
            const { hash } = await this.mina.sendTransaction({
                transaction: json,
                feePayer: {
                    fee: fee,
                    memo: memo
                }
            });
            return new WalletTransactionResult(true, hash, "", "", "", hash);
        } catch (e: any) {
            var result = this.getWalletTransactionError(e);
            return result;
        }
    }
    getWalletTransactionError(e: any): WalletTransactionResult {
        return new WalletTransactionResult(false, "", e.code, e.message, e.message, e.data);
    }

    async signMessage(message: string): Promise<SignedMessageResult> {
        try {
            const signResult = await this.mina?.signMessage({ message: message });
            return new SignedMessageResult(true, "", "", "", signResult, null);
        } catch (e: any) {
            var result = this.getSignedMessageError(e);
            return result;
        }
    }
    getSignedMessageError(e: any): SignedMessageResult {
        return new SignedMessageResult(false, e.code, e.message, e.message, e.data, e);
    }

    hasWallet(): boolean {
        return this.mina != null;
    }
    async connect(): Promise<WalletConnectResult> {
        try {
            const requestAccounts = await this.mina.requestAccounts();

            // Even when there are mulitple accounts Auro only returns the first one?
            const account = requestAccounts[0];

            return new WalletConnectResult(true, account, "", "", "");
        } catch (e: any) {

            var result = this.getWalletConnectError(e);
            return result;
        }
    }

    private getWalletConnectError(e: any): WalletConnectResult {

        const errorKey = Object.keys(this.friendlyErrorMap).find(key => e.message.toLowerCase().includes(key.toLowerCase()));

        var result = new WalletConnectResult(false, "", "", "", "");
        result.errorCode = e.code;
        result.errorMessage = e.message;
        result.friendlyErrorMessage = this.friendlyErrorMap[errorKey!] || e.message;

        return result;
    }

    private friendlyErrorMap: any = {
        "user reject": "You cancelled connection with Mina wallet!",
        "create or restore wallet": "Please create or restore a wallet first!"
    }
}