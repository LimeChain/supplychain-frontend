import AbsApi from './AbsApi';
import { CreditShipmentReq, CreditShipmentReq2, DeleteShipmentReq, FetchShipmentsByFilterReq, FetchShipmentByIdReq } from '../network-requests/ShipmentApiReq';
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
import ShipmentStatusConstsH from '../../../../../../builds/dev-generated/product-group-module/shipment-module/ShipmentStatusConsts';

export default class ShipmentApi extends AbsApi {

    shipmentApi: Api;

    constructor(enableActions: null | (() => void) = null, disableActions: null | (() => void) = null, showAlert: null | ((msg: string, positiveListener?: null | (() => boolean | void), negativeListener?: null | (() => boolean | void)) => void) = null) {
        super(enableActions, disableActions, showAlert);
        this.shipmentApi = new Api(Apis.SHIPMENT, this.enableActions, this.disableActions);
    }

    example(shipmentModel: ShipmentModel, callback: () => void) {
        const req = new CreditShipmentReq2(shipmentModel, [], []);

        this.shipmentApi.req(Actions.SHIPMENT.EXAMPLE, req, (json: any) => {
            if (json.status !== ResponseConsts.S_STATUS_OK) {
                this.showAlert('Something went wrong');
                return;
            }

            const res = new CreditShipmentRes(json.obj);
            shipmentModel.shipmentId = res.shipmentModel.shipmentId;
            callback();
        });
    }

    creditShipment(shipmentModel: ShipmentModel, skuModels: SkuModel[], skuOriginModels: SkuOriginModel[], callback: () => void) {
        this.disableActions();

        setTimeout(() => {
            this.enableActions();

            const req = new CreditShipmentReq(shipmentModel, skuOriginModels, skuModels);

            const json = {
                shipmentJson: null,
                skuOriginJsons: [],
                skuJsons: [],
            }

            // if not specified set shipment to not sent
            if (shipmentModel.shipmentStatus === undefined) {
                shipmentModel.shipmentStatus = ShipmentStatusConstsH.S_STATUS_DRAFT;
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


    fetchShipmentByFilter(filter: string, pageSize: number, pageNumber: number, callback: (shipmentModels: ShipmentModel[]) => void) {
        this.disableActions();

        setTimeout(() => {
            this.enableActions();

            const req = new FetchShipmentsByFilterReq(filter, pageSize, pageNumber);

            // Server code
            const json = {
                shipmentJsons: [],
            }

            if (filter !== S.Strings.EMPTY && typeof filter === 'string') {
                storageHelper.shipmentsJson.forEach((shipmentJson: ShipmentModel) => {

                    let occurance = 0;

                    if (shipmentJson.shipmentId.includes(filter)) {
                        occurance++;
                    }

                    if (shipmentJson.shipmentName.includes(filter)) {
                        occurance++;
                    }

                    const originSite = storageHelper.sitesJson.find((siteJson) => siteJson.siteId === shipmentJson.shipmentOriginSiteId);
                    const originCountry = storageHelper.countriesJson.find((countryJson) => countryJson.countryId === originSite.countryId);
                    if (originSite.siteName.includes(filter)) {
                        occurance++;
                    }
                    if (originCountry.countryName.includes(filter)) {
                        occurance++;
                    }

                    const destinationSite = storageHelper.sitesJson.find((siteJson) => siteJson.siteId === shipmentJson.shipmentDestinationSiteId);
                    const destinationCountry = storageHelper.countriesJson.find((countryJson) => countryJson.countryId === destinationSite.countryId);
                    if (destinationSite.siteName.includes(filter)) {
                        occurance++;
                    }
                    if (destinationCountry.countryName.includes(filter)) {
                        occurance++;
                    }

                    if (new Date(shipmentJson.shipmentDateOfShipment).formatCalendarDateAndTime().includes(filter)) {
                        occurance++;
                    }

                    if (new Date(shipmentJson.shipmentDateOfArrival).formatCalendarDateAndTime().includes(filter)) {
                        occurance++;
                    }

                    shipmentJson.occurance = occurance;

                    json.shipmentJsons.push(shipmentJson);
                });
            }

            json.shipmentJsons.sort((a, b) => (a.occurance > b.occurance ? 1 : -1))

            const totalSize = json.shipmentJsons.length;
            const sliceBegin = totalSize - pageNumber * pageSize;
            const sliceEnd = sliceBegin + pageSize;

            json.shipmentJsons = json.shipmentJsons.slice(sliceBegin < 0 ? 0 : sliceBegin, sliceEnd);
            // end server code

            const res = new FetchShipmentsByFilterRes(json);

            callback(res.shipmentModels);
        }, 100);
    }

    fetchShipmentById(shipmentId: string, callback: (shipmentModel: ShipmentModel) => void) {
        this.disableActions();

        setTimeout(() => {
            this.enableActions();

            const req = new FetchShipmentByIdReq(shipmentId);

            // Server code
            const json = {
                shipmentJson: storageHelper.shipmentsJson.find((shipmentJson) => shipmentJson.shipmentId === shipmentId),

            }

            console.log(json);

            const res = new FetchShipmentsByIdRes(json);

            callback(res.shipmentModel);
        }, 100);
    }

}
