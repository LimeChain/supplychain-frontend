import FetchAllSitesReq from '../requests/network/requests/FetchAllSitesReq';
import FetchNotificationsByFilterReq from '../requests/network/requests/FetchNotificationsByFilterReq';
import ReadAllNotificationsReq from '../requests/network/requests/ReadAllNotificationsReq';
import ReadNotificationByIdReq from '../requests/network/requests/ReadNotificationByIdReq';
import FetchAllSitesRes from '../requests/network/responses/FetchAllSitesRes';
import FetchNotificationsByFilterRes from '../requests/network/responses/FetchNotificationsByFilterRes';
import ReadAllNotificationsRes from '../requests/network/responses/ReadAllNotificationsRes';
import ReadNotificationByIdRes from '../requests/network/responses/ReadNotificationByIdRes';
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
        const { notificationModels, totalSize, unreadCount } = await notificationService.fetchNotificationsByFilter(req.notificationReadFilter, req.from, req.to);

        context.res.set(new FetchNotificationsByFilterRes(notificationModels, totalSize, unreadCount));
    }

    async readNotificationById(context: Context) {
        const servicesFactory = context.servicesFactory;
        const payload = context.payload;

        const req = new ReadNotificationByIdReq(payload);

        const notificationService = servicesFactory.getNotificationService();
        const notificationModel = await notificationService.readNotificationById(req.notificationModel);

        context.res.set(new ReadNotificationByIdRes(notificationModel));
    }

    async readAllNotifications(context: Context) {
        const servicesFactory = context.servicesFactory;
        const payload = context.payload;

        const req = new ReadAllNotificationsReq(payload);

        const notificationService = servicesFactory.getNotificationService();
        await notificationService.readAllNotifications();

        context.res.set(new ReadAllNotificationsRes())
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
