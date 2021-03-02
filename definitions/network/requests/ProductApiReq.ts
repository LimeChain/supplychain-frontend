export class CreditProductReq {

    productJson: ProductModel;

    constructor(productModel: ProductModel) {
        this.productJson = productModel.toJson();
    }
}

export class FetchProductsByFilterReq {

    sortBy: number
    from: number
    to: number

    constructor(from: number, to: number, sortBy: number) {
        this.sortBy = sortBy;
        this.from = from;
        this.to = to;
    }

}

export class FetchProductByIdReq {
    productId: number

    constructor(productId: number) {
        this.productId = productId;
    }
}
