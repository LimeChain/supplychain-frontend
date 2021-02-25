import Payload from '../../../utilities/network/Payload';
import ProductModel from '../../../modules/ProductModule/Product/Model/ProductModel';
import ProductModelG from '../../../modules/ProductModule/Product/Model/ProductModelG';
import ProductModelH from '../../../modules/ProductModule/Product/Model/ProductModelH';
            
export default class CreditProductReq {
    
    product: ProductModel;

    constructor(payload: Payload) {
        const json = payload.params;
        this.product = ProductModel.fromNetwork(json.product);
    }

}