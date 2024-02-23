import { get } from "http";
import { IWalletProvider } from "../IWalletProvider";
import { WalletConnectResult } from "../WalletConnectResult";
import { WalletAccount } from "../WalletAccount";

export class AuroWalletProvider implements IWalletProvider {
    name: string = "AuroWallet";
    mina: any;

    constructor(name: string, mina: any) {
        this.name = name;
        this.mina = mina;
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

            var result = this.getErrorResult(e);
            return result;
        }
    }

    private getErrorResult(e: any): WalletConnectResult {

        const errorKey = Object.keys(this.friendlyErrorMap).find(key => e.message.toLowerCase().includes(key.toLowerCase()));

        var result = new WalletConnectResult(false, "", "", "", "");
        result.errorCode = e.code;
        result.errorMessage = e.message;
        result.friendlyErrorMessage = this.friendlyErrorMap[errorKey!] || e.message;
      
        return result;
    }

    private friendlyErrorMap:any  = {
        "user reject": "You cancelled connection with Mina wallet!",
        "create or restore wallet": "Please create or restore a wallet first!"
    }
}