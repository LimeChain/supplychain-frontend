import Page from '../../Page';

const Config = require('../../../../../../config/config');

export default class PageLoginH extends Page {

    static URL: string;
    static TEMPLATE_PATH: string;
}

PageLoginH.URL = `${Config.URL.GENERAL}/login`;
PageLoginH.TEMPLATE_PATH = `${Config.Path.Root.Frontend.Pages.GENERAL}/page-login.marko`;
