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
};
