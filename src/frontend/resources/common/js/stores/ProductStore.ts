import { makeAutoObservable } from 'mobx';

import ProductModel from '../models/product-module/ProductModel';

export default class ProductStore {

    productsMap: Map < string, ProductModel > = new Map();

    screenProductModels: ProductModel[];

    constructor() {
        makeAutoObservable(this);
    }

    onScreenData(productModels: ProductModel[]) {
        this.screenProductModels = productModels;
        this.updateProductModels(productModels);
    }

    updateProductModels(productModels: ProductModel[]) {
        const cacheMap = this.productsMap;
        this.productsMap = null;

        productModels.forEach((productModel) => {
            cacheMap.set(productModel.productId, productModel);
        });

        this.productsMap = cacheMap;
    }
}
