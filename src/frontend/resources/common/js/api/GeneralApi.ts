import AbsApi from './AbsApi';
import storageHelper from '../helpers/StorageHelper';
import NotificationModel from '../models/NotificationModel';
import { FetchAllSitesReq, FetchAllNotificationsReq } from '../network-requests/GeneralApiReq';
import { FetchAllSitesRes, FetchAllNotificationsRes } from '../network-responses/GeneralApiRes';
import SiteModel from '../models/SiteModel';
import CountryModel from '../models/CountryModel';


export default class GeneralApi extends AbsApi {
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

            json.notificationJsons = json.notificationJsons.slice(from, to);


            const res = new FetchAllNotificationsRes(json);

            callback(res.notificationModels, res.totalSize);
        }, 100);
    }

    fetchAllSites(callback: (siteModels: SiteModel[], countryModels: CountryModel[]) => void) {
        this.disableActions();

        setTimeout(() => {
            this.enableActions();

            const req = new FetchAllSitesReq();

            let json = {
                siteJsons: storageHelper.sitesJson,
                countryJsons: storageHelper.countriesJson,
            }


            const res = new FetchAllSitesRes(json);
            callback(res.siteModels, res.countryModels);
        }, 100);
    }

}