import AbsApi from './AbsApi';
import { CreditShipmentReq, FetchShipmentsWithProductQuantityLeftByProductIdReq, FetchProductsInStockReq, FetchShipmentsByFilterReq, FetchShipmentByIdReq } from '../network-requests/ShipmentApiReq';
import { CreditShipmentRes, FetchShipmentsWithProductQuantityLeftByProductIdRes, FetchProductsInStockRes, FetchShipmentsByFilterRes, FetchShipmentsByIdRes } from '../network-responses/ShipmentApiRes';
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
import ShipmentFilter from '../../../../../../builds/dev-generated/ShipmentModule/Shipment/Utils/ShipmentFilterConsts';
import GeneralApi from './GeneralApi';
import PagesCAdmin from '../../../../../../builds/dev-generated/PagesCAdmin';
import CookieHelper from '../helpers/CookieHelper';
import { number } from 'prop-types';
import ProductModel from '../models/product-module/ProductModel';
import SkuFilter from '../../../../../../builds/dev-generated/ProductModule/Sku/Utils/SkuFilterConsts';
import moment from 'moment';

class ProductData {
    productJson: ProductModel
    productQuantity: number
    productPrice: number
    productCurrency: number

    constructor(productJson: ProductModel, productQuantity: number, productPrice: number, productCurrency: number) {
        this.productJson = productJson;
        this.productQuantity = productQuantity;
        this.productPrice = productPrice;
        this.productCurrency = productCurrency;
    }

}

export default class ShipmentApi extends AbsApi {

    shipmentApi: Api;

    constructor(enableActions: null | (() => void) = null, disableActions: null | (() => void) = null, showAlert: null | ((msg: string, positiveListener?: null | (() => boolean | void), negativeListener?: null | (() => boolean | void)) => void) = null) {
        super(enableActions, disableActions, showAlert);
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
                shipmentDocumentJsons: [],
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

                const currentSite = CookieHelper.fetchAccounts().accountModel.siteId;

                json.shipmentJson.shipmentOriginSiteId = currentSite;
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

                json.skuOriginJsons.push(skuOriginJson);
            })

            // documents
            json.shipmentDocumentJsons = shipmentDocumentModels.map((shipmentDocumentModel) => shipmentDocumentModel.toJson())
            const res = new CreditShipmentRes(json);

            storageHelper.save();
            callback();
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
        page: string,
        searchBy: string,
        sortBy: number,
        from: number,
        to: number,
        callback: (shipmentModels: ShipmentModel[], totalSize) => void,
    ) {

        this.disableActions();

        setTimeout(() => {
            this.enableActions();

            const req = new FetchShipmentsByFilterReq(
                searchBy,
                sortBy,
                from,
                to,
            );

            // Server code
            const json = {
                shipmentJsons: [],
                totalSize: 0,
            }

            searchBy = searchBy.toLowerCase();

            if (searchBy !== S.Strings.EMPTY) {
                storageHelper.shipmentsJson.forEach((shipmentJson: ShipmentModel) => {

                    let occurance = 0;

                    if (shipmentJson.shipmentId.toLowerCase().includes(searchBy)) {
                        occurance++;
                    }

                    if (shipmentJson.shipmentConsignmentNumber.toLowerCase().includes(searchBy)) {
                        occurance++;
                    }

                    const originSite = storageHelper.sitesJson.find((siteJson) => siteJson.siteId === shipmentJson.shipmentOriginSiteId);
                    const originCountry = storageHelper.countriesJson.find((countryJson) => countryJson.countryId === originSite.countryId);

                    if (originSite.siteName.toLowerCase().includes(searchBy)) {
                        occurance++;
                    }
                    if (originCountry.countryName.toLowerCase().includes(searchBy)) {
                        occurance++;
                    }

                    const destinationSite = storageHelper.sitesJson.find((siteJson) => siteJson.siteId === shipmentJson.shipmentDestinationSiteId);

                    if (destinationSite !== undefined) {

                        const destinationCountry = storageHelper.countriesJson.find((countryJson) => countryJson.countryId === destinationSite.countryId);

                        if (destinationSite.siteName.toLowerCase().includes(searchBy.toLowerCase())) {
                            occurance++;
                        }
                        if (destinationCountry.countryName.toLowerCase().includes(searchBy.toLowerCase())) {
                            occurance++;
                        }
                    } else if ('n/a'.includes(searchBy.toLowerCase())) {
                        occurance++;
                    }

                    if (moment(shipmentJson.shipmentDateOfShipment).format('DD MMM YYYY').toLowerCase().includes(searchBy)) {
                        occurance++;
                    }

                    if (moment(shipmentJson.shipmentDateOfArrival).format('DD MMM YYYY').toLowerCase().includes(searchBy)) {
                        occurance++;
                    }

                    shipmentJson.occurance = occurance;

                    if (occurance > 0) {
                        json.shipmentJsons.push(shipmentJson);
                    }

                });

            } else {
                json.shipmentJsons = storageHelper.shipmentsJson;
            }

            const currentSite = storageHelper.sitesJson.find((siteJson) => siteJson.countryId === CookieHelper.fetchAccounts().accountModel.countryId);

            console.log(json.shipmentJsons);

            // filter by page
            if (page === PagesCAdmin.DRAFTS) {
                json.shipmentJsons = json.shipmentJsons.filter((shipmentJson: ShipmentModel) => shipmentJson.shipmentStatus === ShipmentConstsH.S_STATUS_DRAFT)
            } else if (page === PagesCAdmin.INCOMMING) {
                json.shipmentJsons = json.shipmentJsons.filter((shipmentJson: ShipmentModel) => shipmentJson.shipmentDestinationSiteId === currentSite.siteId && shipmentJson.shipmentStatus !== ShipmentConstsH.S_STATUS_DRAFT)
            } else if (page === PagesCAdmin.OUTGOING) {
                json.shipmentJsons = json.shipmentJsons.filter((shipmentJson: ShipmentModel) => shipmentJson.shipmentOriginSiteId === currentSite.siteId && shipmentJson.shipmentStatus !== ShipmentConstsH.S_STATUS_DRAFT)
            }

            json.totalSize = json.shipmentJsons.length;

            console.log(json.shipmentJsons);

            json.shipmentJsons = json.shipmentJsons.sort((a: ShipmentModel, b: ShipmentModel): number => {
                const sign = sortBy / Math.abs(sortBy);

                const originSiteA = storageHelper.sitesJson.find((siteJson) => siteJson.siteId === a.shipmentOriginSiteId);
                const originSiteB = storageHelper.sitesJson.find((siteJson) => siteJson.siteId === b.shipmentOriginSiteId);

                const originCountryNameA = storageHelper.countriesJson.find((countryJson) => countryJson.countryId === originSiteA.countryId).countryName;
                const originCountryNameB = storageHelper.countriesJson.find((countryJson) => countryJson.countryId === originSiteB.countryId).countryName;

                const destinationSiteA = storageHelper.sitesJson.find((siteJson) => siteJson.siteId === a.shipmentDestinationSiteId);
                const destinationSiteB = storageHelper.sitesJson.find((siteJson) => siteJson.siteId === b.shipmentDestinationSiteId);

                let destinationCompareStringA = 'N/A';
                let destinationCompareStringB = 'N/A';

                if (destinationSiteA !== undefined) {
                    const destinationCountryNameA = storageHelper.countriesJson.find((countryJson) => countryJson.countryId === destinationSiteA.countryId).countryName;

                    destinationCompareStringA = `${destinationSiteA.siteName}, ${destinationCountryNameA}`
                }

                if (destinationSiteB !== undefined) {
                    const destinationCountryNameB = storageHelper.countriesJson.find((countryJson) => countryJson.countryId === destinationSiteB.countryId).countryName;
                    destinationCompareStringB = `${destinationSiteB.siteName}, ${destinationCountryNameB}`
                }

                switch (Math.abs(sortBy)) {
                    case ShipmentFilter.S_SORT_BY_CONSIGNMENT_NUMBER:
                        return a.shipmentConsignmentNumber.localeCompare(b.shipmentConsignmentNumber) * sign;
                    case ShipmentFilter.S_SORT_BY_ORIGIN_SITE_ID:
                        return originCountryNameA.localeCompare(originCountryNameB) * sign;
                    case ShipmentFilter.S_SORT_BY_DESTINATION_SITE_ID:
                        return destinationCompareStringA.localeCompare(destinationCompareStringB) * sign
                    case ShipmentFilter.S_SORT_BY_DATE_OF_SHIPMENT:
                        return a.shipmentDateOfShipment > b.shipmentDateOfShipment ? -1 * sign : -1 * sign
                    default:
                        return a.shipmentId.localeCompare(b.shipmentId);
                }

            }).slice(from, to);
            // end server code

            const res = new FetchShipmentsByFilterRes(json);

            callback(res.shipmentModels, res.totalSize);
        }, 100);

        // const req = new FetchShipmentsByFilterReq(
        //     searchBy,
        //     sortBy,
        //     from,
        //     to,
        // );

        // this.shipmentApi.req(Actions.SHIPMENT.FETCH_SHIPMENTS_BY_FILTER, req, (json: any) => {
        //     if (json.status !== ResponseConsts.S_STATUS_OK) {
        //         this.showAlert('Something went wrong');
        //         return;
        //     }

        //     const res = new FetchShipmentsByFilterRes(json.obj);
        //     callback(res.shipmentModels, res.totalSize);
        // });
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

    fetchProductsInStock(
        searchBy: string,
        sortBy: number,
        from: number,
        to: number,
        callBack: (skuModels: SkuModel[], productModels: ProductModel[], totalSkuSize) => void,
    ) {
        this.disableActions();

        setTimeout(() => {
            this.enableActions();

            const req = new FetchProductsInStockReq(searchBy, sortBy, from, to);

            const json = this.fetchSkusInStock(searchBy);
            const sign = sortBy / Math.abs(sortBy);

            json.skuJsons = json.skuJsons.sort((a: SkuModel, b: SkuModel) => {

                const productNameA = json.productJsons.find((productJson: ProductModel) => productJson.productId === a.productId).productName;
                const productNameB = json.productJsons.find((productJson: ProductModel) => productJson.productId === b.productId).productName;

                switch (Math.abs(sortBy)) {
                    case SkuFilter.S_SORT_BY_ID:
                        return a.skuId.localeCompare(b.skuId) * sign;
                    case SkuFilter.S_SORT_BY_NAME:
                        return productNameA.localeCompare(productNameB) * sign;
                    default:
                        return a.skuId.localeCompare(b.skuId);

                }
            })

            json.skuJsons = json.skuJsons.slice(from, to);

            const res = new FetchProductsInStockRes(json);

            callBack(res.skuModels, res.productModels, res.totalSkuSize)
        }, 100);
    }

    fetchShipmentsWhereProductLeftByProductId(productId: string, callback: (skuModels: SkuModel[], shipmentModels: ShipmentModel[]) => void) {
        this.disableActions();

        setTimeout(() => {
            this.enableActions();
            const req = new FetchShipmentsWithProductQuantityLeftByProductIdReq(productId);

            const json = this.fetchSkusInStock(S.Strings.EMPTY);

            json.skuJsons = json.skuJsons.filter((skuJson: SkuModel) => skuJson.productId === productId);

            json.shipmentJsons = [];

            json.skuJsons.forEach((skuJson: SkuModel) => {
                json.shipmentJsons.push(storageHelper.shipmentsJson.find((shipmentJson: ShipmentModel) => shipmentJson.shipmentId === skuJson.shipmentId));
            })

            const res = new FetchShipmentsWithProductQuantityLeftByProductIdRes(json);

            callback(res.skuModels, res.shipmentModels);
        }, 100);
    }

    fetchSkusInStock(searchBy: string) {

        const json = {
            skuJsons: [],
            productJsons: [],
            totalSkuSize: 0,
        }

        const currentSiteId = CookieHelper.fetchAccounts().accountModel.siteId;
        const shipmentsDeliveredHere = storageHelper.shipmentsJson.filter((shipmentJson: ShipmentModel) => shipmentJson.shipmentDestinationSiteId === currentSiteId && shipmentJson.shipmentStatus === ShipmentConstsH.S_STATUS_RECEIVED);

        shipmentsDeliveredHere.forEach((shipmentJson: ShipmentModel) => {
            const skusInCurrentShipment = storageHelper.skusJson.filter((skuJson: SkuModel) => skuJson.shipmentId === shipmentJson.shipmentId);

            skusInCurrentShipment.forEach((skuJson: SkuModel) => {
                let skuQuantity = skuJson.quantity;

                storageHelper.skuOriginsJson.filter((skuOriginJson: SkuOriginModel) => skuOriginJson.shipmentId === shipmentJson.shipmentId)
                    .forEach((skuOriginJson: SkuOriginModel) => {
                        // console.log(skuOriginJson);

                        const skuInThisOrigin = storageHelper.skusJson.find((skuJsonTemp: SkuModel) => skuJsonTemp.skuId === skuOriginJson.skuId);
                        // console.log(skuInThisOrigin);

                        if (skuJson.productId === skuInThisOrigin.productId) {
                            skuQuantity -= skuInThisOrigin.quantity;
                        }
                    })

                const productJson = storageHelper.productsJson.find((productJsonTemp: ProductModel) => productJsonTemp.productId === skuJson.productId);

                const skuTemp = JSON.parse(JSON.stringify(skuJson));
                skuTemp.quantity = skuQuantity;

                if (skuTemp.quantity > 0) {
                    json.skuJsons.push(skuTemp);
                    // console.log(skuTemp);

                    if (json.productJsons.find((p: ProductModel) => p.productId === productJson.productId) === undefined) {
                        json.productJsons.push(productJson);
                    }
                }
            })
        })

        if (searchBy !== S.Strings.EMPTY) {
            json.skuJsons = json.skuJsons.filter((skuJson: SkuModel) => {
                if (skuJson.skuId.includes(searchBy.toLocaleLowerCase())) {
                    return true;
                }

                if (json.productJsons.find((p: ProductModel) => p.productId === skuJson.productId).productName.toLowerCase().includes(searchBy.toLocaleLowerCase())) {
                    return true;
                }

                return false;
            });
        }

        json.totalSkuSize = json.skuJsons.length;

        return json;
    }

}
