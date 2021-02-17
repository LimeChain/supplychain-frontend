import Page from '../pages/Page';
import PageDashboard from '../pages/cadmin/dashboard/PageDashboard';
import PageProducts from '../pages/cadmin/products/PageProducts';
import PageDrafts from '../pages/cadmin/drafts/PageDrafts';
import PageOutgoing from '../pages/cadmin/outgoing/PageOutgoing';
import PageIncomming from '../pages/cadmin/incomming/PageIncomming';
import Payload from '../../utilities/helpers/Payload';
import Session from '../../utilities/Session';
import Database from '../../utilities/Database';

const Config = require('./../../../../config/config');

export default class CAdminFilter {

    static map: Map < string, Page >;

    static init() {
        CAdminFilter.map = new Map();
        CAdminFilter.map.set(Config.URL.ROOT, new PageDashboard());
        CAdminFilter.map.set(PageDashboard.URL, new PageDashboard());
        CAdminFilter.map.set(PageProducts.URL, new PageProducts());
        CAdminFilter.map.set(PageDrafts.URL, new PageDrafts());
        CAdminFilter.map.set(PageOutgoing.URL, new PageOutgoing());
        CAdminFilter.map.set(PageIncomming.URL, new PageIncomming());
    }

    static async onRequest(payload: Payload, session: Session, db: Database) {
        const page = CAdminFilter.map.get(Config.URL.ROOT + payload.ctx.URL.pathname);
        if (page === undefined) {
            return false;
        }

        await page.onRequest(payload, session, db);
        return true;
    }

}
