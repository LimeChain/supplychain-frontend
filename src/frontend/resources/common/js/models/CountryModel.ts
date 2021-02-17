import S from '../utilities/Main';

export default class CountryModel {
    countryId: string
    countryName: string
    countryVat: number


    constructor(){
        this.countryId = S.Strings.NOT_EXISTS;
        this.countryName = S.Strings.EMPTY;
        this.countryVat = S.NOT_EXISTS;
    }

    toJson(): any {
        return {
            'countryId': this.countryId,
            'countryName': this.countryName,
            'countryVat': this.countryVat,
        }
    }

    static fromJson(json): CountryModel {
        if (json === null) {
            return null;
        }

        const model = new CountryModel();

        model.countryId = (json.countryId || model.countryId).toString();
        model.countryName = json.countryName || model.countryName;
        model.countryVat = json.countryVat || model.countryVat;
        
        return model;
    }


}