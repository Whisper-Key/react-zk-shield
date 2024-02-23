import { WalletAccount } from "./WalletAccount";
import { WalletConnectResult } from "./WalletConnectResult";


export interface IWalletProvider {
    name: string;
    hasWallet(): boolean;
    connect(): Promise<WalletConnectResult>;
}
