import { makeAutoObservable } from 'mobx';
import GeneralApi from '../api/GeneralApi';
import NotificationModel from '../models/NotificationModel';
import S from '../utilities/Main';

export default class NotificationStore {
    generalApi: GeneralApi;
    static NOTIFICATION_SHOW_COUNT: number = 4;
    isFetching: boolean = false;
    hasMore: boolean = true;
    totalSize: number = 0;
    notificationsMap: Map<string, NotificationModel> = new Map();
    screenNotificationModels: NotificationModel[] = [];

    constructor(appStore, alertStore) {
        makeAutoObservable(this);
        this.generalApi = new GeneralApi(appStore.enableActions, appStore.disableActions, alertStore.show);
    }

    onScreenData(notificationModels: NotificationModel[], totalSize: number) {
        this.screenNotificationModels = notificationModels;
        this.totalSize = totalSize;
        this.updateNotificationModels(notificationModels);
    }

    updateNotificationModels(notificationModels: NotificationModel[]) {
        const cacheMap = this.notificationsMap;
        this.notificationsMap = null;

        notificationModels.forEach((notificationModel) => {
            cacheMap.set(notificationModel.notificationId, notificationModel);
        });

        this.notificationsMap = cacheMap;
    }

    appendToScreenData(notificationModels: NotificationModel[]) {
        notificationModels.forEach((notificationModel) => {
            this.screenNotificationModels.push(notificationModel);
            this.notificationsMap.set(notificationModel.notificationId, notificationModel);
        })
    }

    fetchMoreNotifications(wipe: boolean = false) {
        if (this.isFetching) {
            return;
        }

        this.isFetching = true;

        const from = wipe === true ? 0 : this.screenNotificationModels.length;
        const to = from + NotificationStore.NOTIFICATION_SHOW_COUNT;

        this.generalApi.fetchNotificationsByFilter(S.INT_FALSE, from, to, (notificationModels: NotificationModel[], totalSize: number) => {
            this.isFetching = false;

            this.hasMore = !(this.screenNotificationModels.length === totalSize)

            if (this.totalSize < totalSize && from > 0) {
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
