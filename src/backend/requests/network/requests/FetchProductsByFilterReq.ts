import Payload from '../../../utilities/network/Payload';

export default class FetchProductsByFilterReq {

    sortBy: number;
    from: number;
    to: number;

    constructor(payload: Payload) {
        const json = payload.params;
        this.sortBy = parseInt(json.sortBy as unknown as string);
        this.from = parseInt(json.from as unknown as string);
        this.to = parseInt(json.to as unknown as string);
    }

}
