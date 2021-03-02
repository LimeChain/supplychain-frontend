export class CreditProductRes {

    productModel: ProductModel;

    constructor(json) {
        this.productModel = ProductModel.fromJson(json.productJson);
    }
}

export class FetchProductsByFilterRes {

    productModels: Array<ProductModel>
    totalSize: number;

    constructor(json) {
        this.productModels = json.productJsons.map((v) => ProductModel.fromJson(v));
        this.totalSize = json.totalSize;
    }
}

export class FetchProductByIdRes {
    productModel: ProductModel

    constructor(json) {
        this.productModel = ProductModel.fromJson(json.productJson);
    }
}
