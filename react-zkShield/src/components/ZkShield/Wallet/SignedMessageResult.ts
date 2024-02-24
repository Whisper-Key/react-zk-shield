export class SignedMessageResult {
    succeded: boolean = false;
    errorCode: string = "";
    errorMessage: string = "";
    friendlyErrorMessage: string = "";
    data: any;
    exception: any;

    constructor(succeded: boolean, errorCode: string, errorMessage: string, friendlyErrorMessage: string, data: any, exception: any) {
        this.succeded = succeded;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.friendlyErrorMessage = friendlyErrorMessage;
        this.data = data;
        this.exception = exception;
    }

}