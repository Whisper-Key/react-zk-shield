import {
    Mina,
    isReady,
    PublicKey,
    PrivateKey,
    Field,
    fetchAccount,
    MerkleMapWitness,
    CircuitString,
    Bool,
    AccountUpdate,
} from 'o1js'
import { NewLineKind } from 'typescript';
import { NetworkFactory } from './INetwork.js';


const network = NetworkFactory.createNetwork();
const functions = {
    loado1js: async (args: {}) => {
        await isReady;
    },
    setActiveInstance: async (args: {}) => {
        network.setActiveInstance();
    },

    fetchUserAccount: async (args: { publicKey58: string }) => {
        console.log('fetchUserAccount from worker', args.publicKey58);
        try {
        const account = await network.fetchUserAccount(args.publicKey58);
        console.log('account from worker', account);
        return account;
    } catch (e) {
            
            console.log('fetchUserAccount error', e);
        }
    },
};

// ---------------------------------------------------------------------------------------

export type NetworkWorkerFunctions = keyof typeof functions;

export type NetworkWorkerRequest = {
    id: number,
    fn: NetworkWorkerFunctions,
    args: any
}

export type NetworkWorkerReponse = {
    id: number,
    data: any
}
if ((process as any).browser) {
    addEventListener('message', async (event: MessageEvent<NetworkWorkerRequest>) => {
        const returnData = await functions[event.data.fn](event.data.args);

        const message: NetworkWorkerReponse = {
            id: event.data.id,
            data: returnData,
        }
        postMessage(message)
    });
}
