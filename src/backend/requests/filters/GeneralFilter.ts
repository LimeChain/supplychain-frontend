import Page from '../pages/Page';
import PageNotFound from '../pages/general/not-found/PageNotFound';
import Payload from '../../utilities/helpers/Payload';
import Session from '../../utilities/Session';
import Database from '../../utilities/database/Database';
import PageDashboard from '../pages/cadmin/dashboard/PageDashboard';

const Config = require('./../../../../config/config');

export default class GeneralFilter {

    static map: Map < string, Page >;

    static init() {
        GeneralFilter.map = new Map();
        GeneralFilter.map.set(PageNotFound.URL, new PageNotFound());
    }

    static async onRequest(payload: Payload, session: Session, db: Database) {
        const page = GeneralFilter.map.get(Config.URL.ROOT + payload.ctx.URL.pathname);
        if (page === undefined) {
            (new PageNotFound()).onRequest(payload, session, db);
            return false;
        }

        await page.onRequest(payload, session, db);
        return true;
    }

}
