import NetworkWorkerClient from "./Network/NetworkWorkerClient.js";
import { PublicKey } from "o1js";
import { IWalletProvider } from "./Wallet/IWalletProvider.js";
import { WalletConnectResult } from "./Wallet/WalletConnectResult.js";
export class Authentication {
    walletProvider: IWalletProvider;
    address!: string;
    loggedIn: boolean | undefined;
    authentication: any;
    hasWallet: boolean | undefined;
    hasBeenSetup: boolean | undefined;
    accountExists: boolean | undefined;
    o1jsLoaded: boolean | undefined;
    showRequestingAccount: boolean | undefined;
    showCreateWallet: boolean | undefined;
    fundAccount: boolean | undefined;

    networkClient: NetworkWorkerClient
    constructor(walletProvider: IWalletProvider, networkClient: NetworkWorkerClient) {
        this.networkClient = networkClient;
        this.walletProvider = walletProvider;
        this.networkClient = networkClient;
        this.loggedIn = false;
        this.hasWallet = false;
        this.hasBeenSetup = false;
        this.accountExists = false;
        this.o1jsLoaded = false;
        this.showRequestingAccount = false;
        this.showCreateWallet = false;
        this.fundAccount = false;
    }

    async loadO1js(): Promise<boolean> {
        await this.networkClient.loado1js();
        await this.networkClient.setupActiveInstance();
        this.o1jsLoaded = true;
        return true;
    }

    async checkForWallet(): Promise<boolean> {
        return this.walletProvider.hasWallet();
    }
    
    async login(): Promise<WalletConnectResult> {
        const result = await this.walletProvider.connect();
        this.address = result.connectedAccount;
        return result;
    }
    
    async doesAccountExist(): Promise<boolean> {
        try {
        const res = await this.networkClient.fetchUserAccount(this.address) as any;
        console.log("does account exist", res);
        this.fundAccount = res.error != null;
        return !this.fundAccount;
        } catch (e) {
            console.log("error fetching account", e);
            return false;
        }
    }

    getShortAddress(): string {
        return this.address.substring(0, 5) + "..." + this.address.substring(this.address.length - 5, this.address.length);
    }

}