import CountryModel from "../models/CountryModel";
import NotificationModel from "../models/NotificationModel";
import SiteModel from "../models/SiteModel";

export class FetchAllSitesRes {

    siteModels: SiteModel[]
    countryModels: CountryModel[]

    constructor(json) {
        this.siteModels = [];
        this.countryModels = [];

        for (let siteJson of json.siteJsons) {
            this.siteModels.push(SiteModel.fromJson(siteJson));
        }

        for (let countryJson of json.countryJsons) {
            this.countryModels.push(CountryModel.fromJson(countryJson));
        }
    }

}

export class FetchAllNotificationsRes {

    notificationModels: NotificationModel[];
    totalSize: number;

    constructor(json) {
        this.notificationModels = new Array<NotificationModel>();
        this.totalSize = json.totalSize;

        for (let notificationJson of json.notificationJsons) {
            this.notificationModels.push(NotificationModel.fromJson(notificationJson));
        }
    }

}