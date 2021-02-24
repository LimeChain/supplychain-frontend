export default class SiteRepoH {

    static TABLE_NAME = 'sites';
    static C_SITE_ID = 'siteId';
    static C_COUNTRY_ID = 'countryId';
    static C_SITE_NAME = 'siteName';
        
    siteId: number | null;
    siteIdToDb: boolean;
    countryId: number | null;
    countryIdToDb: boolean;
    siteName: string | null;
    siteNameToDb: boolean;
    
    constructor() {
        this.siteId = null;
        this.siteIdToDb = false;
        this.countryId = null;
        this.countryIdToDb = false;
        this.siteName = null;
        this.siteNameToDb = false;
    }
    
    static instanceByDbRow(row): SiteRepoH {
        const repo = new SiteRepoH();
    
        repo.siteId = row[SiteRepoH.C_SITE_ID] ?? repo.siteId;
        repo.countryId = row[SiteRepoH.C_COUNTRY_ID] ?? repo.countryId;
        repo.siteName = row[SiteRepoH.C_SITE_NAME] ?? repo.siteName;

        return repo;
    }

    getPrimaryValue(): number | null {
        return this.siteId;
    }

    setPrimaryValue(value: number): void {
        this.siteId = parseInt(value as unknown as string);
    }

    getPrimaryValueForInsert(): number | null {
        return null;
    }

    getDbPairs() {
        const columns = [];
        const values = [];

        if (this.countryIdToDb === true) {
            columns.push(SiteRepoH.C_COUNTRY_ID);
            values.push(this.countryId === null ? null : this.countryId.toString());
        }

        if (this.siteNameToDb === true) {
            columns.push(SiteRepoH.C_SITE_NAME);
            values.push(this.siteName === null ? null : this.siteName.toString());
        }

        return [columns, values];
    }

    getPrimaryDbPair() {
        return [SiteRepoH.C_SITE_ID, this.siteId];
    }

}
