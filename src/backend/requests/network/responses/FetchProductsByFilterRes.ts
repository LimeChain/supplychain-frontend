import ProductModel from '../../../modules/ProductModule/Product/Model/ProductModel';
import ProductModelG from '../../../modules/ProductModule/Product/Model/ProductModelG';
import ProductModelH from '../../../modules/ProductModule/Product/Model/ProductModelH';            
            
export default class FetchProductsByFilterRes {

    productJsons: ProductModel[];;

    constructor(productModels: ProductModel[]) {
        this.productJsons = [];
        for (let i = 0; i < productModels.length; ++i) {
            this.productJsons.push(productModels[i].toNetwork());
        }
    }

}