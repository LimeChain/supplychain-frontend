import Api from '../Api';

const Config = require('../../../../../config/config');

export default class IntegrationNodeApi extends Api {

    static URL: string;
    static Actions: any;

}

IntegrationNodeApi.URL = `${Config.URL.API}/integration-node`;
IntegrationNodeApi.Actions = {
    CREDIT_SHIPMENT: 'a',
    CREDIT_PRODUCT: 'b',
};
