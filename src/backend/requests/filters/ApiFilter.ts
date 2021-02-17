import Api from '../api/Api';
import GeneralApi from '../api/general/GeneralApi';
import Session from '../../utilities/Session';
import Database from '../../utilities/Database';
import Logger from '../../utilities/Logger';
import Response from '../network-response/Response';
import Payload from '../../utilities/helpers/Payload';

const Config = require('../../../../config/config');

export default class ApiFilter {

    static map: Map < string, Api >;

    static init() {
        ApiFilter.map = new Map();
        ApiFilter.map.set(GeneralApi.URL, new GeneralApi());
    }

    static async onRequest(payload: Payload, session: Session, db: Database) {
        const api = ApiFilter.map.get(Config.URL.ROOT + payload.ctx.URL.pathname);

        if (api === undefined) {
            return null;
        }

        if (Config.Build.DEV === true) {
            Logger.request({
                'path': payload.ctx.URL.pathname,
                'body': payload.ctx.request.body,
                'session': payload.ctx.session,
            });
        }

        const res = new Response();
        await api.onRequest(payload, res, session, db);
        return res;
    }

}
