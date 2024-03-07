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
    accountToAttach?: string;

    constructor(attachAccount?: string) {
        this.name = "LocalBlockchain";
        this.useProofs = false;
        this.accountToAttach = attachAccount;
        console.log("LocalBlockchain constructor account to attach", this.accountToAttach);
        console.log("LocalBlockchain constructor attach account", attachAccount);
    }

    setActiveInstance() {
        this.blockchain = Mina.LocalBlockchain({ proofsEnabled: this.useProofs });
        Mina.setActiveInstance(this.blockchain);
        console.log("attaching account", this.accountToAttach);

        if (this.attachAccount) {

            console.log("attaching account: ", this.accountToAttach);
            this.attachAccount(this.accountToAttach!);
            console.log("attached account: ", this.accountToAttach);

        }
    }

    async fetchUserAccount(publicKey: string) {
        console.log("no fetching we are using local blockchain");
        return { error: null };

    }

    attachAccount(account: string) {
        const privateKey = PrivateKey.fromBase58(account);
        const publicKey = privateKey.toPublicKey();
        this.blockchain.addAccount(publicKey, '10_000_000_000');
    }

}