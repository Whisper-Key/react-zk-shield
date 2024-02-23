import { AuroWalletProvider } from "../components/ZkShield/Wallet/WalletProviders/AuroWalletProvider";

describe('AuroWalletProvider', () => {

    it('can set name', async () => {
        const name = "AuroWallet";
        const mina = {};
        const provider = new AuroWalletProvider(name, mina);
        expect(provider.name).toEqual(name);
    });

    it('can set mina', async () => {
        const name = "AuroWallet";
        const mina = { version: "1.0" };
        const provider = new AuroWalletProvider(name, mina);
        expect(provider.mina.version).toEqual("1.0");
    });

    it('can check if wallet exists', async () => {
        const name = "AuroWallet";
        const mina = {};
        const provider = new AuroWalletProvider(name, mina);
        expect(provider.hasWallet()).toEqual(true);
    });

    it('can connect', async () => {
        const name = "AuroWallet";
        const mina = { requestAccounts: () => { return ["account1"] } };
        const provider = new AuroWalletProvider(name, mina);
        const result = await provider.connect();
        expect(result.connected).toEqual(true);
        expect(result.connectedAccount).toEqual("account1");
    });

    it('can get user rejected error', async () => {
        const name = "AuroWallet";
        const mina = { requestAccounts: () => { throw { code: "1002", message: "User rejected the request." } } };
        const provider = new AuroWalletProvider(name, mina);
        const result = await provider.connect();
        expect(result.errorCode).toEqual("1002");
        expect(result.errorMessage).toEqual("User rejected the request.");
        expect(result.friendlyErrorMessage).toEqual("You cancelled connection with Mina wallet!");
    });

    it('can get create or restore wallet error', async () => {
        const name = "AuroWallet";
        const mina = { requestAccounts: () => { throw { code: "1003?", message: "Create or restore wallet." } } };
        const provider = new AuroWalletProvider(name, mina);
        const result = await provider.connect();
        expect(result.errorCode).toEqual("1003?");
        expect(result.errorMessage).toEqual("Create or restore wallet.");
        expect(result.friendlyErrorMessage).toEqual("Please create or restore a wallet first!");
    });

    it('can get unknown error', async () => {
        const name = "AuroWallet";
        const mina = { requestAccounts: () => { throw { code: "1004", message: "Unknown error" } } };
        const provider = new AuroWalletProvider(name, mina);
        const result = await provider.connect();
        expect(result.errorCode).toEqual("1004");
        expect(result.errorMessage).toEqual("Unknown error");
        expect(result.friendlyErrorMessage).toEqual("Unknown error");
    });
});