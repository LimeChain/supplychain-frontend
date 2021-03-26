import AbsApi from './AbsApi';
import { CreditShipmentReq, FetchShipmentsWithProductQuantityLeftByProductIdReq, FetchTotalValueInStockReq, FetchProductsInStockReq, FetchShipmentsByFilterReq, FetchShipmentByIdReq } from '../network-requests/ShipmentApiReq';
import { CreditShipmentRes, FetchShipmentsWithProductQuantityLeftByProductIdRes, FetchTotalValueInStockRes, FetchProductsInStockRes, FetchShipmentsByFilterRes, FetchShipmentsByIdRes } from '../network-responses/ShipmentApiRes';
import ShipmentModel from '../models/shipment-module/ShipmentModel';
import SkuOriginModel from '../models/product-module/SkuOriginModel';
import SkuModel from '../models/product-module/SkuModel';
import Apis from '../../../../../../builds/dev-generated/Apis';
import Api from '../utilities/Api';
import Actions from '../../../../../../builds/dev-generated/Actions';
import ResponseConsts from '../../../../../../builds/dev-generated/utilities/network/ResponseConsts';
import ShipmentDocumentModel from '../models/shipment-module/ShipmentDocumentModel';
import ProductModel from '../models/product-module/ProductModel';

export default class ShipmentApi extends AbsApi {

    shipmentApi: Api;

    constructor(enableActions: null | (() => void) = null, disableActions: null | (() => void) = null, showAlert: null | ((msg: string, positiveListener?: null | (() => boolean | void), negativeListener?: null | (() => boolean | void)) => void) = null) {
        super(enableActions, disableActions, showAlert);
        this.shipmentApi = new Api(Apis.SHIPMENT, this.enableActions, this.disableActions);
    }

    creditShipment(shipmentModel: ShipmentModel, skuModels: SkuModel[], skuOriginModels: SkuOriginModel[], shipmentDocumentModels: ShipmentDocumentModel[], callback: () => void) {
        const req = new CreditShipmentReq(shipmentModel, skuOriginModels, skuModels, shipmentDocumentModels);

        this.shipmentApi.req(Actions.SHIPMENT.CREDIT, req, (json: any) => {
            if (json.status !== ResponseConsts.S_STATUS_OK) {
                switch (json.status) {
                    case ResponseConsts.S_INTEGRATION_NODE_ERROR:
                        this.showAlert('There was a problem with the integration node');
                        break;
                    case ResponseConsts.S_STATUS_SUBMIT_WITHOUT_SKU:
                        this.showAlert('You must add at least one product');
                        break;
                    default:
                        this.showAlert('Something went wrong');
                        break;
                }
                return;
            }

            const res = new CreditShipmentRes(json.obj);
            shipmentModel.shipmentId = res.shipmentModel.shipmentId;
            shipmentModel.shipmentDateOfShipment = res.shipmentModel.shipmentDateOfShipment;
            shipmentModel.shipmentDateOfArrival = res.shipmentModel.shipmentDateOfArrival;

            skuModels.forEach((skuModel, i) => {
                Object.assign(skuModel, res.skuModels[i]);
            });
            skuOriginModels.forEach((skuOriginModel, i) => {
                Object.assign(skuOriginModel, res.skuOriginModels[i]);
            });

            callback();
        });
    }

    fetchShipmentByFilter(page: number, searchBy: string, sortBy: number, from: number, to: number, callback: (shipmentModels: ShipmentModel[], totalSize) => void) {
        const req = new FetchShipmentsByFilterReq(page, searchBy, sortBy, from, to);

        this.shipmentApi.req(Actions.SHIPMENT.FETCH_SHIPMENTS_BY_FILTER, req, (json: any) => {
            if (json.status !== ResponseConsts.S_STATUS_OK) {
                this.showAlert('Something went wrong');
                return;
            }

            const res = new FetchShipmentsByFilterRes(json.obj);
            callback(res.shipmentModels, res.totalSize);
        });
    }

    fetchShipmentById(shipmentId: string, callback: (shipmentModel: ShipmentModel, skuModels: SkuModel[], skuOriginModels: SkuOriginModel[], shipmentDocumentModels: ShipmentDocumentModel[]) => void) {
        const req = new FetchShipmentByIdReq(shipmentId);

        this.shipmentApi.req(Actions.SHIPMENT.FETCH_SHIPMENT_BY_ID, req, (json: any) => {
            if (json.status !== ResponseConsts.S_STATUS_OK) {
                this.showAlert('Something went wrong');
                return;
            }

            const res = new FetchShipmentsByIdRes(json.obj);

            callback(res.shipmentModel, res.skuModels, res.skuOriginModels, res.shipmentDocumentModels);
        })

    }

    fetchProductsInStock(searchBy: string, sortBy: number, from: number, to: number, callback: (skuModels: SkuModel[], productModels: ProductModel[], totalSkuSize: number) => void) {
        const req = new FetchProductsInStockReq(searchBy, sortBy, from, to);

        this.shipmentApi.req(Actions.SHIPMENT.FETCH_PRODUCTS_IN_STOCK, req, (json: any) => {
            if (json.status !== ResponseConsts.S_STATUS_OK) {
                this.showAlert('Something went wrong');
                return;
            }

            const res = new FetchProductsInStockRes(json.obj);

            callback(res.skuModels, res.productModels, res.totalSkuSize);
        })
    }

    fetchTotalValueInStock(callBack: (totalValue: number) => void) {
        const req = new FetchTotalValueInStockReq();

        this.shipmentApi.req(Actions.SHIPMENT.FETCH_TOTAL_VALUE_IN_STOCK, req, (json: any) => {
            if (json.status !== ResponseConsts.S_STATUS_OK) {
                this.showAlert('Something went wrong');
                return;
            }

            const res = new FetchTotalValueInStockRes(json.obj);

            callBack(res.totalValue);
        })
    }

    fetchShipmentsWhereProductLeftByProductId(productId: string, callback: (skuModels: SkuModel[], shipmentModels: ShipmentModel[]) => void) {
        const req = new FetchShipmentsWithProductQuantityLeftByProductIdReq(productId);

        this.shipmentApi.req(Actions.SHIPMENT.FETCH_SHIPMENT_WHERE_PRODUCT_LEFT_BY_PRODUCT_ID, req, (json: any) => {
            if (json.status !== ResponseConsts.S_STATUS_OK) {
                this.showAlert('Something went wrong');
                return;
            }

            const res = new FetchShipmentsWithProductQuantityLeftByProductIdRes(json.obj);

            callback(res.skuModels, res.shipmentModels);
        })
    }

}
