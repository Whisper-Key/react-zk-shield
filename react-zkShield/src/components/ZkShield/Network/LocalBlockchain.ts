import { INetwork } from "./INetwork.js";
import {
    Mina,
    PrivateKey,
    PublicKey,
    fetchAccount,
} from 'o1js'

export class LocalBlockchain implements INetwork {
    name: string;
    useProofs: boolean;
    blockchain: any;
    constructor() {
        this.name = "LocalBlockchain";
        this.useProofs = false;
    }

    setActiveInstance() {
        this.blockchain = Mina.LocalBlockchain({ proofsEnabled: this.useProofs });
        Mina.setActiveInstance(this.blockchain);

    }

    async fetchUserAccount(publicKey: string) {
        console.log("no fetching we are using local blockchain");
      return {error:null};
      
    }

    attachAccount(privateKey: string) {
        const accountKey = PrivateKey.fromBase58(privateKey);
        const account = accountKey.toPublicKey();
        this.blockchain.addAccount(account, '10_000_000_000');
    }

}