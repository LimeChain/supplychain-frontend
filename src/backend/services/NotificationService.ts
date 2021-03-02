import NotificationModel from '../modules/Notification/Model/NotificationModel';
import NotificationModelH from '../modules/Notification/Model/NotificationModelH';
import NotificationRepo from '../modules/Notification/Repo/NotificationRepo';
import DatabaseWhere from '../utilities/database/DatabaseWhere';
import DatabaseWhereClause from '../utilities/database/DatabaseWhereClause';
import SV from '../utilities/SV';
import Service from './common/Service';

export default class NotificationService extends Service {

    notificationRepo: NotificationRepo = this.repoFactory.getNotificationRepo();

    async createNotification(shipmentId: number, notificationStatus: number) {

        const notificationModel = new NotificationModel();

        notificationModel.shipmentId = shipmentId;
        notificationModel.notificationStatus = notificationStatus;
        notificationModel.notificationTime = Date.now();
        notificationModel.notificationRead = SV.FALSE;

        notificationModel.notificationId = (await this.notificationRepo.save(notificationModel)).notificationId;

    }

    async fetchNotificationsByFilter(notificationReadFilter: number, from: number, to: number): Promise<{ notificationModels: NotificationModel[], totalSize: number }> {
        const databaseWhere = new DatabaseWhere();
        databaseWhere.clause(new DatabaseWhereClause(NotificationModelH.P_NOTIFICATION_READ, '=', notificationReadFilter));

        const notificationModels = await this.notificationRepo.fetch(databaseWhere);

        return { notificationModels: notificationModels.slice(from, to), totalSize: notificationModels.length };
    }
}
