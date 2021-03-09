import { makeAutoObservable } from 'mobx';

import CountryModel from '../models/CountryModel';
import SiteModel from '../models/SiteModel';

export default class SiteStore {

    sitesMap: Map < string, SiteModel > = new Map();
    countriesMap: Map < string, CountryModel > = new Map();

    screenSiteModels: SiteModel[] = [];
    screenCountryModels: CountryModel[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    onScreenData(siteModels: SiteModel[], countryModels: CountryModel[]) {
        this.screenSiteModels = siteModels;
        this.screenCountryModels = countryModels;
        this.updateSiteModels(siteModels);
        this.updateCountryModels(countryModels);
    }

    updateSiteModels(siteModels: SiteModel[]) {
        const cacheMap = this.sitesMap;
        this.sitesMap = null;

        siteModels.forEach((siteModel) => {
            cacheMap.set(siteModel.siteId, siteModel);
        });

        this.sitesMap = cacheMap;
    }

    updateCountryModels(countryModels: CountryModel[]) {
        const cacheMap = this.countriesMap;
        this.countriesMap = null;

        countryModels.forEach((countryModel) => {
            cacheMap.set(countryModel.countryId, countryModel);
        });

        this.countriesMap = cacheMap;
    }

    getFullSiteName(siteId: string): string {
        const siteModel = this.sitesMap.get(siteId);
        const countryModel = this.countriesMap.get(siteModel.siteId);

        return `${siteModel.siteName}, ${countryModel.countryName}`;
    }

    getSiteVat(siteId: string): number {
        const siteModel = this.sitesMap.get(siteId);
        const countryModel = this.countriesMap.get(siteModel.siteId);

        return countryModel.countryVat;
    }

    getCountryModel(countryId: string): CountryModel | null {
        return this.countriesMap.get(countryId) ?? null;
    }

    getSiteModel(siteId: string): SiteModel | null {
        return this.sitesMap.get(siteId) ?? null;
    }

}
