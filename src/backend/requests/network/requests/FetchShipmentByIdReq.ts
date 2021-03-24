import Payload from '../../../utilities/network/Payload';

export default class FetchShipmentByIdReq {

    shipmentId: number;

    constructor(payload: Payload) {
        const json = payload.params;
        this.shipmentId = parseInt(json.shipmentId as unknown as string);
    }

}
