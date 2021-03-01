export class CreditProductReq {

    productJson: ProductModel;

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

export class FetchProductsByFilterReq {
    filter: string
    pageSize: number
    pageNumber: number

    constructor(filter: string, pageSize: number, pageNumber: number) {
        this.filter = filter;
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;
    }
}

export class FetchProductByIdReq {
    productId: string

    constructor(productId: string) {
        this.productId = productId;
    }
}