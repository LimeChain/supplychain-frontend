import NotificationModel from '../../../modules/Notification/Model/NotificationModel';
import NotificationModelG from '../../../modules/Notification/Model/NotificationModelG';
import NotificationModelH from '../../../modules/Notification/Model/NotificationModelH';            
            
export default class ReadNotificationByIdRes {

    notificationJson: NotificationModel;

    constructor(notificationModel: NotificationModel) {
        this.notificationJson = notificationModel === null ? null : notificationModel.toNetwork();
    }

}