import S from '../utilities/Main';

export default class NotificationModel {
    notificationId: string
    shipmentId: string
    notificationStatus: number
    notificationTime: number
    notificationRead: number

    constructor(){
        this.notificationId = S.Strings.NOT_EXISTS;
        this.shipmentId = S.Strings.NOT_EXISTS;
        this.notificationStatus = S.NOT_EXISTS;
        this.notificationTime = S.NOT_EXISTS;
        this.notificationRead = S.NOT_EXISTS;
    }

    toJson(): any {
        return {
            'notificationId': this.notificationId,
            'shipmentId': this.shipmentId,
            'notificationStatus': this.notificationStatus,
            'notificationTime': this.notificationTime,
            'notificationRead': this.notificationRead,
        }
    }

    static fromJson(json): NotificationModel {
        if (json === null) {
            return null;
        }

        const model = new NotificationModel();

        model.notificationId = (json.notificationId || model.notificationId).toString();
        model.shipmentId = (json.shipmentId || model.shipmentId).toString();
        model.notificationStatus = json.notificationStatus || model.notificationStatus;
        model.notificationTime = json.notificationTime || model.notificationTime;
        model.notificationRead = json.notificationRead || model.notificationRead;

        return model;
    }


}