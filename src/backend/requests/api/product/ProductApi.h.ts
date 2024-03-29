import Api from '../Api';

const Config = require('../../../../../config/config');

export default class ProductApiH extends Api {

    static URL: string;
    static Actions: any;

}

ProductApiH.URL = `${Config.URL.API}/product`;
ProductApiH.Actions = {
    CREDIT_PRODUCT: 'a',
    FETCH_PRODUCTS_BY_FILTER: 'b',
    FETCH_PRODUCT_BY_ID: 'c',
};
