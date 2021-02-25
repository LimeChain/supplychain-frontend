import Payload from '../../../utilities/network/Payload';

            
export default class FetchShipmentsByIdReq {
    
    shipmentId: string;

    constructor(payload: Payload) {
        const json = payload.params;
        this.shipmentId = json.shipmentId.toString();
    }

}