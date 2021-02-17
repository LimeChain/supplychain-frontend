import Page from '../../Page';

const Config = require('../../../../../../config/config');

export default class PageDraftsH extends Page {

    static URL: string;
    static TEMPLATE_PATH: string;
}

PageDraftsH.URL = `${Config.URL.CADMIN}/drafts`;
PageDraftsH.TEMPLATE_PATH = `${Config.Path.Root.Frontend.Pages.CADMIN}/page-drafts.marko`;
