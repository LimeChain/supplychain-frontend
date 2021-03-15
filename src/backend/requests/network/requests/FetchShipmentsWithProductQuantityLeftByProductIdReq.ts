import Payload from '../../../utilities/network/Payload';

            
export default class FetchShipmentsWithProductQuantityLeftByProductIdReq {
    
    productId: string;

    constructor(payload: Payload) {
        const json = payload.params;
        this.productId = json.productId.toString();
    }

}