import S from '../utilities/Main';

export default class CountryModel {

    static ID_GERMANY: string = '1';
    static ID_NETHERLANDS: string = '2';

    countryId: string
    countryName: string
    countryVat: number

    constructor() {
        this.countryId = S.Strings.NOT_EXISTS;
        this.countryName = S.Strings.EMPTY;
        this.countryVat = S.NOT_EXISTS;
    }

    static newInstance(countryId: string, countryName: string, countryVat: number) {
        const model = new CountryModel();
        model.countryId = countryId;
        model.countryName = countryName;
        model.countryVat = countryVat;
        return model;
    }

    static getAllCountries() {
        return [
            CountryModel.newInstance(CountryModel.ID_GERMANY, 'Germany', 0.18),
            CountryModel.newInstance(CountryModel.ID_NETHERLANDS, 'Netherlands', 0.19),
        ]
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

        model.countryId = (json.countryId ?? model.countryId).toString();
        model.countryName = json.countryName ?? model.countryName;
        model.countryVat = json.countryVat ?? model.countryVat;

        return model;
    }

}
