import Page from '../../Page';

const Config = require('../../../../../../config/config');

export default class PageIncommingH extends Page {

    static URL: string;
    static TEMPLATE_PATH: string;
}

PageIncommingH.URL = `${Config.URL.CADMIN}/incoming`;
PageIncommingH.TEMPLATE_PATH = `${Config.Path.Root.Frontend.Pages.CADMIN}/page-incomming.marko`;
