import { INetwork } from "./INetwork";
import {
    Mina,
    PrivateKey,
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

    fetchUserAccount(publicKey: string) {
        
    }

    attachAccount(privateKey: string) {
        const accountKey = PrivateKey.fromBase58(privateKey);
        const account = accountKey.toPublicKey();
        this.blockchain.addAccount(account, '10_000_000_000');
    }

}