import CountryModel from '../models/CountryModel';
import NotificationModel from '../models/NotificationModel';
import SiteModel from '../models/SiteModel';

export class FetchAllSitesRes {

    siteModels: SiteModel[]
    countryModels: CountryModel[]

    constructor(json) {
        this.siteModels = json.siteJsons.map((j) => SiteModel.fromJson(j));
        this.countryModels = json.countryJsons.map((j) => CountryModel.fromJson(j));
    }

}

export class FetchNotificationsByFilterRes {

    notificationModels: Array<NotificationModel>;
    totalSize: number;

    constructor(json) {
        this.notificationModels = json.notificationJsons.map((j) => NotificationModel.fromJson(j));
        this.totalSize = json.totalSize;
    }

}
