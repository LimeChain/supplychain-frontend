import AbsApi from './AbsApi';
import {CreditProductReq, FetchProductsByFilterReq} from '../network-requests/ProductApiReq';
import {CreditProductRes, FetchProductsByFilterRes} from '../network-responses/ProductApiRes';
import ProductModel from '../models/product-module/ProductModel';
import storageHelper from '../helpers/StorageHelper';
import S from '../utilities/Main';

export default class ProductApi extends AbsApi {

    creditProduct(productModel: ProductModel, callback: () => void) {
        this.disableActions();
        
        setTimeout(() => {
            this.enableActions();

            const req = new CreditProductReq(productModel);

            let json = {
                product: null
            }

            if (productModel.isNew() === true) {
                let nextId;

                if (storageHelper.productsJson.length > 0) {
                    const lastProductJson = storageHelper.productsJson[storageHelper.productsJson.length - 1];
                    nextId = (parseInt(lastProductJson.productId) + 1).toString();
                } else {
                    nextId = '1';
                }

                json.product = {
                    productId: nextId,
                };
            } else {
                const productJson = storageHelper.productsJson.find((t) => t.productId === productModel.productId);
                json.product = ProductModel.fromJson(productJson);
            }

            
            const res = new CreditProductRes(json);

            productModel.productId = res.productModel.productId;

            const productJson = storageHelper.productsJson.find((t) => t.productId === productModel.productId);
            if (productJson !== undefined) {
                Object.assign(productJson, productModel.toJson());
            } else {
                storageHelper.productsJson.push(productModel.toJson());
            }

            storageHelper.save();

            callback();
        }, 100);
    }

    fetchProductsByFilter(filter: string, pageSize: number, pageNumber: number, callback: (productModels: ProductModel[]) => void) {
        this.disableActions();

        setTimeout(() => {
            this.enableActions();

            const req = new FetchProductsByFilterReq(filter, pageSize, pageNumber);

            const json = {
                productJsons: []
            }
            
            if(filter === S.Strings.EMPTY){
                json.productJsons = storageHelper.productsJson;
            }else{
                storageHelper.productsJson.forEach((productJson: ProductModel) => {
                    let occurance = 0;
    
                    if(productJson.productName.includes(filter)){
                        occurance++;
                    }
    
                    if(productJson.productDescription.includes(filter)){
                        occurance++;
                    }
    
                    if(productJson.productId.includes(filter)){
                        occurance++;
                    }

                    productJson.occurance = occurance;

                    json.productJsons.push(productJson);
                });
            }

            let totalSize = json.productJsons.length;
            let sliceBegin = totalSize - pageNumber * pageSize;
            let sliceEnd = sliceBegin + pageSize;
            
            json.productJsons = json.productJsons.slice(sliceBegin < 0 ? 0 : sliceBegin, sliceEnd);

            const res = new FetchProductsByFilterRes(json);

            callback(res.productModels);
        }, 100);
    }
}