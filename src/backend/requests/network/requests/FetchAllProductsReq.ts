import Payload from '../../../utilities/network/Payload';


export default class FetchAllProductsReq {

    from: number;
    to: number;
    sortBy: number;

    constructor(payload: Payload) {
        const json = payload.params;
        this.from = parseInt(json.from as unknown as string);
        this.to = parseInt(json.to as unknown as string);
        this.sortBy = parseInt(json.sortBy as unknown as string);
    }

}