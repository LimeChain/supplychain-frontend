export class CreditProductReq {

    productJson: ProductModel;

    constructor(productModel: ProductModel) {
        this.productJson = productModel.toJson();
    }
}

export class DeleteProductReq {
    productId: number

    constructor(productId: number) {
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