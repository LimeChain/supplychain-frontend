import AbsApi from './AbsApi';
import { CreditShipmentReq, DeleteShipmentReq, FetchShipmentsByFilterReq, FetchShipmentByIdReq } from '../network-requests/ShipmentApiReq';
import { CreditShipmentRes, DeleteShipmentRes, FetchShipmentsByFilterRes, FetchShipmentsByIdRes } from '../network-responses/ShipmentApiRes';
import ShipmentModel from '../models/shipment-module/ShipmentModel';
import storageHelper from '../helpers/StorageHelper';
import S from '../utilities/Main';
import SkuOriginModel from '../models/product-module/SkuOriginModel';
import SkuModel from '../models/product-module/SkuModel';
import Apis from '../../../../../../builds/dev-generated/Apis';
import Api from '../utilities/Api';
import Actions from '../../../../../../builds/dev-generated/Actions';
import ResponseConsts from '../../../../../../builds/dev-generated/utilities/network/ResponseConsts';
import ShipmentDocumentModel from '../models/shipment-module/ShipmentDocumentModel';

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
                this.showAlert('Something went wrong');
                return;
            }

            const res = new CreditShipmentRes(json.obj);

            shipmentModel.shipmentId = res.shipmentModel.shipmentId;
            callback();
        });
    }

    deleteShipment(shipmentId: string, callback: (shipmentModel: ShipmentModel) => void) {
        this.disableActions();

        setTimeout(() => {
            this.enableActions();

            const req = new DeleteShipmentReq(shipmentId);

            // Server code
            const json = {
                shipmentJson: storageHelper.shipmentsJson.find((shipmentJson) => shipmentJson.shipmentId === shipmentId),
            }

            json.shipmentJson.shipmentDeleted = S.INT_TRUE;

            const res = new DeleteShipmentRes(json);

            callback(res.shipmentModel);
        }, 100);
    }

    fetchShipmentByFilter(
        filterId: string,
        filterName: string,
        filterStatus: number,
        filterOriginSiteId: string,
        filterDestinationSiteId: string,
        filterDateOfShipment: number,
        filterDateOfArrival: number,
        sortBy: number,
        from: number,
        to: number,
        callback: (shipmentModels: ShipmentModel[], totalSize) => void
    ) {

        const req = new FetchShipmentsByFilterReq(
            filterId,
            filterName,
            filterStatus,
            filterOriginSiteId,
            filterDestinationSiteId,
            filterDateOfShipment,
            filterDateOfArrival,
            sortBy,
            from,
            to
        );

        this.shipmentApi.req(Actions.SHIPMENT.FETCH_SHIPMENTS_BY_FILTER, req, (json: any) => {
            if (json.status !== ResponseConsts.S_STATUS_OK) {
                this.showAlert('Something went wrong');
                return;
            }

            const res = new FetchShipmentsByFilterRes(json.obj);
            callback(res.shipmentModels, res.totalSize);
        });
    }

    fetchShipmentById(shipmentId: string, callback: (shipmentModel: ShipmentModel) => void) {
        const req = new FetchShipmentByIdReq(shipmentId);

        this.shipmentApi.req(Actions.SHIPMENT.FETCH_SHIPMENT_BY_ID, req, (json: any) => {

            if (json.status !== ResponseConsts.S_STATUS_OK) {
                this.showAlert('Something went wrong');
                return;
            }

            const res = new FetchShipmentsByIdRes(json.obj);
            callback(res.shipmentModel);

        })

    }

}
