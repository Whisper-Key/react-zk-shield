import { Circuit, CircuitString, PrivateKey } from "o1js";
import { LocalInjectedWallet } from "../components/ZkShield/Wallet/WalletProviders/LocalInjectedWallet.js";

describe('LocalInjectedWallet', () => {

    it('can set environment', async () => {
        const environment = { version: "1.0" };
        const privateKey = PrivateKey.random().toBase58();
        const provider = new LocalInjectedWallet(environment, privateKey, true);
        expect(provider.environment.version).toEqual("1.0");
    });

    it('can check if wallet exists', async () => {
        const environment = { version: "1.0" };
        const walletAvailable = false;
        const privateKey = PrivateKey.random().toBase58();
        const provider = new LocalInjectedWallet(environment, privateKey, walletAvailable);
        expect(provider.hasWallet()).toEqual(false);
    });

    it('can connect', async () => {

        const environment = { location: { origin: "http://localhost" } };
        const walletAvailable = true;
        const privateKey = PrivateKey.random().toBase58();
        const provider = new LocalInjectedWallet(environment, privateKey, walletAvailable);
        const result = await provider.connect();
        expect(result.connected).toEqual(true);
        expect(provider.connectedZkApps.length).toEqual(1);
        expect(provider.connectedZkApps[0]).toEqual("http://localhost");
    });

    it('can disconnect', async () => {
        const environment = { location: { origin: "http://localhost" } };
        const walletAvailable = true;
        const privateKey = PrivateKey.random().toBase58();
        const provider = new LocalInjectedWallet(environment, privateKey, walletAvailable);
        await provider.connect();
        const result = await provider.disconnect();
        expect(result.connected).toEqual(true);
        expect(provider.connectedZkApps.length).toEqual(0);
    });

    it('can send zk transaction', async () => {
        const environment = { location: { origin: "http://localhost" } };
        const walletAvailable = true;
        const privateKey = PrivateKey.random().toBase58();
        const provider = new LocalInjectedWallet(environment, privateKey, walletAvailable);
        const result = await provider.connect();

        const transaction = {
            prove: () => { return Promise.resolve(); },
            sign: () => {
                return {
                    send: () => { return Promise.resolve({ hash: "hash" }); }
                }
            }
        };

        const fee = 1;
        const memo = "memo";
        const transactionResult = await provider.sendZkTransaction(transaction, fee, memo);

        expect(transactionResult.succeded).toEqual(true);
        expect(transactionResult.transactionHash).toEqual("hash");
    });

    it('cannot send zk transaction if not connected', async () => {
        const environment = { location: { origin: "http://localhost" } };
        const walletAvailable = true;
        const privateKey = PrivateKey.random().toBase58();
        const provider = new LocalInjectedWallet(environment, privateKey, walletAvailable);

        // do not connect
        // const result = await provider.connect();

        const transaction = { prove: () => { return Promise.resolve(); }, sign: () => { return { send: () => { return Promise.resolve({ hash: "hash" }); } } } };
        const fee = 1;
        const memo = "memo";
        const transactionResult = await provider.sendZkTransaction(transaction, fee, memo);
        expect(transactionResult.succeded).toEqual(false);
        expect(transactionResult.errorCode).toEqual("Not connected");
    });

    it('can sign message', async () => {
        const environment = { version: "1.0" };
        const walletAvailable = true;
        const privateKey = PrivateKey.random();
        const provider = new LocalInjectedWallet(environment, privateKey.toBase58(), walletAvailable);
        const result = await provider.signMessage("message");
        expect(result.succeded).toEqual(true);

        const validSignature = result.data.verify(privateKey.toPublicKey(), CircuitString.fromString("message").toFields());
        expect(validSignature.toBoolean()).toEqual(true);
    });

    it('can validate signature', async () => {
        const environment = { version: "1.0" };
        const walletAvailable = true;
        const privateKey = PrivateKey.random();
        const provider = new LocalInjectedWallet(environment, privateKey.toBase58(), walletAvailable);
        const result = await provider.signMessage("message");
        expect(result.succeded).toEqual(true);

        const validSignature = result.data.verify(privateKey.toPublicKey(), 
            CircuitString.fromString("not message").toFields());
        expect(validSignature.toBoolean()).toEqual(false);
    });

});