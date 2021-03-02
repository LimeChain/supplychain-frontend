import ProductModel from '../models/product-module/ProductModel';

export class CreditProductReq {

    productJson: any;

    constructor(productModel: ProductModel) {
        this.productJson = productModel.toJson();
    }
}

export class DeleteProductReq {
    productId: string

    constructor(productId: string) {
        this.productId = productId;
    }
}

export class FetchAllProductsReq {

    from: number
    to: number
    sortBy: number
    order: string

    constructor(from: number, to: number, sortBy: number, order: string) {
        this.from = from;
        this.to = to;
        this.sortBy = sortBy;
        this.order = order;
    }

}

export class FetchProductsByFilterReq {
    filter: string
    from: number
    to: number

    constructor(filter: string, from: number, to: number) {
        this.filter = filter;
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