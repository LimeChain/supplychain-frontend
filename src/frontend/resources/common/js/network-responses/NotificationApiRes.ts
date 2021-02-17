import NotificationModel from "../models/NotificationModel";

export class FetchAllNotificationsRes {

    notificationModels: NotificationModel[];
    totalSize: number;

    constructor(json) {
        this.notificationModels = new Array<NotificationModel>();
        this.totalSize = json.totalSize;

        for(let notificationJson of json.notificationJsons){
            this.notificationModels.push(NotificationModel.fromJson(notificationJson));
        }
    }

}