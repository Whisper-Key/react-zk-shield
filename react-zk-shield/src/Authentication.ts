import NetworkWorkerClient from "./Network/NetworkWorkerClient";

export class Authentication {
    
    networkClient: NetworkWorkerClient
    constructor(networkClient: NetworkWorkerClient) {
        this.networkClient = networkClient;
    }
}