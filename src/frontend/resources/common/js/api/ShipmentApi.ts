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
