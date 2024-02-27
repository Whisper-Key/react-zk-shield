import { LocalBlockchain } from "./LocalBlockchain.js";
import { RemoteBlockchain } from "./RemoteBlockchain.js";

export interface INetwork {
    name: string;
    useProofs: boolean;
    blockchain: any;
    setActiveInstance(): void;
    fetchUserAccount(publicKey: string): any;
}

export type supportedNetwork = "local" | "berkeley" | "mainnet" | "testworld2" | "custom";

export class NetworkFactory {
    static get(network: supportedNetwork) {
        throw new Error('Method not implemented.');
    }
    static createNetwork(network?: supportedNetwork): INetwork {

        if (!network) {
            network = process.env.REACT_APP_NETWORK as supportedNetwork || "local";
            console.log("connecting to local blockchain...");
        }

        switch (network) {
            case "local":
                return new LocalBlockchain();
            case "berkeley":
                return new RemoteBlockchain("berkeley", true, "https://proxy.berkeley.minaexplorer.com/graphql", "https://archive.berkeley.minaexplorer.com/");
            case "mainnet":
                return new RemoteBlockchain("mainnet", true, "https://minaprotocol.com", "https://minaprotocol.com");
            case "testworld2":
                return new RemoteBlockchain("testworld2", true, "https://proxy.berkeley.minaexplorer.com/graphql", "https://archive.berkeley.minaexplorer.com/");
            default:
                throw new Error("Invalid network");
        }
    }
}