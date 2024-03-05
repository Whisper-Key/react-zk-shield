import { LocalBlockchain } from "../Network/LocalBlockchain.js";
import { IWalletProvider } from "./IWalletProvider.js";
import { SignedMessageResult } from "./SignedMessageResult.js";
import { WalletConnectResult } from "./WalletConnectResult.js";
import { AuroWalletProvider } from "./WalletProviders/AuroWalletProvider.js";
import { FakeConsoleWalletProvider } from "./WalletProviders/FakeConsoleWalletProvider.js";
import { LocalInjectedWallet } from "./WalletProviders/LocalInjectedWallet.js";
import { WalletTransactionResult } from "./WalletTransactionResult.js";

export class WalletProviderRegistry {
    supportedProviders: IWalletProvider[] = [];
    auroWalletLib: any;
    network: string;
    localEnvironment: any;
    localAccounts: string[];
    constructor(localEnvironment: any, localAccounts: string[],  auroWalletLib: any, network: string) {
        this.localAccounts = localAccounts;
        this.localEnvironment = localEnvironment;
        this.auroWalletLib = auroWalletLib;
        this.network = network;
        this.supportedProviders = this.getProviderInstances();
    }
    getProviderInstances(): IWalletProvider[] {
        // how do you get classes that implement an interface in JS?
        // is there reflection, can decorators help?

        // for now, just hardcode the providers
        console.log("WalletProviderRegistry.network", this.network);
        if (this.network === "local") {
            return [new LocalInjectedWallet(this.localEnvironment, true)];
        } else {
            return [new AuroWalletProvider(this.auroWalletLib), new FakeConsoleWalletProvider(true, new WalletConnectResult(true, "0x123", "", "", ""), new WalletTransactionResult(true, "", "", "", "", ""), new SignedMessageResult(true, "", "", "", "", ""))];
        }
    }

}