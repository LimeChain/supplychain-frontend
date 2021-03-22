import Payload from '../../../utilities/network/Payload';
import ProductModel from '../../../modules/ProductModule/Product/Model/ProductModel';
import ProductModelG from '../../../modules/ProductModule/Product/Model/ProductModelG';
import ProductModelH from '../../../modules/ProductModule/Product/Model/ProductModelH';

export default class INCreditProductReq {

    type: number;
    productModel: ProductModel;

    constructor(payload: Payload) {
        const json = payload.params;
        this.type = parseInt(json.type);
        this.productModel = ProductModel.fromNetwork(json.obj.productModel);
    }

}
