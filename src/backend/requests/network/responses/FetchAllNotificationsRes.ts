import NotificationModel from '../../../modules/Notification/Model/NotificationModel';
import NotificationModelG from '../../../modules/Notification/Model/NotificationModelG';
import NotificationModelH from '../../../modules/Notification/Model/NotificationModelH';            
            
export default class FetchAllNotificationsRes {

    notificationJsons: NotificationModel[];;
    totalSize: number;

    constructor(notificationModels: NotificationModel[], totalSize: number) {
        this.notificationJsons = [];
        for (let i = 0; i < notificationModels.length; ++i) {
            this.notificationJsons.push(notificationModels[i].toNetwork());
        }
        this.totalSize = totalSize;
    }

}