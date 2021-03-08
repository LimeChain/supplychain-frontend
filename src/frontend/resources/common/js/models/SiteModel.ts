import S from '../utilities/Main';

export default class SiteModel {

    siteId: string
    countryId: string
    siteName: string

    constructor() {
        this.siteId = S.Strings.NOT_EXISTS;
        this.countryId = S.Strings.NOT_EXISTS;
        this.siteName = S.Strings.EMPTY;
    }

    toJson(): any {
        return {
            'siteId': this.siteId,
            'countryId': this.countryId,
            'siteName': this.siteName,
        }
    }

    static fromJson(json): SiteModel {
        if (json === null) {
            return null;
        }

        const model = new SiteModel();

        model.siteId = (json.siteId || model.siteId).toString();
        model.countryId = (json.countryId || model.countryId).toString();
        model.siteName = json.siteName || model.siteName;

        return model;
    }

}
