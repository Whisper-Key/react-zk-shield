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
    attachAccounts?: string[];

    constructor(attachAccounts?: string[]) {
        this.name = "LocalBlockchain";
        this.useProofs = false;
        this.attachAccounts = attachAccounts;
    }

    setActiveInstance() {
        this.blockchain = Mina.LocalBlockchain({ proofsEnabled: this.useProofs });
        Mina.setActiveInstance(this.blockchain);
        console.log("attaching accounts", this.attachAccounts);

        if (this.attachAccounts) {

            for (let i = 0; i < this.attachAccounts.length; i++) {
                const account = this.attachAccounts[i];
                console.log("attaching account: ", account);
                this.attachAccount(account);
                console.log("attached account: ", account);
            }
        }
    }

    async fetchUserAccount(publicKey: string) {
        console.log("no fetching we are using local blockchain");
        return { error: null };

    }

    attachAccount(account: string) {
        this.blockchain.addAccount(PublicKey.fromBase58(account), '10_000_000_000');
    }

}