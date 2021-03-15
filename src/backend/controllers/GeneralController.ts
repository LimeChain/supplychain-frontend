import FetchAllSitesReq from '../requests/network/requests/FetchAllSitesReq';
import FetchNotificationsByFilterReq from '../requests/network/requests/FetchNotificationsByFilterReq';
import FetchAllSitesRes from '../requests/network/responses/FetchAllSitesRes';
import FetchNotificationsByFilterRes from '../requests/network/responses/FetchNotificationsByFilterRes';
import Context from '../utilities/network/Context';

export default class GeneralController {

    async login(context: Context) {
        context.res.obj = 2;
    }

    async fetchNotificationsByFilter(context: Context) {

        const servicesFactory = context.servicesFactory;
        const payload = context.payload;

        const req = new FetchNotificationsByFilterReq(payload);

        const notificationService = servicesFactory.getNotificationService();
        const { notificationModels, totalSize } = await notificationService.fetchNotificationsByFilter(req.notificationReadFilter, req.from, req.to);

        context.res.set(new FetchNotificationsByFilterRes(notificationModels, totalSize));
    }

    async fetchAllSites(context: Context) {
        const servicesFactory = context.servicesFactory;
        const payload = context.payload;

        const req = new FetchAllSitesReq(payload);
        const generalService = servicesFactory.getGeneralService();
        const siteModels = await generalService.fetchSites();
        const countryModels = await generalService.fetchCountries();
        
        const res = new FetchAllSitesRes(siteModels, countryModels);
        context.res.set(res);
    }

}
