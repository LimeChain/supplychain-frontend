import Page from '../../Page';

const Config = require('../../../../../../config/config');

export default class PageProductsInStockH extends Page {

    static URL: string;
    static TEMPLATE_PATH: string;
}

PageProductsInStockH.URL = `${Config.URL.CADMIN}/products_in_stock`;
PageProductsInStockH.TEMPLATE_PATH = `${Config.Path.Root.Frontend.Pages.CADMIN}/page-products-in-stock.marko`;
