import Payload from '../../../utilities/network/Payload';

            
export default class FetchShipmentsByFilterReq {
    
    filter: string;
    pageSize: number;
    pageNumber: number;

    constructor(payload: Payload) {
        const json = payload.params;
        this.filter = json.filter.toString();
        this.pageSize = parseInt(json.pageSize as unknown as string);
        this.pageNumber = parseInt(json.pageNumber as unknown as string);
    }

}