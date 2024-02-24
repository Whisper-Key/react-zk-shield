export class WalletTransactionResult {
    succeded: boolean = false;
    transactionHash: string = "";
    errorCode: string = "";
    errorMessage: string = "";
    friendlyErrorMessage: string = "";
    data: any;

    constructor(succeded: boolean, transactionHash: string, errorCode: string, errorMessage: string, friendlyErrorMessage: string, data: any) {
        this.succeded = succeded;
        this.transactionHash = transactionHash;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.friendlyErrorMessage = friendlyErrorMessage;
        this.data = data;
    }

}