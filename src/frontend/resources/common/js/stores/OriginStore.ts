import { makeAutoObservable } from 'mobx';

import SiteModel from '../models/SiteModel';

export default class OriginStore {
    originsMap: Map < string, SiteModel > = new Map();

    screenSiteModels: SiteModel[];

    constructor() {
        makeAutoObservable(this);
    }

    onScreenData(siteModels: SiteModel[]) {
        this.screenSiteModels = siteModels;
        this.updateSiteModels(siteModels);
    }

    updateSiteModels(siteModels: SiteModel[]) {
        const cacheMap = this.originsMap;
        this.originsMap = null;

        siteModels.forEach((siteModel) => {
            cacheMap.set(siteModel.siteId, siteModel);
        });

        this.originsMap = cacheMap;
    }
}
