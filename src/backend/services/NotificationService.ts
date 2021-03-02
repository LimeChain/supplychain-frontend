import NotificationModel from '../modules/Notification/Model/NotificationModel';
import NotificationRepo from '../modules/Notification/Repo/NotificationRepo';
import SV from '../utilities/SV';
import Service from './common/Service';

export default class NotificationService extends Service {

    notificationRepo: NotificationRepo = this.repoFactory.getNotificationRepo();

    createNotification(shipmentId: number, notificationStatus: number) {

        const notificationModel = new NotificationModel();

        notificationModel.shipmentId = shipmentId;
        notificationModel.notificationStatus = notificationStatus;
        notificationModel.notificationTime = Date.now();
        notificationModel.notificationRead = SV.FALSE;

        notificationModel.notificationId = (await this.notificationRepo.save(notificationModel).notificationId;

    }
}
