import { LocalInjectedWallet } from "../components/ZkShield/Wallet/WalletProviders/LocalInjectedWallet.js";

describe('LocalInjectedWallet', () => {

    it('can set environment', async () => {
        const environment = { version: "1.0" };
        const provider = new LocalInjectedWallet(environment, true);
        expect(provider.environment.version).toEqual("1.0");
    });

    it('can check if wallet exists', async () => {
        const environment = { version: "1.0" };
        const walletAvailable = false;
        const provider = new LocalInjectedWallet(environment, walletAvailable);
        expect(provider.hasWallet()).toEqual(false);
    });

    it('can connect', async () => {
        
        const environment = { location: { origin: "http://localhost" } };
        const walletAvailable = true;
        const provider = new LocalInjectedWallet(environment, walletAvailable);
        const result = await provider.connect();
        expect(result.connected).toEqual(true);
        expect(provider.connectedZkApps.length).toEqual(1);
        expect(provider.connectedZkApps[0]).toEqual("http://localhost");
    });

    it('can disconnect', async () => {
        const environment = { location: { origin: "http://localhost" } };
        const walletAvailable = true;
        const provider = new LocalInjectedWallet(environment, walletAvailable);
        await provider.connect();
        const result = await provider.disconnect();
        expect(result.connected).toEqual(true);
        expect(provider.connectedZkApps.length).toEqual(0);
    })


});