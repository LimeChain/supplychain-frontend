import Api from '../api/Api';
import GeneralApi from '../api/general/GeneralApi';
import Logger from '../../utilities/Logger';
import Context from '../../utilities/network/Context';
import ShipmentApi from '../api/shipment/ShipmentApi';
import Response from '../../utilities/network/Response';
import ProductApi from '../api/product/ProductApi';
import AccountApi from '../api/account/AccountApi';
import IntegrationNodeApi from '../api/integration-node/IntegrationNodeApi';

const Config = require('../../../../config/config');

export default class ApiFilter {

    static map: Map<string, Api>;

    static init() {
        ApiFilter.map = new Map();
        ApiFilter.map.set(GeneralApi.URL, new GeneralApi());
        ApiFilter.map.set(ShipmentApi.URL, new ShipmentApi());
        ApiFilter.map.set(ProductApi.URL, new ProductApi());
        ApiFilter.map.set(AccountApi.URL, new AccountApi());
        ApiFilter.map.set(IntegrationNodeApi.URL, new IntegrationNodeApi());
    }

    static async onRequest(context: Context) {
        const api = ApiFilter.map.get(Config.URL.ROOT + context.payload.ctx.URL.pathname);

        if (api === undefined) {
            return null;
        }

        if (Config.Build.DEV === true) {
            Logger.request({
                'path': context.payload.ctx.URL.pathname,
                'body': context.payload.ctx.request.body,
                'session': context.payload.ctx.session,
            });
        }

        context.res = new Response();
        await api.onRequest(context);
        return context.res;
    }

}
