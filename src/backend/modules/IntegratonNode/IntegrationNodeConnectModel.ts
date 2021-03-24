export default class IntegrationNodeConnectModel {

    static TYPE_PRODUCT: number = 1;
    static TYPE_SHIPMENT: number = 2;

    peerAddresses: string[];

    constructor() {
        this.peerAddresses = [];
    }

    static newInstanceByPeerAddress(address: string) {
        const model = new IntegrationNodeConnectModel();
        model.peerAddresses.push(address);
        return model;
    }

    toNetwork() {
        return {
            'peerAddresses': this.peerAddresses,
        }
    }

    static fromNetwork(json: any): IntegrationNodeConnectModel {
        if (json === null) {
            return null;
        }

        const model = new IntegrationNodeConnectModel();

        model.peerAddresses = json.peerAddresses ?? model.peerAddresses;

        return model;
    }

}
