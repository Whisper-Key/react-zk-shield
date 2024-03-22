import { INetwork } from "./INetwork.js";
import {
  Mina,
  PrivateKey,
  PublicKey,
  fetchAccount,
} from 'o1js'
import NetworkWorkerClient from "./NetworkWorkerClient.js";

export class RemoteBlockchain implements INetwork {
  name: string;
  useProofs: boolean;
  blockchain: any;
  url: string;
  archiveUrl: string;
  networkClient: NetworkWorkerClient;

  constructor(name: string, useProofs: boolean, url: string, archiveUrl: string) {
    this.name = name;
    this.useProofs = true;
    this.url = url;
    this.archiveUrl = archiveUrl;
    this.networkClient = new NetworkWorkerClient();

    this.setActiveInstance();
  }

  async setActiveInstance() {
    //this.blockchain = Mina.LocalBlockchain({ proofsEnabled: this.useProofs });
    this.blockchain = Mina.Network({
      mina: this.url,
      archive: this.archiveUrl,
    });
    Mina.setActiveInstance(this.blockchain);
    console.log("setting network client");
    // await this.networkClient.setupActiveInstance("berkeley", this.url, this.archiveUrl);

  }

  async fetchUserAccount(publicKey: string) {
    // return this.networkClient.fetchUserAccount(publicKey);
    const publicKeyType = PublicKey.fromBase58(publicKey);
    let fetch = await fetchAccount({ publicKey });
    console.log("fetched @ ", new Date().toLocaleTimeString());
    return fetch;
  }
}