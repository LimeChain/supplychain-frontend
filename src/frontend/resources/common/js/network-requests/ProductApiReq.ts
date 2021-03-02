import ProductModel from '../models/product-module/ProductModel';

export class CreditProductReq {

    productJson: any;

    constructor(productModel: ProductModel) {
        this.productJson = productModel.toJson();
    }
}

export class FetchProductsByFilterReq {

    sortBy: number
    from: number
    to: number

    constructor(sortBy: number, from: number, to: number) {
        this.sortBy = sortBy;
        this.from = from;
        this.to = to;
    }

}

export class FetchProductByIdReq {
    productId: string

    constructor(productId: string) {
        this.productId = productId;
    }
}
