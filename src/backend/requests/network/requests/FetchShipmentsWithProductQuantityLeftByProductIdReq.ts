import Payload from '../../../utilities/network/Payload';

export default class FetchShipmentsWithProductQuantityLeftByProductIdReq {

    productId: number;

    constructor(payload: Payload) {
        const json = payload.params;
        this.productId = parseInt(json.productId);
    }

}
