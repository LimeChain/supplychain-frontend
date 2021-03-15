import ProductModel from '../models/product-module/ProductModel';

export class CreditProductRes {

    productModel: ProductModel;
}

export class FetchProductsByFilterRes {

    productModels: Array < ProductModel >
    totalSize: number;

}

export class FetchProductByIdRes {
    productModel: ProductModel
}
