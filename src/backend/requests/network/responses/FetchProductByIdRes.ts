import ProductModel from '../../../modules/ProductModule/Product/Model/ProductModel';
import ProductModelG from '../../../modules/ProductModule/Product/Model/ProductModelG';
import ProductModelH from '../../../modules/ProductModule/Product/Model/ProductModelH';

export default class FetchProductByIdRes {

    productJson: ProductModel;

    constructor(productModel: ProductModel) {
        this.productJson = productModel === null ? null : productModel.toNetwork();
    }

}
