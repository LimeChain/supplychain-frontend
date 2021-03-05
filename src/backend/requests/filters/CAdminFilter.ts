import Page from '../pages/Page';
import PageDashboard from '../pages/cadmin/dashboard/PageDashboard';
import PageProducts from '../pages/cadmin/products/PageProducts';
import PageDrafts from '../pages/cadmin/drafts/PageDrafts';
import PageOutgoing from '../pages/cadmin/outgoing/PageOutgoing';
import PageIncomming from '../pages/cadmin/incomming/PageIncomming';
import Context from '../../utilities/network/Context';
import PageProductsInStock from '../pages/cadmin/products-in-stock/PageProductsInStock';

const Config = require('./../../../../config/config');

export default class CAdminFilter {

    static map: Map<string, Page>;

    static init() {
        const pageDashboard = new PageDashboard();
        CAdminFilter.map = new Map();
        CAdminFilter.map.set(Config.URL.CADMIN, pageDashboard);
        CAdminFilter.map.set(PageDashboard.URL, pageDashboard);
        CAdminFilter.map.set(PageProducts.URL, new PageProducts());
        CAdminFilter.map.set(PageProductsInStock.URL, new PageProductsInStock());
        CAdminFilter.map.set(PageDrafts.URL, new PageDrafts());
        CAdminFilter.map.set(PageOutgoing.URL, new PageOutgoing());
        CAdminFilter.map.set(PageIncomming.URL, new PageIncomming());
    }

    static async onRequest(context: Context) {
        const page = CAdminFilter.map.get(Config.URL.ROOT + context.payload.ctx.URL.pathname);
        if (page === undefined) {
            return false;
        }

        await page.onRequest(context);
        return true;
    }

}
