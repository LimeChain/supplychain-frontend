import { makeAutoObservable } from 'mobx';
import ProductApi from '../api/ProductApi';

import ProductModel from '../models/product-module/ProductModel';
import SkuModel from '../models/product-module/SkuModel';
import S from '../utilities/Main';

export default class SkuStore {

    skusMap: Map<string, SkuModel> = new Map();

    screenSkuModels: SkuModel[] = null;
    listSkuModels: SkuModel[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    onScreenData(skuModels: SkuModel[]) {
        this.screenSkuModels = skuModels;
        this.updateSkuModels(skuModels);
    }

    onListData(skuModels: SkuModel[]) {
        this.listSkuModels = skuModels;

        this.updateSkuModels(skuModels);
    }

    updateSkuModels(skuModels: SkuModel[]) {
        const cacheMap = this.skusMap;
        this.skusMap = null;

        skuModels.forEach((skuModel) => {
            cacheMap.set(skuModel.productId, skuModel);
        });

        this.skusMap = cacheMap;
    }

    getTotalPrice(): number {
        let totalPrice = 0;

        this.screenSkuModels.forEach((skuModel: SkuModel) => totalPrice += (skuModel.quantity * skuModel.pricePerUnit))

        return totalPrice;
    }
}
