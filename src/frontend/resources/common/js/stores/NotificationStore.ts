import { makeAutoObservable } from 'mobx';
import NotificationApi from '../api/NotificationApi';
import NotificationModel from '../models/NotificationModel';
import S from '../utilities/Main';


export default class NotificationStore {
    notificationApi: NotificationApi;
    static NOTIFICATION_SHOW_COUNT: number = 4;
    isFetching: boolean = false;
    totalSize: number = 0;
    notificationsMap: Map < string, NotificationModel > = new Map();
    screenNotificationModels: NotificationModel[] = [];

    constructor() {
        makeAutoObservable(this);
        this.notificationApi = new NotificationApi();
    }

    onScreenData(notificationModels: NotificationModel[], totalSize: number){
        this.screenNotificationModels = notificationModels;
        this.totalSize = totalSize;
        this.updateNotificationModels(notificationModels);
    }

    updateNotificationModels(notificationModels: NotificationModel[]){
        const cacheMap = this.notificationsMap;
        this.notificationsMap = null;

        notificationModels.forEach((notificationModel) => {
            cacheMap.set(notificationModel.notificationId, notificationModel);
        });

        this.notificationsMap = cacheMap;
    }

    appendToScreenData(notificationModels: NotificationModel[]){
        notificationModels.forEach((notificationModel) => {
            this.screenNotificationModels.push(notificationModel);
            this.notificationsMap.set(notificationModel.notificationId, notificationModel);
        })
    }

    fetchMoreNotifications(wipe: boolean = false){
        if(this.isFetching){
            return;
        }

        this.isFetching = true;

        const from = wipe === true ? 0 : this.screenNotificationModels.length;
        const to = from + NotificationStore.NOTIFICATION_SHOW_COUNT;

        this.notificationApi.fetchNotificationsByFilter(S.INT_FALSE, from, to, (notificationModels: NotificationModel[], totalSize: number) => {
            this.isFetching = false;

            if (this.totalSize < totalSize){
                this.fetchMoreNotifications(true);
                return;
            }

            if (wipe === true) {
                this.onScreenData(notificationModels, totalSize);
            } else {
                this.appendToScreenData(notificationModels);
            }
        })
    }

}