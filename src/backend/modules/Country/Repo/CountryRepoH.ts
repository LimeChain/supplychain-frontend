export default class CountryRepoH {

    static TABLE_NAME = 'countries';
    static C_COUNTRY_ID = 'countryId';
    static C_COUNTRY_NAME = 'countryName';
    static C_COUNTRY_VAT = 'countryVat';
        
    countryId: number | null;
    countryIdToDb: boolean;
    countryName: string | null;
    countryNameToDb: boolean;
    countryVat: number | null;
    countryVatToDb: boolean;
    
    constructor() {
        this.countryId = null;
        this.countryIdToDb = false;
        this.countryName = null;
        this.countryNameToDb = false;
        this.countryVat = null;
        this.countryVatToDb = false;
    }
    
    static instanceByDbRow(row): CountryRepoH {
        const repo = new CountryRepoH();
    
        repo.countryId = row[CountryRepoH.C_COUNTRY_ID] ?? repo.countryId;
        repo.countryName = row[CountryRepoH.C_COUNTRY_NAME] ?? repo.countryName;
        repo.countryVat = row[CountryRepoH.C_COUNTRY_VAT] ?? repo.countryVat;

        return repo;
    }

    getPrimaryValue(): number | null {
        return this.countryId;
    }

    setPrimaryValue(value: number): void {
        this.countryId = parseInt(value as unknown as string);
    }

    getPrimaryValueForInsert(): number | null {
        return null;
    }

    getDbPairs() {
        const columns = [];
        const values = [];

        if (this.countryNameToDb === true) {
            columns.push(CountryRepoH.C_COUNTRY_NAME);
            values.push(this.countryName === null ? null : this.countryName.toString());
        }

        if (this.countryVatToDb === true) {
            columns.push(CountryRepoH.C_COUNTRY_VAT);
            values.push(this.countryVat === null ? null : this.countryVat.toString());
        }

        return [columns, values];
    }

    getPrimaryDbPair() {
        return [CountryRepoH.C_COUNTRY_ID, this.countryId];
    }

}
