import Api from '../Api';

const Config = require('../../../../../config/config');

export default class ProductApiH extends Api {

    static URL: string;
    static Actions: any;

}

ProductApiH.URL = `${Config.URL.API}/product`;
ProductApiH.Actions = {
    CREDIT_PRODUCT: 'a',
};
