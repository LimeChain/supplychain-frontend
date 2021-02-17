import { makeAutoObservable } from 'mobx';
import CountryModel from '../models/CountryModel';
import NotificationModel from '../models/NotificationModel';
import SiteModel from '../models/SiteModel';

export default class SiteStore {
    sitesMap: Map < string, SiteModel > = new Map();
    countriesMap: Map < string, CountryModel > = new Map();
    
    screenSiteModels: SiteModel[] = [];
    screenCountryModels: CountryModel[] = [];


    constructor() {
        makeAutoObservable(this);
    }

    onScreenData(siteModels: SiteModel[], countryModels: CountryModel[]){
        this.screenSiteModels = siteModels;
        this.screenCountryModels = countryModels;
        this.updateSiteModels(siteModels);
        this.updateCountryModels(countryModels);
    }

    updateSiteModels(siteModels: SiteModel[]){
        const cacheMap = this.sitesMap;
        this.sitesMap = null;

        siteModels.forEach((siteModel) => {
            cacheMap.set(siteModel.siteId, siteModel);
        });

        this.sitesMap = cacheMap;
    }

    updateCountryModels(countryModels: CountryModel[]){
        const cacheMap = this.sitesMap;
        this.countriesMap = null;

        countryModels.forEach((countryModel) => {
            cacheMap.set(countryModel.countryId, countryModel);
        });

        this.countriesMap = cacheMap;
    }

    getFullSiteName(siteId: string): string{
        let siteModel = this.sitesMap.get(siteId);
        let countryModel = this.countriesMap.get(siteModel.siteId);

        return `${siteModel.siteName}, ${countryModel.countryName}`;
    }


    getSiteVat(siteId: string): number{
        let siteModel = this.sitesMap.get(siteId);
        let countryModel = this.countriesMap.get(siteModel.siteId);

        return countryModel.countryVat;
    }
}