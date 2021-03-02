import AbsApi from './AbsApi';
import { CreditProductReq, DeleteProductReq, fetchProductsByFilterReq, FetchProductByIdReq, FetchProductsByFilterReq } from '../network-requests/ProductApiReq';
import { CreditProductRes, FetchProductByIdRes, fetchProductsByFilterRes, FetchProductsByFilterRes } from '../network-responses/ProductApiRes';
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

    fetchProductsByFilter(sortBy: number, from: number, to: number, callback: (productModels: ProductModel[], totalSize: number) => void) {
        const req = new FetchProductsByFilterReq(from, to, sortBy);

        this.productApi.req(Actions.PRODUCT.FETCH_PRODUCTS_BY_FILTER, req, (json: any) => {
            if (json.status !== ResponseConsts.S_STATUS_OK) {
                this.showAlert('Something went wrong');
                return;
            }

            const res = new FetchProductsByFilterRes(json.obj);

            callback(res.productModels, res.totalSize);
        });

    }

    fetchProductById(productId: string, callback: (productModel: ProductModel) => void) {
        this.disableActions();

        const req = new FetchProductByIdReq(productId);

        this.productApi.req(Actions.PRODUCT.FETCH_PRODUCT_BY_ID, req, (json: any) => {
            if (json.status !== ResponseConsts.S_STATUS_OK) {
                this.showAlert('Something went wrong');
                return;
            }

            const res = new FetchProductByIdRes(json.obj);

            callback(res.productModel);

            this.enableActions();
        });
    }
}
