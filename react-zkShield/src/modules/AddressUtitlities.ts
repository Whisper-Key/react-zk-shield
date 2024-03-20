export class AddressUtitlities {

    static shortenAddress(address: string) {
        const prefix = address.slice(0, 6);
        const suffix = address.slice(-6);

        return `${prefix} ... ${suffix}`;
    }

}