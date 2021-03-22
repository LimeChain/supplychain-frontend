import Api from '../Api';

const Config = require('../../../../../config/config');

export default class IntegrationNodeApiH extends Api {

    static URL: string;
    static Actions: any;

}

IntegrationNodeApiH.URL = `${Config.URL.API}/integration-node`;
IntegrationNodeApiH.Actions = {
    CREDIT_SHIPMENT: 'a',
    CREDIT_PRODUCT: 'b',
};
