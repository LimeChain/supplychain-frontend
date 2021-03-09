import { makeAutoObservable } from 'mobx';
import ProductApi from '../api/ProductApi';

import ProductModel from '../models/product-module/ProductModel';
import S from '../utilities/Main';
import AlertStore from './AlertStore';
import AppStore from './AppStore';

export default class ProductStore {

    productsMap: Map<string, ProductModel> = new Map();

    screenProductModels: ProductModel[] = null;

    productApi: ProductApi;

    constructor(appStore: AppStore, alertStore: AlertStore) {
        this.productApi = new ProductApi(appStore.enableActions, appStore.disableActions, alertStore.show);
        makeAutoObservable(this);
    }

    onScreenData(productModels: ProductModel[]) {
        this.screenProductModels = productModels;
        this.updateProductModels(productModels);
    }

    onListData(productModels: ProductModel[]) {
        this.listProductModels = productModels;
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

    getProduct(productId: string): ProductModel | null {
        return this.productsMap.get(productId) ?? null;
    }

    fetchProductsList(callback: () => void) {
        this.productApi.fetchProductsByFilter(S.NOT_EXISTS, 0, 100000, (productModels: ProductModel[], totalSize: number) => {
            this.onListData(productModels);
            callback();
        });
    }

}
