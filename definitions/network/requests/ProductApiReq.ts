export class CreditProductReq {

    productJson: ProductModel;
}

export class FetchProductsByFilterReq {

    searchBy: string
    sortBy: number
    from: number
    to: number

}
