import AbsApi from './AbsApi';
import {FetchAllNotificationsReq} from '../network-requests/NotificationApiReq';
import {FetchAllNotificationsRes} from '../network-responses/NotificationApiRes';
import storageHelper from '../helpers/StorageHelper';
import NotificationModel from '../models/NotificationModel';

export default class NotificationApi extends AbsApi {
    fetchNotificationsByFilter(notificationRead: number, from: number, to: number, callback: (notificationModels: NotificationModel[], totalSize: number) => void) {
        this.disableActions();

        setTimeout(() => {
            this.enableActions();

            const req = new FetchAllNotificationsReq();

            const json = {
                notificationJsons: [],
                totalSize: 0
            }

            json.notificationJsons = 
                storageHelper.notificationsJson
                    .filter((notificationJson) => notificationJson.notificationRead === notificationRead)
                    .sort((a, b) => a.notificationTime > b.notificationTime ? 1 : -1);
            
            json.totalSize = json.notificationJsons.length;

            json.notificationJsons = json.notificationJsons.slice(from,to);
           

            const res = new FetchAllNotificationsRes(json);
            
            callback(res.notificationModels, res.totalSize);
        }, 100);
    }

}