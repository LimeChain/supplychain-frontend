import ProductModel from "../models/product-module/ProductModel";

export class CreditProductRes {

    productModel: ProductModel;

    constructor(json) {
        this.productModel = ProductModel.fromJson(json.product);
    }

}

export class FetchProductsByFilterRes {
    productModels: ProductModel[]

    constructor(json){
        this.productModels = json.productJsons;
    }
}