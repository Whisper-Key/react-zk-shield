import { AccountUpdate, Mina, PrivateKey, PublicKey, fetchAccount } from 'o1js';

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

// ---------------------------------------------------------------------------------------

import type { Add } from '../modules/Add';
// import type { Add } from '../../../contracts/src/Add';

const state = {
  Add: null as null | typeof Add,
  zkapp: null as null | Add,
  transaction: null as null | Transaction,
  privateKey: null as null | string,
  useLocal: false
};

// ---------------------------------------------------------------------------------------

const functions = {
  setLocal: async (args: { privateKey: string }) => {
    console.log('worker setLocal', args.privateKey);
    state.privateKey = args.privateKey;
    state.useLocal = true;
  },
  setActiveInstanceToBerkeley: async (args: {}) => {
    const Berkeley = Mina.Network(
      'https://api.minascan.io/node/berkeley/v1/graphql'
    );
    console.log('Berkeley Instance Created');
    Mina.setActiveInstance(Berkeley);
  },
  loadContract: async (args: {}) => {
    const { Add } = await import('../modules/Add.js');
    // const { Add } = await import('../../../contracts/build/src/Add.js');
    state.Add = Add;
  },
  compileContract: async (args: {}) => {
    if (!state.useLocal) { await state.Add!.compile();}
  },
  fetchAccount: async (args: { publicKey58: string }) => {
    if (!state.useLocal) {  const publicKey = PublicKey.fromBase58(args.publicKey58);
    return await fetchAccount({ publicKey });
    }
  },
  initZkappInstance: async (args: { publicKey58: string }) => {
    if (!state.useLocal) {const publicKey = PublicKey.fromBase58(args.publicKey58);
    state.zkapp = new state.Add!(publicKey);
    }else {
      let deployerAccount: PublicKey,
      deployerKey: PrivateKey;
      let zkAppPrivateKey = PrivateKey.random();
      let zkAppAddress = zkAppPrivateKey.toPublicKey();
      
      const local = Mina.LocalBlockchain({ proofsEnabled: false });
      ({ privateKey: deployerKey, publicKey: deployerAccount } =
        local.testAccounts[0]);
      Mina.setActiveInstance(local);
      try {
        state.zkapp = new state.Add!(zkAppAddress);
        console.log('deploying zkapp');
        const txn = await Mina.transaction(deployerAccount, () => {
          AccountUpdate.fundNewAccount(deployerAccount);
          state.zkapp!.deploy();
        });
        await txn.prove();
        // this tx needs .sign(), because `deploy()` adds an account update that requires signature authorization
        await txn.sign([deployerKey, zkAppPrivateKey]).send();
        console.log('zkapp deployed');
      } catch (e) {
        console.log('initZkappInstance error', e);
      }
    }
  },
  getNum: async (args: {}) => {
    const currentNum = await state.zkapp!.num.get();
    return JSON.stringify(currentNum.toJSON());
  },
  createUpdateTransaction: async (args: {}) => {
    const transaction = await Mina.transaction(() => {
      state.zkapp!.update();
    });
    state.transaction = transaction;
  },
  proveUpdateTransaction: async (args: {}) => {
    await state.transaction!.prove();
    state.transaction
  },
  getTransactionJSON: async (args: {}) => {
    return state.transaction!.toJSON();
  }
};

// ---------------------------------------------------------------------------------------

export type WorkerFunctions = keyof typeof functions;

export type ZkappWorkerRequest = {
  id: number;
  fn: WorkerFunctions;
  args: any;
};

export type ZkappWorkerReponse = {
  id: number;
  data: any;
};

if (typeof window !== 'undefined') {
  addEventListener(
    'message',
    async (event: MessageEvent<ZkappWorkerRequest>) => {
      const returnData = await functions[event.data.fn](event.data.args);

      const message: ZkappWorkerReponse = {
        id: event.data.id,
        data: returnData
      };
      postMessage(message);
    }
  );
}

console.log('Web Worker Successfully Initialized.');
