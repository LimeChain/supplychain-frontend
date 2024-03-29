import AbsApi from './AbsApi';
import { CreditProductReq, FetchProductByIdReq, FetchProductsByFilterReq } from '../network-requests/ProductApiReq';
import { CreditProductRes, FetchProductByIdRes, FetchProductsByFilterRes } from '../network-responses/ProductApiRes';
import ProductModel from '../models/product-module/ProductModel';
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
        const req = new CreditProductReq(productModel);

        this.productApi.req(Actions.PRODUCT.CREDIT_PRODUCT, req, (json: any) => {
            if (json.status !== ResponseConsts.S_STATUS_OK) {
                switch (json.status) {
                    case ResponseConsts.S_INTEGRATION_NODE_ERROR:
                        this.showAlert('There was a problem with the integration node');
                        break;
                    default:
                        this.showAlert('Something went wrong');
                        break;
                }
                return;
            }

            const res = new CreditProductRes(json.obj);
            productModel.productId = res.productModel.productId;
            callback();
        });
        // this.disableActions();

        // setTimeout(() => {
        //     this.enableActions();

        //     const req = new CreditProductReq(productModel);

        //     const json = {
        //         productJson: null,
        //     }

        //     if (productModel.isNew() === true) {
        //         let nextId;

        //         if (storageHelper.productsJson.length > 0) {
        //             const lastProductJson = storageHelper.productsJson[storageHelper.productsJson.length - 1];
        //             nextId = (parseInt(lastProductJson.productId) + 1).toString();
        //         } else {
        //             nextId = '1';
        //         }

        //         json.productJson = {
        //             productId: nextId,
        //         };
        //     } else {
        //         const productJson = storageHelper.productsJson.find((t) => t.productId === productModel.productId);
        //         json.productJson = ProductModel.fromJson(productJson);
        //     }

        //     const res = new CreditProductRes(json);

        //     productModel.productId = res.productModel.productId;

        //     const productJson = storageHelper.productsJson.find((t) => t.productId === productModel.productId);
        //     if (productJson !== undefined) {
        //         Object.assign(productJson, productModel.toJson());
        //     } else {
        //         storageHelper.productsJson.push(productModel.toJson());
        //     }

        //     storageHelper.save();

        //     callback();
        // }, 100);
    }

    fetchProductsByFilter(searchBy: string, sortBy: number, from: number, to: number, callback: (productModels: ProductModel[], totalSize: number) => void) {
        const req = new FetchProductsByFilterReq(searchBy, sortBy, from, to);

        this.productApi.req(Actions.PRODUCT.FETCH_PRODUCTS_BY_FILTER, req, (json: any) => {
            if (json.status !== ResponseConsts.S_STATUS_OK) {
                this.showAlert('Something went wrong');
                return;
            }

            const res = new FetchProductsByFilterRes(json.obj);

            callback(res.productModels, res.totalSize);
        });

        // this.disableActions();

        // setTimeout(() => {
        //     this.enableActions();

        //     const req = new FetchProductsByFilterReq(searchBy, sortBy, from, to);

        //     const json = {
        //         productJsons: [],
        //         totalSize: 0,
        //     }

        //     const productsJson = storageHelper.productsJson.filter((productJson) => productJson.productDeleted === S.INT_FALSE);

        //     json.productJsons = productsJson.filter((productJson: ProductModel) => {
        //         if (searchBy === S.Strings.EMPTY) {
        //             return true;
        //         }

        //         if (productJson.productName.toLowerCase().includes(searchBy.toLowerCase())) {
        //             return true;
        //         }

        //         if (productJson.productDescription.toLowerCase().includes(searchBy.toLowerCase())) {
        //             return true;
        //         }

        //         if (productJson.productId.toLowerCase().includes(searchBy.toLowerCase())) {
        //             return true;
        //         }

        //         return false;
        //     })

        //     json.totalSize = json.productJsons.length;

        //     json.productJsons = json.productJsons.sort((a: ProductModel, b: ProductModel): number => {
        //         const sign = sortBy / Math.abs(sortBy);

        //         switch (Math.abs(sortBy)) {
        //             case ProductFilter.S_SORT_BY_NAME:
        //                 return a.productName.localeCompare(b.productName) * sign;
        //             case ProductFilter.S_SORT_BY_DESCRIPTION:
        //                 return a.productDescription.localeCompare(b.productDescription) * sign;
        //             default:
        //                 return parseInt(b.productId) - parseInt(a.productId);
        //         }

        //     }).slice(from, to);

        //     const res = new FetchProductsByFilterRes(json);

        //     callback(res.productModels, res.totalSize);
        // }, 100);

    }

    fetchProductById(productId: string, callback: (productModel: ProductModel) => void) {
        const req = new FetchProductByIdReq(productId);

        this.productApi.req(Actions.PRODUCT.FETCH_PRODUCT_BY_ID, req, (json: any) => {
            if (json.status !== ResponseConsts.S_STATUS_OK) {
                return;
            }

            const res = new FetchProductByIdRes(json.obj);
            callback(res.productModel);
        });
    }
}
