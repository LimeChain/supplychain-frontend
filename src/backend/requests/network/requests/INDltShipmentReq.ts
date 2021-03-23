import Payload from '../../../utilities/network/Payload';

export default class INDltShipmentReq {

    shipmentId: number;
    dlt: string;

    constructor(payload: Payload) {
        const json = payload.params;
        this.shipmentId = parseInt(json.shipmentId);
        this.dlt = json.dlt;
    }

}
