
            
export default class SiteModelH {

    static primaryValueInInsert = true;

    static P_SITE_ID = 1;
    static P_COUNTRY_ID = 2;
    static P_SITE_NAME = 3;
    static PROPERTIES = [SiteModelH.P_SITE_ID,
        SiteModelH.P_COUNTRY_ID,
        SiteModelH.P_SITE_NAME];

    siteId: number;
    countryId: number;
    siteName: string;

}
