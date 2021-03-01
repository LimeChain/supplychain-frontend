import Payload from '../../../utilities/network/Payload';

            
export default class FetchShipmentByIdReq {
    
    shipmentId: string;

    constructor(payload: Payload) {
        const json = payload.params;
        this.shipmentId = json.shipmentId.toString();
    }

}