import NotificationModel from '../../../modules/Notification/Model/NotificationModel';
import NotificationModelG from '../../../modules/Notification/Model/NotificationModelG';
import NotificationModelH from '../../../modules/Notification/Model/NotificationModelH';            
            
export default class FetchNotificationsByFilterRes {

    notificationJsons: NotificationModel[];;
    totalSize: number;
    unreadCount: number;

    constructor(notificationModels: NotificationModel[], totalSize: number, unreadCount: number) {
        this.notificationJsons = [];
        for (let i = 0; i < notificationModels.length; ++i) {
            this.notificationJsons.push(notificationModels[i].toNetwork());
        }
        this.totalSize = totalSize;
        this.unreadCount = unreadCount;
    }

}