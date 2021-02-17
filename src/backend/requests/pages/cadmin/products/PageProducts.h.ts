import Page from '../../Page';

const Config = require('../../../../../../config/config');

export default class PageProductsH extends Page {

    static URL: string;
    static TEMPLATE_PATH: string;
}

PageProductsH.URL = `${Config.URL.CADMIN}/products`;
PageProductsH.TEMPLATE_PATH = `${Config.Path.Root.Frontend.Pages.CADMIN}/page-products.marko`;
