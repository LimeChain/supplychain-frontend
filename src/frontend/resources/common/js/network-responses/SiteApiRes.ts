import CountryModel from "../models/CountryModel";
import NotificationModel from "../models/NotificationModel";
import SiteModel from "../models/SiteModel";

export class FetchAllSitesRes {

    siteModels: SiteModel[]
    countryModels: CountryModel[]

    constructor(json) {
        this.siteModels = [];
        this.countryModels = [];

        for(let siteJson of json.siteJsons){
            this.siteModels.push(SiteModel.fromJson(siteJson));
        }

        for(let countryJson of json.countryJsons){
            this.countryModels.push(CountryModel.fromJson(countryJson));
        }
    }

}