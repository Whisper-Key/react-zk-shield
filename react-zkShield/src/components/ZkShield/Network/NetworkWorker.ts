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
import { INetwork, NetworkFactory, supportedNetwork } from './INetwork.js';


let network: INetwork;

const functions = {
    loado1js: async (args: {}) => {
        await isReady;
    },
    setActiveInstance: async (args: { network: supportedNetwork, url: string, archiveUrl: string }) => {
        // console.log('setActiveInstance', args.network);
        // console.log('setActiveInstance local account', args.localAccount);
        // network = NetworkFactory.createNetwork(args.network, args.localAccount);
        // network.setActiveInstance();

        const blockchain = Mina.Network({
            mina: args.url,
            archive: args.archiveUrl,
        });
        Mina.setActiveInstance(blockchain);
    },

    fetchUserAccount: async (args: { publicKey58: string }) => {
        try {
            console.log('fetchUserAccount from worker', args.publicKey58);
            console.log("fetch next line");
            let fetch = await fetchAccount({ publicKey: args.publicKey58 });
            console.log("fetched @ ", new Date().toLocaleTimeString());
            return fetch;

            const account = await network.fetchUserAccount(args.publicKey58);
            console.log('account from worker', account);
            return account;
        } catch (e) {
            console.log('fetchUserAccount error', e);
            console.log("active instance", Mina.activeInstance.getNetworkId());
            console.log("active instance constants", Mina.activeInstance.getNetworkConstants());
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
