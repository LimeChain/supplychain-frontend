import AbsApi from './AbsApi';
import { CreditProductReq, DeleteProductReq, FetchProductByIdReq, FetchProductsByFilterReq } from '../network-requests/ProductApiReq';
import { CreditProductRes, FetchProductByIdRes, FetchProductsByFilterRes } from '../network-responses/ProductApiRes';
import ProductModel from '../models/product-module/ProductModel';
import storageHelper from '../helpers/StorageHelper';
import S from '../utilities/Main';
import Api from '../utilities/Api';
import Apis from '../../../../../../builds/dev-generated/Apis';
import Actions from '../../../../../../builds/dev-generated/Actions';
import ResponseConsts from '../../../../../../builds/dev-generated/utilities/network/ResponseConsts';


export default class ProductApi extends AbsApi {

    productApi: Api

    constructor(enableActions: null | (() => void) = null, disableActions: null | (() => void) = null, showAlert: null | ((msg: string, positiveListener?: null | (() => boolean | void), negativeListener?: null | (() => boolean | void)) => void) = null) {
        super(enableActions, disableActions, showAlert);
        this.productApi = new Api(Apis.PRODUCT, this.enableActions, this.disableActions);
    }

    creditProduct(productModel: ProductModel, callback: () => void) {
        this.disableActions();

        const req = new CreditProductReq(productModel);

        this.productApi.req(Actions.PRODUCT.CREDIT_PRODUCT, req, (json: any) => {
            if (json.status !== ResponseConsts.S_STATUS_OK) {
                this.showAlert('Something went wrong');
                return;
            }

            const res = new CreditProductRes(json.obj);
            productModel.productId = res.productModel.productId;
            callback();

            this.enableActions();
        });
    }

    deleteProduct(productId: string, callback: (productModel: ProductModel) => void) {
        this.disableActions();

        setTimeout(() => {
            this.enableActions();

            const req = new DeleteProductReq(productId);

            const json = {
                productJson: ProductModel,
            }

            if (productId === S.Strings.EMPTY) {
                return;
            }

            json.productJson = storageHelper.productJsons.get(productId);
            json.productJson.productDeleted = S.INT_TRUE;

            const res = new FetchProductByIdRes(json);

            callback(res.productModel);
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

            if (filter === S.Strings.EMPTY) {
                json.productJsons = storageHelper.productsJson;
            } else {
                storageHelper.productsJson.forEach((productJson: ProductModel) => {
                    let occurance = 0;

                    if (productJson.productName.includes(filter)) {
                        occurance++;
                    }

                    if (productJson.productDescription.includes(filter)) {
                        occurance++;
                    }

                    if (productJson.productId.includes(filter)) {
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

    fetchProductById(productId: string, callback: (productModel: ProductModel) => void) {
        this.disableActions();

        setTimeout(() => {
            this.enableActions();

            const req = new FetchProductByIdReq(productId);

            const json = {
                productJson: ProductModel,
            }

            if (productId === S.Strings.EMPTY) {
                return;
            }

            json.productJson = storageHelper.productJsons.get(productId);

            const res = new FetchProductByIdRes(json);

            callback(res.productModel);
        }, 100);
    }
}