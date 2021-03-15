import AbsApi from './AbsApi';
import storageHelper from '../helpers/StorageHelper';
import NotificationModel from '../models/NotificationModel';
import { FetchAllSitesReq, FetchNotificationsByFilterReq, ReadAllNotificationsReq, ReadNotificationByIdReq } from '../network-requests/GeneralApiReq';
import { FetchAllSitesRes, FetchNotificationsByFilterRes, ReadAllNotificationsRes, ReadNotificationByIdRes } from '../network-responses/GeneralApiRes';
import SiteModel from '../models/SiteModel';
import CountryModel from '../models/CountryModel';
import Api from '../utilities/Api';
import Actions from '../../../../../../builds/dev-generated/Actions';
import ResponseConsts from '../../../../../../builds/dev-generated/utilities/network/ResponseConsts';
import Apis from '../../../../../../builds/dev-generated/Apis';
import S from '../utilities/Main';

export default class GeneralApi extends AbsApi {

    generalApi: Api

    constructor(enableActions: null | (() => void) = null, disableActions: null | (() => void) = null, showAlert: null | ((msg: string, positiveListener?: null | (() => boolean | void), negativeListener?: null | (() => boolean | void)) => void) = null) {
        super(enableActions, disableActions, showAlert);
        this.generalApi = new Api(Apis.GENERAL, this.enableActions, this.disableActions);
    }

    fetchNotificationsByFilter(notificationRead: number, from: number, to: number, callback: (notificationModels: NotificationModel[], totalSize: number, hasUnread: number) => void) {
        this.disableActions();

        setTimeout(() => {
            this.enableActions();

            const req = new FetchNotificationsByFilterReq(notificationRead, from, to);

            const json = {
                notificationJsons: [],
                totalSize: 0,
                unreadCount: 0,
            }

            json.notificationJsons = storageHelper.notificationsJson
            if (notificationRead === S.INT_TRUE || notificationRead === S.INT_FALSE) {
                json.notificationJsons = json.notificationJsons.filter((notificationJson) => notificationJson.notificationRead === notificationRead)
            }

            storageHelper.notificationsJson.forEach((j: NotificationModel) => (j.notificationRead === S.INT_FALSE ? json.unreadCount++ : ''));

            json.notificationJsons.sort((a, b) => (a.notificationTime < b.notificationTime ? 1 : -1));

            json.totalSize = json.notificationJsons.length;

            json.notificationJsons = json.notificationJsons.slice(from, to);

            const res = new FetchNotificationsByFilterRes(json);

            callback(res.notificationModels, res.totalSize, res.unreadCount);
        }, 100);

        // const req = new FetchNotificationsByFilterReq(notificationRead, from, to);

        // this.generalApi.req(Actions.GENERAL.FETCH_NOTIFICATIONS_BY_FILTER, req, (json: any) => {
        //     if (json.status !== ResponseConsts.S_STATUS_OK) {
        //         this.showAlert('Something went wrong');
        //         return;
        //     }

        //     const res = new FetchNotificationsByFilterRes(json.obj);

        //     callback(res.notificationModels, res.totalSize);

        // });
    }

    readAllNotifications(callback: () => void) {
        this.disableActions();

        setTimeout(() => {
            this.enableActions();

            storageHelper.notificationsJson.forEach((notificationJson) => {
                notificationJson.notificationRead = S.INT_TRUE;
            });
            storageHelper.save();

            callback();
        }, 100);
    }

    readNotification(notificationModel: NotificationModel, callback: () => void) {
        this.disableActions();

        setTimeout(() => {
            this.enableActions();

            const req = new ReadNotificationByIdReq(notificationModel);

            const json = {
                notificationJson: null,
            }

            json.notificationJson = storageHelper.notificationsJson.find((nJson: NotificationModel) => nJson.notificationId === notificationModel.notificationId)
            json.notificationJson.notificationRead = S.INT_TRUE;

            storageHelper.save();

            const res = new ReadNotificationByIdRes(json);
            notificationModel.notificationRead = res.notificationModel.notificationRead;

            callback();
        }, 100);
    }

    fetchAllSites(callback: (siteModels: SiteModel[], countryModels: CountryModel[]) => void) {
        this.disableActions();

        setTimeout(() => {
            this.enableActions();

            const req = new FetchAllSitesReq();

            const json = {
                siteJsons: storageHelper.sitesJson,
                countryJsons: storageHelper.countriesJson,
            }

            const res = new FetchAllSitesRes(json);
            callback(res.siteModels, res.countryModels);
        }, 100);
    }

}
