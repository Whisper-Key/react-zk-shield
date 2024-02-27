export class ChainSelectedResult {
    selected: boolean = false;
    chainID: string = "";
    errorCode: string = "";
    errorMessage: string = "";
    friendlyErrorMessage: string = "";
    data: any = null;

    constructor(selected: boolean, chainID: string, errorCode: string, errorMessage: string, friendlyErrorMessage: string, data: any) {
        this.selected = selected;
        this.chainID = chainID;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.friendlyErrorMessage = friendlyErrorMessage;
        this.data = data;
    }

}