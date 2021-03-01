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

export class FetchProductsByFilterRes {
    productModels: Array<ProductModel>

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