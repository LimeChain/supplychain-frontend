import Page from '../pages/Page';
import PageNotFound from '../pages/general/not-found/PageNotFound';
import Context from '../../utilities/network/Context';

const Config = require('./../../../../config/config');

export default class GeneralFilter {

    static map: Map<string, Page>;

    static init() {
        GeneralFilter.map = new Map();
        GeneralFilter.map.set(PageNotFound.URL, new PageNotFound());
    }

    static async onRequest(context: Context) {
        const page = GeneralFilter.map.get(Config.URL.ROOT + context.payload.ctx.URL.pathname);
        if (page === undefined) {
            (new PageNotFound()).onRequest(context);
            return false;
        }

        await page.onRequest(context);
        return true;
    }

}
