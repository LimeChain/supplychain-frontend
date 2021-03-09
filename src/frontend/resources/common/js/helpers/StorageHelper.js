import S from '../utilities/Main';
import ProductConstsH from '../../../../../../builds/dev-generated/ProductModule/Product/ProductModelHConsts';
import SkuConstsH from '../../../../../../builds/dev-generated/ProductModule/Sku/SkuModelHConsts';
import ShipmentDocumentConstsH from '../../../../../../builds/dev-generated/ShipmentModule/ShipmentDocument/ShipmentDocumentModelHConsts';
import ShipmentConstsH from '../../../../../../builds/dev-generated/ShipmentModule/Shipment/ShipmentModelHConsts';

import NotificationConstsH from '../../../../../../builds/dev-generated/Notification/NotificationModelHConsts';
import CountryModel from '../models/CountryModel';
import SiteModel from '../models/SiteModel';

const LOCAL_STORAGE_KEY = 'hedera_storage';
const VERSION = 42;

const productsJson = [
    jsonProduct('1', 'Chair', ProductConstsH.S_UNIT_PACK, 'Simple wooden chair', S.INT_FALSE),
    jsonProduct('2', 'Table', ProductConstsH.S_UNIT_PACK, 'Simple wooden table', S.INT_FALSE),
    jsonProduct('3', 'Machine', ProductConstsH.S_UNIT_PACK, 'Drilling machine', S.INT_FALSE),
    jsonProduct('4', 'Gold', ProductConstsH.S_UNIT_PACK, 'Gold reserve', S.INT_FALSE),
]

const skusJson = [
    jsonSku('1', '1', 30, 20, SkuConstsH.S_CURRENCY_EUR),
    jsonSku('2', '2', 10, 420, SkuConstsH.S_CURRENCY_EUR),
    jsonSku('3', '3', 36, 10, SkuConstsH.S_CURRENCY_USD),
    jsonSku('4', '4', 3345, 20, SkuConstsH.S_CURRENCY_EUR),
    jsonSku('5', '1', 30, 20, SkuConstsH.S_CURRENCY_USD),
    jsonSku('6', '3', 30, 20, SkuConstsH.S_CURRENCY_USD),
    jsonSku('7', '2', 30, 20, SkuConstsH.S_CURRENCY_EUR),
]

const skuOriginsJson = [
    jsonSkuOrigin('1', '1', '1'),
]

const shipmentsJson = [
    jsonShipment('1', 'Chairs to Germany', ShipmentConstsH.S_STATUS_DRAFT, '1', '2', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    jsonShipment('2', 'Chairs to Germany2', ShipmentConstsH.S_STATUS_DRAFT, '1', '2', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    jsonShipment('3', 'Chairs to Germany3', ShipmentConstsH.S_STATUS_DRAFT, '1', '2', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    jsonShipment('4', 'Tables to Malta', ShipmentConstsH.S_STATUS_RECEIVED, '2', '1', Date.now(), Date.now() + 1000, 1, 1, S.INT_FALSE),
    jsonShipment('5', 'Tables to Malta', ShipmentConstsH.S_STATUS_RECEIVED, '2', '1', Date.now(), Date.now() + 1000, 1, 1, S.INT_FALSE),
    jsonShipment('6', 'Tables to Malta', ShipmentConstsH.S_STATUS_RECEIVED, '2', '1', Date.now(), Date.now() + 1000, 1, 1, S.INT_FALSE),
    jsonShipment('8', 'Gold from Germany', ShipmentConstsH.S_STATUS_IN_TRANSIT, '2', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    jsonShipment('9', 'Gold from Germany', ShipmentConstsH.S_STATUS_IN_TRANSIT, '2', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    jsonShipment('10', 'Gold from Germany', ShipmentConstsH.S_STATUS_IN_TRANSIT, '2', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    jsonShipment('11', 'Gold from Germany', ShipmentConstsH.S_STATUS_IN_TRANSIT, '2', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    jsonShipment('12', 'Gold from Germany', ShipmentConstsH.S_STATUS_IN_TRANSIT, '2', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    jsonShipment('13', 'Gold from Germany', ShipmentConstsH.S_STATUS_IN_TRANSIT, '2', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),

]

const shipmentDocumentsJson = [
    jsonShipmentDocument('1', '1', 'localhost/documents/aaa.pdf'),
]

const countriesJson = [
    jsonCountry('1', 'Germany', 0.19),
    jsonCountry('2', 'Netherlands', 0.18),
]

const sitesJson = [
    jsonSite(SiteModel.ID_BERLIN, CountryModel.ID_GERMANY, 'Berlin'),
    jsonSite(SiteModel.ID_ROTHERDAM, CountryModel.ID_NETHERLANDS, 'Rotherdam'),
]

const notificationsJson = [
    jsonNotification('1', '1', NotificationConstsH.S_NOTIFICATION_SENT, Date.now() - 500000, S.INT_FALSE),
    jsonNotification('2', '1', NotificationConstsH.S_NOTIFICATION_RECEIVED, Date.now() - 400000, S.INT_FALSE),
    jsonNotification('3', '2', NotificationConstsH.S_NOTIFICATION_SENT, Date.now() - 300000, S.INT_FALSE),
    jsonNotification('4', '2', NotificationConstsH.S_NOTIFICATION_RECEIVED, Date.now() - 600000, S.INT_FALSE),
    jsonNotification('5', '3', NotificationConstsH.S_NOTIFICATION_SENT, Date.now() - 100000, S.INT_FALSE),
    jsonNotification('6', '3', NotificationConstsH.S_NOTIFICATION_RECEIVED, Date.now() - 200000, S.INT_FALSE),
    jsonNotification('7', '4', NotificationConstsH.S_NOTIFICATION_SENT, Date.now() - 20000, S.INT_FALSE),
    jsonNotification('8', '4', NotificationConstsH.S_NOTIFICATION_RECEIVED, Date.now() - 422000, S.INT_FALSE),
]

const accountsJson = [
    jsonAccount('1', CountryModel.ID_GERMANY, SiteModel.ID_BERLIN, 'germany@pwc.com', 'Germany'),
    jsonAccount('2', CountryModel.ID_NETHERLANDS, SiteModel.ID_ROTHERDAM, 'netherlands@pwc.com', 'Netherlands'),
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

function jsonSku(skuId, skuProductId, skuQuantity, skuPricePerUnit, skuCurrency) {
    return {
        'skuId': skuId,
        'skuProductId': skuProductId,
        'skuQuantity': skuQuantity,
        'skuPricePerUnit': skuPricePerUnit,
        'skuCurrency': skuCurrency,
    }
}

function jsonSkuOrigin(skuOriginId, skuId, shipmentId) {
    return {
        'skuOriginId': skuOriginId,
        'skuId': skuId,
        'shipmentId': shipmentId,
    }
}

function jsonShipment(shipmentId, name, status, shipmentOriginSiteId, shipmentDestinationSiteId, dateOfShipment, dateOfArrival, description, shipmentDltAnchored, shipmentDltProof, shipmentDeleted) {
    return {
        'shipmentId': shipmentId,
        'shipmentName': name,
        'status': status,
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
