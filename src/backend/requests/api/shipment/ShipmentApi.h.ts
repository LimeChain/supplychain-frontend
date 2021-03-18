import Api from '../Api';

const Config = require('../../../../../config/config');

export default class ShipmentApiH extends Api {

    static URL: string;
    static Actions: any;

}

ShipmentApiH.URL = `${Config.URL.API}/shipment`;
ShipmentApiH.Actions = {
    CREDIT: 'a',
    FETCH_SHIPMENTS_BY_FILTER: 'b',
    FETCH_SHIPMENT_BY_ID: 'c',
    DOWNLOAD_SHIPMENT_JSON: 'd',
    FETCH_SHIPMENT_WHERE_PRODUCT_LEFT_BY_PRODUCT_ID: 'e',
    FETCH_PRODUCTS_IN_STOCK: 'f',
    FETCH_TOTAL_VALUE_IN_STOCK: 'g',
    UPLOAD_SHIPMENT_DOCUMENT_FILE: 'h',
    FETCH_SHIPMENT_DOCUMENT_FILE: 'i',

};
