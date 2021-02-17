import Page from '../../Page';

const Config = require('../../../../../../config/config');

export default class PageOutgoingH extends Page {

    static URL: string;
    static TEMPLATE_PATH: string;
}

PageOutgoingH.URL = `${Config.URL.CADMIN}/outgoing`;
PageOutgoingH.TEMPLATE_PATH = `${Config.Path.Root.Frontend.Pages.CADMIN}/page-outgoing.marko`;
