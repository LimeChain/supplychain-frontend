import ProductModel from '../models/product-module/ProductModel';

export class CreditProductReq {

    productJson: any;

    constructor(productModel: ProductModel) {
        this.productJson = productModel.toJson();
    }
}

export class FetchProductsByFilterReq {

    searchBy: string
    sortBy: number
    from: number
    to: number

    constructor(searchBy: string, sortBy: number, from: number, to: number) {
        this.searchBy = searchBy;
        this.sortBy = sortBy;
        this.from = from;
        this.to = to;
    }

}

// export class FetchProductByIdReq {
//     productId: string

//     constructor(productId: string) {
//         this.productId = productId;
//     }
// }
