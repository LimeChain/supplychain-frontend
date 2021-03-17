import NotificationModel from '../modules/Notification/Model/NotificationModel';
import NotificationModelH from '../modules/Notification/Model/NotificationModelH';
import NotificationRepo from '../modules/Notification/Repo/NotificationRepo';
import DatabaseWhere from '../utilities/database/DatabaseWhere';
import DatabaseWhereClause from '../utilities/database/DatabaseWhereClause';
import SV from '../utilities/SV';
import Service from './common/Service';

export default class NotificationService extends Service {

    notificationRepo: NotificationRepo = this.repoFactory.getNotificationRepo();

    async createNotification(shipmentId: number, notificationStatus: number): Promise<NotificationModel> {

        const notificationModel = new NotificationModel();

        notificationModel.shipmentId = shipmentId;
        notificationModel.notificationStatus = notificationStatus;
        notificationModel.notificationTime = Date.now();
        notificationModel.notificationRead = SV.FALSE;

        notificationModel.notificationId = (await this.notificationRepo.save(notificationModel)).notificationId;

        return notificationModel;
    }

    async readNotificationById(reqNotificationModel: NotificationModel): Promise<NotificationModel> {
        const notificationModel = await this.notificationRepo.fetchByPrimaryValue(reqNotificationModel.notificationId);

        notificationModel.notificationRead = SV.TRUE;

        notificationModel.notificationRead = (await this.notificationRepo.save(notificationModel)).notificationRead;

        return notificationModel;
    }

    async readAllNotifications() {
        const unreadNotDbWhere = new DatabaseWhere();
        unreadNotDbWhere.clause(new DatabaseWhereClause(NotificationModelH.P_NOTIFICATION_READ, '=', SV.FALSE));

        await this.notificationRepo.readAllNotifications();
    }

    async fetchNotificationsByFilter(notificationReadFilter: number, from: number, to: number): Promise<{ notificationModels: NotificationModel[], totalSize: number, unreadCount: number }> {
        const databaseWhere = new DatabaseWhere();

        if (!isNaN(notificationReadFilter)) {
            databaseWhere.clause(new DatabaseWhereClause(NotificationModelH.P_NOTIFICATION_READ, '=', notificationReadFilter));
        }

        databaseWhere.orderColumn = NotificationModel.P_NOTIFICATION_TIME;
        databaseWhere.orderType = DatabaseWhere.ORDER_DIRECTION_DESC;
        const notificationModels = await this.notificationRepo.fetch(databaseWhere);

        let unreadCount = 0;

        notificationModels.forEach((n) => {
            if (n.notificationRead === SV.FALSE) {
                unreadCount++;
            }
        })

        return { notificationModels: notificationModels.slice(from, to), totalSize: notificationModels.length, unreadCount };
    }
}
