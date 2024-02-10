import { NetworkWorkerFunctions, NetworkWorkerReponse, NetworkWorkerRequest } from "./NetworkWorker";

export default class NetworkWorkerClient {

    worker: Worker;

    promises: { [id: number]: { resolve: (res: any) => void, reject: (err: any) => void } };
  
    nextId: number;
  
    constructor() {
      this.worker = new Worker(new URL('./NetworkWorker.ts', import.meta.url))
      this.promises = {};
      this.nextId = 0;
  
      this.worker.onmessage = (event: MessageEvent<NetworkWorkerReponse>) => {
        this.promises[event.data.id].resolve(event.data.data);
        delete this.promises[event.data.id];
      };
    }

    loado1js() {
      return this._call('loado1js', {});
    }

    setupActiveInstance() {
      return this._call('setActiveInstance', {});
    }

    fetchUserAccount(publicKey58: string) {
      return this._call('fetchUserAccount', { publicKey58 });
    }
  
    _call(fn: NetworkWorkerFunctions, args: any) {
      return new Promise((resolve, reject) => {
        this.promises[this.nextId] = { resolve, reject }
  
        const message: NetworkWorkerRequest = {
          id: this.nextId,
          fn,
          args,
        };
  
        this.worker.postMessage(message);
  
        this.nextId++;
      });
    }
}