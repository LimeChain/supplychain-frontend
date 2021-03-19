import SV from '../../utilities/SV';

export default class IntegrationNodeTransferModel {

    static TYPE_PRODUCT: number = 1;
    static TYPE_SHIPMENT: number = 2;

    type: number;
    obj: any;

    constructor() {
        this.type = SV.NOT_EXISTS;
        this.obj = null;
    }

    static newInstanceShipment() {
        const model = new IntegrationNodeTransferModel();
        model.type = IntegrationNodeTransferModel.TYPE_SHIPMENT;
        return model;
    }

    static newInstanceProduct() {
        const model = new IntegrationNodeTransferModel();
        model.type = IntegrationNodeTransferModel.TYPE_PRODUCT;
        return model;
    }

    toNetwork() {
        return {
            'type': this.type,
            'obj': this.obj,
        }
    }

    static fromNetwork(json: any): IntegrationNodeTransferModel {
        if (json === null) {
            return null;
        }

        const model = new IntegrationNodeTransferModel();

        model.type = parseInt(json.type ?? model.type);
        model.obj = json.obj ?? model.obj;

        return model;
    }

}
