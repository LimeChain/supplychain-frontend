import ProductUnitModelH from "../../../../../backend/modules/product-group-module/product-module/ProductUnitModel.h";
import CurrencyModelH from "../../../../../backend/modules/product-group-module/product-module/CurrencyModel.h"
import ShipmentStatusModelH from "../../../../../backend/modules//product-group-module/shipment-module/ShipmentStatusModel.h";
import NotificationStatusModelH from "../../../../../backend/modules/product-group-module/shipment-module/NotificationStatusModel.h";
import S from '../utilities/Main';

const LOCAL_STORAGE_KEY = 'hedera_storage';
const VERSION = 32;

const productsJson = [
    jsonProduct('1', 'Chair', ProductUnitModelH.S_UNIT_PACK, 'Simple wooden chair', S.INT_FALSE),
    jsonProduct('2', 'Table', ProductUnitModelH.S_UNIT_PACK, 'Simple wooden table', S.INT_FALSE),
    jsonProduct('3', 'Machine', ProductUnitModelH.S_UNIT_PACK, 'Drilling machine', S.INT_FALSE),
    jsonProduct('4', 'Gold', ProductUnitModelH.S_UNIT_PACK, 'Gold reserve', S.INT_FALSE),
]

const skusJson = [
    jsonSku('1', '1', 30, 20, CurrencyModelH.S_CURRENCY_EUR),
    jsonSku('2', '2', 10, 420, CurrencyModelH.S_CURRENCY_EUR),
    jsonSku('3', '3', 36, 10, CurrencyModelH.S_CURRENCY_USD),
    jsonSku('4', '4', 3345, 20, CurrencyModelH.S_CURRENCY_EUR),
    jsonSku('5', '1', 30, 20, CurrencyModelH.S_CURRENCY_USD),
    jsonSku('6', '3', 30, 20, CurrencyModelH.S_CURRENCY_USD),
    jsonSku('7', '2', 30, 20, CurrencyModelH.S_CURRENCY_EUR),
]

const skuOriginsJson = [
    jsonSkuOrigin('1', '1', '1'),
]

const shipmentsJson = [
    jsonShipment('1', 'Chairs to Germany', ShipmentStatusModelH.S_STATUS_DRAFT, '1', '3', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    jsonShipment('2', 'Chairs to Germany2', ShipmentStatusModelH.S_STATUS_DRAFT, '1', '3', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    jsonShipment('3', 'Chairs to Germany3', ShipmentStatusModelH.S_STATUS_DRAFT, '1', '3', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    jsonShipment('4', 'Tables to Malta', ShipmentStatusModelH.S_STATUS_RECEIVED, '2', '1', Date.now(), Date.now()+1000, 1, 1, S.INT_FALSE),
    jsonShipment('5', 'Tables to Malta', ShipmentStatusModelH.S_STATUS_RECEIVED, '2', '1', Date.now(), Date.now()+1000, 1, 1, S.INT_FALSE),
    jsonShipment('6', 'Tables to Malta', ShipmentStatusModelH.S_STATUS_RECEIVED, '2', '1', Date.now(), Date.now()+1000, 1, 1, S.INT_FALSE),
    jsonShipment('7', 'Machines to Greece', ShipmentStatusModelH.S_STATUS_RECEIVED, '3', '2', Date.now(), Date.now()+1000, 1, 1, S.INT_FALSE),
    jsonShipment('8', 'Gold from Germany', ShipmentStatusModelH.S_STATUS_IN_TRANSIT, '3', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    jsonShipment('9', 'Gold from Germany', ShipmentStatusModelH.S_STATUS_IN_TRANSIT, '3', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    jsonShipment('10', 'Gold from Germany', ShipmentStatusModelH.S_STATUS_IN_TRANSIT, '3', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    jsonShipment('11', 'Gold from Germany', ShipmentStatusModelH.S_STATUS_IN_TRANSIT, '3', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    jsonShipment('12', 'Gold from Germany', ShipmentStatusModelH.S_STATUS_IN_TRANSIT, '3', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),
    jsonShipment('13', 'Gold from Germany', ShipmentStatusModelH.S_STATUS_IN_TRANSIT, '3', '1', Date.now(), S.NOT_EXISTS, 1, 1, S.INT_FALSE),


]

const shipmentDocumentsJson = [
    jsonShipmentDocument('1', '1', 'localhost/documents/aaa.pdf')
]

const countriesJson = [
    jsonCountry('1', 'Malta', 0.18),
    jsonCountry('2', 'Greece', 0.23),
    jsonCountry('3', 'Germany', 0.19),
]

const sitesJson = [
    jsonSite('1','3', 'Berlin'),
    jsonSite('2','2', 'Thessaloniki'),
    jsonSite('3','1', 'Valletta'),
]

const notificationsJson = [
    jsonNotification('1', '1', NotificationStatusModelH.S_NOTIFICATION_SENT, Date.now() - 500000, S.INT_FALSE),
    jsonNotification('2', '1', NotificationStatusModelH.S_NOTIFICATION_RECEIVED, Date.now() - 400000, S.INT_FALSE),
    jsonNotification('3', '2', NotificationStatusModelH.S_NOTIFICATION_SENT, Date.now() - 300000, S.INT_FALSE),
    jsonNotification('4', '2', NotificationStatusModelH.S_NOTIFICATION_RECEIVED, Date.now() - 600000, S.INT_FALSE),
    jsonNotification('5', '3', NotificationStatusModelH.S_NOTIFICATION_SENT, Date.now() - 100000, S.INT_FALSE),
    jsonNotification('6', '3', NotificationStatusModelH.S_NOTIFICATION_RECEIVED, Date.now() - 200000, S.INT_FALSE),
    jsonNotification('7', '4', NotificationStatusModelH.S_NOTIFICATION_SENT, Date.now() - 20000, S.INT_FALSE),
    jsonNotification('8', '4', NotificationStatusModelH.S_NOTIFICATION_RECEIVED, Date.now() - 422000, S.INT_FALSE),
]

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
    }

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

function jsonAccount(accountId, email) {
    return {
        'accountId': accountId,
        'email': email,
    };
}

function jsonProduct(productId, productName, productUnit, productDescription, productDeleted){
    return {
            'productId': productId,
            'productName': productName,
            'productUnit': productUnit,
            'productDescription': productDescription,
            'productDeleted': productDeleted,
    }
}

function jsonSku( skuId, skuProductId, skuQuantity, skuPricePerUnit, skuCurrency) {
    return {
        'skuId': skuId,
        'skuProductId': skuProductId,
        'skuQuantity': skuQuantity,
        'skuPricePerUnit': skuPricePerUnit,
        'skuCurrency': skuCurrency,
    }
}

function jsonSkuOrigin( skuOriginId, skuId, shipmentId){
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
        'shipmentStatus': status,
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

function jsonShipmentDocument(shipmentDocumentId, shipmentId, documentUrl){
    return {
        'shipmentDocumentId': shipmentDocumentId,
        'shipmentId': shipmentId,
        'documentUrl': documentUrl
    }
}

function jsonSite(siteId, countryId, siteName){
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

function jsonNotification(notificationId, shipmentId, notificationStatus, notificationTime, notificationRead){
    return {
        'notificationId': notificationId,
        'shipmentId': shipmentId,
        'notificationStatus': notificationStatus,
        'notificationTime': notificationTime,
        'notificationRead': notificationRead,
    }
}