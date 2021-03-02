import ProductModel from "../models/product-module/ProductModel";

export class CreditProductRes {

    productModel: ProductModel;

    constructor(json) {
        this.productModel = ProductModel.fromJson(json.productJson);
    }
}

export class DeleteProductRes {
    productModel: ProductModel;

    constructor(json) {
        this.productModel = ProductModel.fromJson(json.productJson);
    }
}

export class FetchAllProductsRes {

    productModels: ProductModel[]
    totalSize: number;

    constructor(json) {
        this.productModels = json.productJsons.map((v) => ProductModel.fromJson(v));
        this.totalSize = json.totalSize;
    }
}


export class FetchProductsByFilterRes {
    productModels: ProductModel[]

    constructor(json) {
        this.productModels = json.productJsons.map((v) => ProductModel.fromJson(v));
    }
}


export class FetchProductByIdRes {
    productModel: ProductModel

    constructor(json) {
        this.productModel = ProductModel.fromJson(json.productJson);
    }
}