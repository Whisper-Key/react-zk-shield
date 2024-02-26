import { IWalletProvider } from "./IWalletProvider.js";
import { SignedMessageResult } from "./SignedMessageResult.js";
import { WalletConnectResult } from "./WalletConnectResult.js";
import { AuroWalletProvider } from "./WalletProviders/AuroWalletProvider.js";
import { FakeConsoleWalletProvider } from "./WalletProviders/FakeConsoleWalletProvider.js";
import { WalletTransactionResult } from "./WalletTransactionResult.js";

export class WalletProviderRegistry {
    supportedProviders: IWalletProvider[] = [];
    auroWalletLib: any;
    constructor(auroWalletLib: any) {
        this.auroWalletLib = auroWalletLib;
        this.supportedProviders = this.getProviderInstances();
    }
    getProviderInstances(): IWalletProvider[] {
        // how do you get classes that implement an interface in JS?
        // is there reflection, can decorators help?

        // for now, just hardcode the providers
         return [new FakeConsoleWalletProvider(true, new WalletConnectResult(true, "0x123", "", "", ""), new WalletTransactionResult(true, "", "", "", "", ""), new SignedMessageResult(true, "", "", "", "", "")),
        new AuroWalletProvider(this.auroWalletLib)];
    }

}