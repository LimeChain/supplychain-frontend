import SiteModel from '../../../modules/Site/Model/SiteModel';
import SiteModelG from '../../../modules/Site/Model/SiteModelG';
import SiteModelH from '../../../modules/Site/Model/SiteModelH';
import CountryModel from '../../../modules/Country/Model/CountryModel';
import CountryModelG from '../../../modules/Country/Model/CountryModelG';
import CountryModelH from '../../../modules/Country/Model/CountryModelH';

export default class FetchAllSitesRes {

    siteJsons: SiteModel[];;
    countryJsons: CountryModel[];;

    constructor(siteModels: SiteModel[], countryModels: CountryModel[]) {
        this.siteJsons = [];
        for (let i = 0; i < siteModels.length; ++i) {
            this.siteJsons.push(siteModels[i].toNetwork());
        }
        this.countryJsons = [];
        for (let i = 0; i < countryModels.length; ++i) {
            this.countryJsons.push(countryModels[i].toNetwork());
        }
    }

}
