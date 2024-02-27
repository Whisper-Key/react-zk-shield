import { ChainSelectedResult } from "./ChainSelectedResult.js";
import { SignedMessageResult } from "./SignedMessageResult.js";
import { WalletAccount } from "./WalletAccount.js";
import { WalletConnectResult } from "./WalletConnectResult.js";
import { WalletTransactionResult } from "./WalletTransactionResult.js";


export interface IWalletProvider {
    name: string;
    description: string;
    hasWallet(): boolean;
    connect(): Promise<WalletConnectResult>;
    sendZkTransaction(json: string, fee: number, memo: string) : Promise<WalletTransactionResult>;
    signMessage(message: string) : Promise<SignedMessageResult>;
    selectChain(chainID: string): Promise<ChainSelectedResult>;
}
