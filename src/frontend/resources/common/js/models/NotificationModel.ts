import S from '../utilities/Main';
import { makeAutoObservable } from 'mobx';

export default class NotificationModel {
    notificationId: string
    shipmentId: string
    notificationStatus: number
    notificationTime: number
    notificationRead: number

    constructor() {
        this.notificationId = S.Strings.NOT_EXISTS;
        this.shipmentId = S.Strings.NOT_EXISTS;
        this.notificationStatus = S.NOT_EXISTS;
        this.notificationTime = 0;
        this.notificationRead = S.INT_FALSE;

        makeAutoObservable(this);
    }

    static newInstance(shipmentId: string, notificationStatus: number): NotificationModel {
        const notificationModel = new NotificationModel();
        notificationModel.shipmentId = shipmentId;
        notificationModel.notificationStatus = notificationStatus;
        notificationModel.notificationTime = Date.now();
        notificationModel.notificationRead = S.INT_FALSE;

        return notificationModel;
    }

    isRead() {
        return this.notificationRead === S.INT_TRUE;
    }

    markAsRead() {
        this.notificationRead = S.INT_TRUE;
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
