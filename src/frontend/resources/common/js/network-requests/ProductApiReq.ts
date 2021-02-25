import ProductModel from '../models/product-module/ProductModel';

export class CreditProductReq {

    product: any;

    constructor(productModel: ProductModel) {
        this.product = productModel.toJson();
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
