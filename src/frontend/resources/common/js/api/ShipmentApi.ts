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
import ShipmentConstsH from '../../../../../../builds/dev-generated/ShipmentModule/Shipment/ShipmentModelHConsts';

export default class ShipmentApi extends AbsApi {

    shipmentApi: Api;

    constructor(enableActions: null | (() => void) = null, disableActions: null | (() => void) = null, showAlert: null | ((msg: string, positiveListener?: null | (() => boolean | void), negativeListener?: null | (() => boolean | void)) => void) = null) {
        super(enableActions, disableActions, showAlert);
        this.shipmentApi = new Api(Apis.SHIPMENT, this.enableActions, this.disableActions);
    }

    creditShipment(shipmentModel: ShipmentModel, skuModels: SkuModel[], skuOriginModels: SkuOriginModel[], shipmentDocumentModels: ShipmentDocumentModel[], callback: () => void) {
        this.disableActions();

        setTimeout(() => {
            this.enableActions();

            const req = new CreditShipmentReq(shipmentModel, skuOriginModels, skuModels, shipmentDocumentModels);

            const json = {
                shipmentJson: null,
                skuOriginJsons: [],
                skuJsons: [],
            }

            // if not specified set shipment to not sent
            if (shipmentModel.shipmentStatus === undefined) {
                shipmentModel.shipmentStatus = ShipmentConstsH.S_STATUS_DRAFT;
            }

            // save shipment to storageHelper
            // set new id or get old one

            json.shipmentJson = {
                shipmentId: S.Strings.NOT_EXISTS,
            }

            if (shipmentModel.isNew() === true) {
                let nextId;

                if (storageHelper.shipmentsJson.length > 0) {
                    const lastShipmentJson = storageHelper.shipmentsJson[storageHelper.shipmentsJson.length - 1];
                    nextId = (parseInt(lastShipmentJson.shipmentId) + 1).toString();
                } else {
                    nextId = '1';
                }

                json.shipmentJson.shipmentId = nextId;
            } else {
                const shipmentJson = storageHelper.shipmentsJson.find((t) => t.shipmentId === shipmentModel.shipmentId);
                json.shipmentJson.shipmentId = shipmentJson.shipmentId;
            }

            shipmentModel.shipmentId = json.shipmentJson.shipmentId;
            json.shipmentJson = storageHelper.shipmentsJson.find((t) => t.shipmentId === json.shipmentJson.shipmentId);

            if (json.shipmentJson !== undefined) {
                Object.assign(json.shipmentJson, shipmentModel.toJson());
            } else {
                storageHelper.shipmentsJson.push(shipmentModel.toJson());
                json.shipmentJson = shipmentModel.toJson();
            }

            // save skuModels to storageHelper
            skuModels.forEach((skuModel) => {
                let skuId = S.Strings.NOT_EXISTS;

                // set new id or get old one
                if (skuModel.isNew() === true) {
                    let nextId;

                    if (storageHelper.skusJson.length > 0) {
                        const lastSkusJson = storageHelper.skusJson[storageHelper.skusJson.length - 1];
                        nextId = (parseInt(lastSkusJson.skuId) + 1).toString();
                    } else {
                        nextId = '1';
                    }

                    skuId = nextId;

                    // change referenceId in origin to new actual id
                    const skuOriginModel = skuOriginModels.find((skuOriginModel) => skuOriginModel.skuId === skuModel.skuId)
                    if (skuOriginModel !== undefined) {
                        skuOriginModel.skuId = skuId;
                    }
                } else {
                    skuId = skuModel.skuId;
                }

                skuModel.skuId = skuId;

                let skuJson = storageHelper.skusJson.find((s) => s.skuId === skuId);

                if (skuJson !== undefined) {
                    Object.assign(skuJson, skuModel.toJson());
                } else {
                    skuJson = skuModel.toJson();
                    storageHelper.skusJson.push(skuJson);
                }

                json.skuJsons.push(skuJson);
            })

            // save shkuOrigins to storageHelper
            skuOriginModels.forEach((skuOriginModel) => {
                let skuOriginId = S.Strings.NOT_EXISTS;

                // set new id or get old one
                if (skuOriginModel.isNew() === true) {
                    let nextId;

                    if (storageHelper.skuOriginsJson.length > 0) {
                        const lastSkuOriginJson = storageHelper.skuOriginsJson[storageHelper.skuOriginsJson.length - 1];
                        nextId = (parseInt(lastSkuOriginJson.skuOriginId) + 1).toString();
                    } else {
                        nextId = '1';
                    }

                    skuOriginId = nextId;
                } else {
                    skuOriginId = skuOriginModel.skuOriginId;
                }

                skuOriginModel.skuOriginId = skuOriginId;

                let skuOriginJson = storageHelper.skuOriginsJson.find((s) => s.skuOriginId === skuOriginId);

                if (skuOriginJson !== undefined) {
                    Object.assign(skuOriginJson, skuOriginModel.toJson());
                } else {
                    skuOriginJson = skuOriginModel.toJson();
                    storageHelper.skuOriginsJson.push(skuOriginJson);
                }

                skuOriginJson.shipmentId = json.shipmentJson.shipmentId;

                json.skuOriginJsons.push(skuOriginJson);
            })

            const res = new CreditShipmentRes(json);

            storageHelper.save();
            callback(res);
        }, 100);

        // const req = new CreditShipmentReq(shipmentModel, skuOriginModels, skuModels, shipmentDocumentModels);

        // this.shipmentApi.req(Actions.SHIPMENT.CREDIT, req, (json: any) => {
        //     if (json.status !== ResponseConsts.S_STATUS_OK) {
        //         this.showAlert('Something went wrong');
        //         return;
        //     }

        //     const res = new CreditShipmentRes(json.obj);

        //     shipmentModel.shipmentId = res.shipmentModel.shipmentId;

        //     // TODO: have to update the values
        //     skuModels = res.skuModels;
        //     skuOriginModels = res.skuOriginModels;

        //     callback();
        // });
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
        callback: (shipmentModels: ShipmentModel[], totalSize) => void,
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
            to,
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
