import CountryModel from "../modules/Country/Model/CountryModel";
import SiteModel from "../modules/Site/Model/SiteModel";
import Service from "./common/Service";

export default class GeneralService extends Service {

    async fetchSites(): Promise < SiteModel[] > {
        const sitesRepo = this.repoFactory.getSiteRepo();
        return sitesRepo.fetch();
    }

    async fetchCountries(): Promise < CountryModel[] > {
        const countryRepo = this.repoFactory.getCountryRepo();
        return countryRepo.fetch();
    }

}