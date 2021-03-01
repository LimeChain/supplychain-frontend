import Payload from '../../../utilities/network/Payload';

            
export default class FetchShipmentsByFilterReq {
    
    filter: string;
    from: number;
    to: number;

    constructor(payload: Payload) {
        const json = payload.params;
        this.filter = json.filter.toString();
        this.from = parseInt(json.from as unknown as string);
        this.to = parseInt(json.to as unknown as string);
    }

}