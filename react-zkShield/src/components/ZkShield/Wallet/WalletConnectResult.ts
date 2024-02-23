export class WalletConnectResult {
    connected: boolean = false;
    connectedAccount: string = "";
    errorCode: string = "";
    errorMessage: string = "";
     friendlyErrorMessage: string = "";

    constructor(connected: boolean, connectedAccount: string, errorCode: string, errorMessage: string, friendlyErrorMessage: string) {
        this.connected = connected;
        this.connectedAccount = connectedAccount;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.friendlyErrorMessage = friendlyErrorMessage;
    }
   
}