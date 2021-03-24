import Payload from '../../../utilities/network/Payload';

export default class INDltShipmentReq {

    shipmentId: number;
    shipmentStatus: number;
    dlt: string;

    constructor(payload: Payload) {
        const json = payload.params;
        this.shipmentId = parseInt(json.shipmentId);
        this.shipmentStatus = parseInt(json.shipmentStatus);
        this.dlt = json.dlt;
    }

}
