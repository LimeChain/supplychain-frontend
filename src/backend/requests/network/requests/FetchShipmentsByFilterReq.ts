import Payload from '../../../utilities/network/Payload';

export default class FetchShipmentsByFilterReq {

    page: number;
    searchBy: string;
    sortBy: number;
    from: number;
    to: number;

    constructor(payload: Payload) {
        const json = payload.params;
        this.page = parseInt(json.page as unknown as string);
        this.searchBy = json.searchBy.toString();
        this.sortBy = parseInt(json.sortBy as unknown as string);
        this.from = parseInt(json.from as unknown as string);
        this.to = parseInt(json.to as unknown as string);
    }

}
