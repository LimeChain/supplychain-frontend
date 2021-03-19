import S from '../utilities/Main';
import ProductConsts from '../../../../../../builds/dev-generated/ProductModule/Product/ProductModelConsts';
import SkuConsts from '../../../../../../builds/dev-generated/ProductModule/Sku/SkuModelConsts';
import ShipmentConsts from '../../../../../../builds/dev-generated/ShipmentModule/Shipment/ShipmentModelConsts';
import CountryConsts from '../../../../../../builds/dev-generated/Country/CountryModelConsts';
import SiteConsts from '../../../../../../builds/dev-generated/Site/SiteModelConsts';

import NotificationConsts from '../../../../../../builds/dev-generated/Notification/NotificationModelConsts';
import CountryModel from '../models/CountryModel';
import SiteModel from '../models/SiteModel';

const LOCAL_STORAGE_KEY = 'hedera_storage';
const VERSION = 50;

const productsJson = [
    // jsonProduct('1', 'Chair', ProductConsts.S_UNIT_PACK, 'Simple wooden chair', S.INT_FALSE),
    // jsonProduct('2', 'Table', ProductConsts.S_UNIT_PACK, 'Simple wooden table', S.INT_FALSE),
    // jsonProduct('3', 'Machine', ProductConsts.S_UNIT_PACK, 'Drilling machine', S.INT_FALSE),
    // jsonProduct('4', 'Gold', ProductConsts.S_UNIT_PACK, 'Gold reserve', S.INT_FALSE),
]

const skusJson = [
    // jsonSku('1', '5', '1', 30, 20, SkuConsts.S_CURRENCY_EUR),
    // jsonSku('2', '6', '1', 10, 420, SkuConsts.S_CURRENCY_EUR),
    // jsonSku('3', '5', '3', 36, 10, SkuConsts.S_CURRENCY_USD),
    // jsonSku('4', '7', '4', 3345, 20, SkuConsts.S_CURRENCY_EUR),
    // jsonSku('5', '1', 30, 20, SkuConsts.S_CURRENCY_USD),
    // jsonSku('6', '3', 30, 20, SkuConsts.S_CURRENCY_USD),
    // jsonSku('7', '2', 30, 20, SkuConsts.S_CURRENCY_EUR),
]

const skuOriginsJson = [
    // jsonSkuOrigin('1', '2', '5'),
    // jsonSkuOrigin('1', '4', '5'),
]

const shipmentsJson = [
    // jsonShipment('1', 'Chairs to Germany', 'C1', ShipmentConsts.S_STATUS_IN_TRANSIT, '2', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    // jsonShipment('2', 'Chairs to Germany2', 'C2', ShipmentConsts.S_STATUS_IN_TRANSIT, '2', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    // jsonShipment('3', 'Chairs to Germany3', 'C3', ShipmentConsts.S_STATUS_RECEIVED, '2', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    // jsonShipment('4', 'Tables to Malta', 'C4', ShipmentConsts.S_STATUS_IN_TRANSIT, '2', '1', Date.now(), Date.now() + 1000, 1, 1, S.INT_FALSE),
    // jsonShipment('5', 'Tables to Malta', 'C5', ShipmentConsts.S_STATUS_IN_TRANSIT, '2', '1', Date.now(), Date.now() + 1000, 1, 1, S.INT_FALSE),
    // jsonShipment('6', 'Tables to Germany', 'C6', ShipmentConsts.S_STATUS_IN_TRANSIT, '2', '1', Date.now(), Date.now() + 1000, 1, 1, S.INT_FALSE),
    // jsonShipment('8', 'Gold from Germany', 'C8', ShipmentConsts.S_STATUS_IN_TRANSIT, '2', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    // jsonShipment('9', 'Gold from Germany', 'C9', ShipmentConsts.S_STATUS_IN_TRANSIT, '2', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    // jsonShipment('10', 'Gold from Germany', 'C10', ShipmentConsts.S_STATUS_IN_TRANSIT, '2', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    // jsonShipment('11', 'Gold from Germany', 'C11', ShipmentConsts.S_STATUS_IN_TRANSIT, '2', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    // jsonShipment('12', 'Gold from Germany', 'C12', ShipmentConsts.S_STATUS_RECEIVED, '2', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    // jsonShipment('13', 'Gold from Germany', 'C13', ShipmentConsts.S_STATUS_IN_TRANSIT, '2', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    // jsonShipment('21', 'Chairs to Germany', 'C1', ShipmentConsts.S_STATUS_IN_TRANSIT, '2', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    // jsonShipment('22', 'Chairs to Germany2', 'C2', ShipmentConsts.S_STATUS_IN_TRANSIT, '2', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    // jsonShipment('23', 'Chairs to Germany3', 'C3', ShipmentConsts.S_STATUS_RECEIVED, '2', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    // jsonShipment('24', 'Tables to Malta', 'C4', ShipmentConsts.S_STATUS_IN_TRANSIT, '2', '1', Date.now(), Date.now() + 1000, 1, 1, S.INT_FALSE),
    // jsonShipment('25', 'Tables to Malta', 'C5', ShipmentConsts.S_STATUS_IN_TRANSIT, '2', '1', Date.now(), Date.now() + 1000, 1, 1, S.INT_FALSE),
    // jsonShipment('26', 'Tables to Germany', 'C6', ShipmentConsts.S_STATUS_IN_TRANSIT, '2', '1', Date.now(), Date.now() + 1000, 1, 1, S.INT_FALSE),
    // jsonShipment('28', 'Gold from Germany', 'C8', ShipmentConsts.S_STATUS_IN_TRANSIT, '2', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    // jsonShipment('29', 'Gold from Germany', 'C9', ShipmentConsts.S_STATUS_IN_TRANSIT, '2', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    // jsonShipment('30', 'Gold from Germany', 'C10', ShipmentConsts.S_STATUS_IN_TRANSIT, '2', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    // jsonShipment('31', 'Gold from Germany', 'C11', ShipmentConsts.S_STATUS_IN_TRANSIT, '2', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    // jsonShipment('32', 'Gold from Germany', 'C12', ShipmentConsts.S_STATUS_RECEIVED, '2', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    // jsonShipment('33', 'Gold from Germany', 'C13', ShipmentConsts.S_STATUS_IN_TRANSIT, '2', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),

]

const shipmentDocumentsJson = [
    // jsonShipmentDocument('1', '1', 'localhost/documents/aaa.pdf'),
]

const countriesJson = [
    jsonCountry('1', 'Germany', 0.19),
    jsonCountry('2', 'Netherlands', 0.18),
]

const sitesJson = [
    jsonSite(SiteConsts.S_BERLIN, CountryConsts.S_GERMANY, 'Berlin'),
    jsonSite(SiteConsts.S_ROTHERDAM, CountryConsts.S_NETHERLANDS, 'Rotterdam'),
]

const notificationsJson = [
    // jsonNotification('1', '1', NotificationConsts.S_NOTIFICATION_SENT, Date.now() - 500000, S.INT_FALSE),
    // jsonNotification('2', '1', NotificationConsts.S_NOTIFICATION_RECEIVED, Date.now() - 400000, S.INT_FALSE),
    // jsonNotification('3', '2', NotificationConsts.S_NOTIFICATION_SENT, Date.now() - 300000, S.INT_FALSE),
    // jsonNotification('4', '2', NotificationConsts.S_NOTIFICATION_RECEIVED, Date.now() - 600000, S.INT_FALSE),
    // jsonNotification('5', '3', NotificationConsts.S_NOTIFICATION_SENT, Date.now() - 100000, S.INT_FALSE),
    // jsonNotification('6', '3', NotificationConsts.S_NOTIFICATION_RECEIVED, Date.now() - 200000, S.INT_FALSE),
    // jsonNotification('7', '4', NotificationConsts.S_NOTIFICATION_SENT, Date.now() - 20000, S.INT_FALSE),
    // jsonNotification('8', '4', NotificationConsts.S_NOTIFICATION_RECEIVED, Date.now() - 422000, S.INT_FALSE),
]

const accountsJson = [
    jsonAccount('1', CountryConsts.S_GERMANY, SiteConsts.S_BERLIN, 'germany@pwc.com', 'Germany'),
    jsonAccount('2', CountryConsts.S_NETHERLANDS, SiteConsts.S_ROTHERDAM, 'netherlands@pwc.com', 'Netherlands'),
];

class StorageHelper {

    constructor() {
        this.version = VERSION;
        this.productsJson = productsJson;
        this.shipmentsJson = shipmentsJson;
        this.shipmentDocumentsJson = shipmentDocumentsJson;
        this.countriesJson = countriesJson;
        this.notificationsJson = notificationsJson;
        this.sitesJson = sitesJson;
        this.skuOriginsJson = skuOriginsJson;
        this.skusJson = skusJson;
        this.accountsJson = accountsJson;
    }
    S_STATUS_DRAFT
    static open() {
        const result = new StorageHelper();
        const json = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (json !== null) {
            const storage = JSON.parse(json);
            if (storage.version === VERSION) {
                Object.assign(result, storage);
            } else {
                result.save();
            }
        }
        return result;
    }

    save() {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this));
    }

}

const storageHelper = StorageHelper.open();
export default storageHelper;

function jsonProduct(productId, productName, productUnit, productDescription, productDeleted) {
    return {
        'productId': productId,
        'productName': productName,
        'productUnit': productUnit,
        'productDescription': productDescription,
        'productDeleted': productDeleted,
    }
}

function jsonSku(skuId, shipmentId, productId, quantity, pricePerUnit, currency) {
    return {
        'skuId': skuId,
        'shipmentId': shipmentId,
        'productId': productId,
        'quantity': quantity,
        'pricePerUnit': pricePerUnit,
        'currency': currency,
    }
}

function jsonSkuOrigin(skuOriginId, skuId, shipmentId) {
    return {
        'skuOriginId': skuOriginId,
        'skuId': skuId,
        'shipmentId': shipmentId,
    }
}

function jsonShipment(shipmentId, name, shipmentConsignmentNumber, shipmentStatus, shipmentOriginSiteId, shipmentDestinationSiteId, dateOfShipment, dateOfArrival, description, shipmentDltAnchored, shipmentDltProof, shipmentDeleted) {
    return {
        'shipmentId': shipmentId,
        'shipmentName': name,
        'shipmentConsignmentNumber': shipmentConsignmentNumber,
        'shipmentStatus': shipmentStatus,
        'shipmentOriginSiteId': shipmentOriginSiteId,
        'shipmentDestinationSiteId': shipmentDestinationSiteId,
        'shipmentDateOfShipment': dateOfShipment,
        'shipmentDateOfArrival': dateOfArrival,
        'shipmentDescription': description,
        'shipmentDltAnchored': shipmentDltAnchored,
        'shipmentDltProof': shipmentDltProof,
        'shipmentDeleted': shipmentDeleted,
    }
}

function jsonShipmentDocument(shipmentDocumentId, shipmentId, documentUrl) {
    return {
        'shipmentDocumentId': shipmentDocumentId,
        'shipmentId': shipmentId,
        'documentUrl': documentUrl,
    }
}

function jsonSite(siteId, countryId, siteName) {
    return {
        'siteId': siteId,
        'countryId': countryId,
        'siteName': siteName,
    }
}

function jsonCountry(countryId, countryName, countryVat) {
    return {
        'countryId': countryId,
        'countryName': countryName,
        'countryVat': countryVat,
    }
}

function jsonNotification(notificationId, shipmentId, notificationStatus, notificationTime, notificationRead) {
    return {
        'notificationId': notificationId,
        'shipmentId': shipmentId,
        'notificationStatus': notificationStatus,
        'notificationTime': notificationTime,
        'notificationRead': notificationRead,
    }
}

function jsonAccount(accountId, countryId, siteId, email, name) {
    return {
        'accountId': accountId,
        'countryId': countryId,
        'siteId': siteId,
        'email': email,
        'name': name,
        'role': S.NOT_EXISTS,
        'active': S.INT_TRUE,
        'invitation': S.INT_FALSE,
        'registerTimestamp': Date.now(),
        'lastLoginTimestamp': Date.now(),
    }
}
