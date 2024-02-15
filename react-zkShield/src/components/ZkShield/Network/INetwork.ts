import { LocalBlockchain } from "./LocalBlockchain.js";
import { RemoteBlockchain } from "./RemoteBlockchain.js";

export interface INetwork {
    name: string;
    useProofs: boolean;
    blockchain: any;
    setActiveInstance(): void;
    fetchUserAccount(publicKey: string): any;
}

export type networks = "LocalBlockchain" | "Berkeley" | "Mainnet" | "Testnet" | "Custom";

export class NetworkFactory {
    static createNetwork(network?: networks): INetwork {

        if (!network) {
            network = process.env.REACT_APP_NETWORK as networks || "LocalBlockchain";
            console.log("connecting to local blockchain...");
        }

        switch (network) {
            case "LocalBlockchain":
                return new LocalBlockchain();
            case "Berkeley":
                return new RemoteBlockchain("Berkeley", true, "https://proxy.berkeley.minaexplorer.com/graphql", "https://archive.berkeley.minaexplorer.com/");
            case "Mainnet":
                return new RemoteBlockchain("Mainnet", true, "https://minaprotocol.com", "https://minaprotocol.com");
            case "Testnet":
                return new RemoteBlockchain("Testnet", true, "https://proxy.berkeley.minaexplorer.com/graphql", "https://archive.berkeley.minaexplorer.com/");
            default:
                throw new Error("Invalid network");
        }
    }
}