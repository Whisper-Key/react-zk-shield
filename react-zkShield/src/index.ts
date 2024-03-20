import {AuthContext, ZkShield } from "./components/ZkShield/ZkShield.js";
import {ChooseNetworkComponent } from "./components/ZkShield/ChooseNetworkComponent.js";
export {AuthContext, ZkShield};
export {ChooseNetworkComponent}
import { LocalInjectedWallet } from "./components/ZkShield/Wallet/WalletProviders/LocalInjectedWallet.js";
import { IWalletProvider } from "./components/ZkShield/Wallet/IWalletProvider.js";
import { ChainSelectedResult } from "./components/ZkShield/Wallet/ChainSelectedResult.js";
import { SignedMessageResult } from "./components/ZkShield/Wallet/SignedMessageResult.js";
import { WalletAccount } from "./components/ZkShield/Wallet/WalletAccount.js";
import { WalletConnectResult } from "./components/ZkShield/Wallet/WalletConnectResult.js";
import { WalletTransactionResult } from "./components/ZkShield/Wallet/WalletTransactionResult.js";
import { AuroWalletProvider } from "./components/ZkShield/Wallet/WalletProviders/AuroWalletProvider.js";
import { FakeConsoleWalletProvider } from "./components/ZkShield/Wallet/WalletProviders/FakeConsoleWalletProvider.js";

export { LocalInjectedWallet, IWalletProvider, ChainSelectedResult, SignedMessageResult, WalletAccount, WalletConnectResult, WalletTransactionResult, AuroWalletProvider, FakeConsoleWalletProvider};
