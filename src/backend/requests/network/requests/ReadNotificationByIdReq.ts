import Payload from '../../../utilities/network/Payload';
import NotificationModel from '../../../modules/Notification/Model/NotificationModel';
import NotificationModelG from '../../../modules/Notification/Model/NotificationModelG';
import NotificationModelH from '../../../modules/Notification/Model/NotificationModelH';
            
export default class ReadNotificationByIdReq {
    
    notificationModel: NotificationModel;

    constructor(payload: Payload) {
        const json = payload.params;
        this.notificationModel = NotificationModel.fromNetwork(json.notificationJson);
    }

}