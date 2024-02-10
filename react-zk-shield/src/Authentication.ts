import NetworkWorkerClient from "./Network/NetworkWorkerClient";
import { PublicKey } from "o1js";
export class Authentication {
    mina: any;
    address: string;
    loggedIn: boolean;
    authentication: any;
    hasWallet: boolean;
    hasBeenSetup: boolean;
    accountExists: boolean;
    publicKey: null;
    o1jsLoaded: boolean;
    showRequestingAccount: boolean;
    showCreateWallet: boolean;
    fundAccount: boolean;

    networkClient: NetworkWorkerClient
    constructor(mina: any, networkClient: NetworkWorkerClient) {
        this.networkClient = networkClient;
        this.mina = mina;
        this.networkClient = networkClient;
    }

    async loadO1js(): Promise<boolean> {
        await this.networkClient.loado1js();
        await this.networkClient.setupActiveInstance();
        this.o1jsLoaded = true;
        return true;
    }

    async checkForWallet(): Promise<boolean> {
        const mina = (window as any).mina;
        this.hasWallet = mina != null;
        return this.hasWallet;
    }
    
    async login(): Promise<any> {
        try {
            this.address = (await this.mina.requestAccounts())[0];
            this.loggedIn = true;
            console.log("logged in: ", this.address);
            return {
                success: true
            };
        } catch (e: any) {

            this.loggedIn = false;
            var result = {
                success: false,
                error: "",
                message: ""
            };
            if (e.message == "user reject") {
                result.error = e.message;
                result.message = "You cancelled connection with Mina wallet!";
            }
            else if (e.message == "please create or restore wallet first") {
                result.error = e.message;
                result.message = "Please create or restore a wallet first!";
            }
            return result;
        }
    }
    
    async doesAccountExist(): Promise<boolean> {
        const res = await this.networkClient.fetchUserAccount(this.address) as any;
        console.log("does account exist", res);
        this.fundAccount = res.error != null;
        return !this.fundAccount;
    }

    getShortAddress(): string {
        return this.address.substring(0, 5) + "..." + this.address.substring(this.address.length - 5, this.address.length);
    }

}