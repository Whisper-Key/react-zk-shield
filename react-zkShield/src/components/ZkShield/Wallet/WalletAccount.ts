export class WalletAccount {
    name: string;
    publicKey: string;
    connected: boolean = false;
    errorCode: string = "";
    errorMessage: string = "";

    constructor(name: string, publicKey: string) {
        this.name = name;
        this.publicKey = publicKey;
    }
   
}