import SkuModel from '../../../modules/ProductModule/Sku/Model/SkuModel';
import SkuModelG from '../../../modules/ProductModule/Sku/Model/SkuModelG';
import SkuModelH from '../../../modules/ProductModule/Sku/Model/SkuModelH';
import ProductModel from '../../../modules/ProductModule/Product/Model/ProductModel';
import ProductModelG from '../../../modules/ProductModule/Product/Model/ProductModelG';
import ProductModelH from '../../../modules/ProductModule/Product/Model/ProductModelH';            
            
export default class FetchProductsInStockRes {

    skuJsons: SkuModel[];;
    productJsons: ProductModel[];;
    totalSkuSize: number;

    constructor(skuModels: SkuModel[], productModels: ProductModel[], totalSkuSize: number) {
        this.skuJsons = [];
        for (let i = 0; i < skuModels.length; ++i) {
            this.skuJsons.push(skuModels[i].toNetwork());
        }
        this.productJsons = [];
        for (let i = 0; i < productModels.length; ++i) {
            this.productJsons.push(productModels[i].toNetwork());
        }
        this.totalSkuSize = totalSkuSize;
    }

}