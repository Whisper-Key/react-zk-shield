import { INetwork } from "./INetwork.js";
import {
  Mina,
  PrivateKey,
} from 'o1js'

export class RemoteBlockchain implements INetwork {
  name: string;
  useProofs: boolean;
  blockchain: any;
  url: string;
  archiveUrl: string;
  constructor(name: string, useProofs: boolean, url: string, archiveUrl: string) {
    this.name = name;
    this.useProofs = true;
    this.url = url;
    this.archiveUrl = archiveUrl;
  }

  setActiveInstance() {
    this.blockchain = Mina.LocalBlockchain({ proofsEnabled: this.useProofs });
    this.blockchain = Mina.Network({
      mina: this.url,
      archive: this.archiveUrl,
    });
    Mina.setActiveInstance(this.blockchain);
  }

  fetchUserAccount(publicKey: string) {
    
  }
}