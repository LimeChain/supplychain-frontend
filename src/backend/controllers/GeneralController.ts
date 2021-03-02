import FetchNotificationsByFilterReq from '../requests/network/requests/FetchNotificationsByFilterReq';
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
}
