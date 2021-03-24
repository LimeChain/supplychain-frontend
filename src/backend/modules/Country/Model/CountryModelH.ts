
            
export default class CountryModelH {

    static primaryValueInInsert = true;

    static P_COUNTRY_ID = 1;
    static P_COUNTRY_NAME = 2;
    static P_COUNTRY_VAT = 3;
    static PROPERTIES = [CountryModelH.P_COUNTRY_ID,
        CountryModelH.P_COUNTRY_NAME,
        CountryModelH.P_COUNTRY_VAT];

    countryId: number;
    countryName: string;
    countryVat: number;

}
