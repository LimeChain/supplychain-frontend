import CountryModel from './CountryModel';
import CountryModelH from './CountryModelH';
import CountryRepoH from '../Repo/CountryRepoH';
import SV from '../../../utilities/SV';


export default class CountryModelG extends CountryModelH {

    constructor() {
        super();
        this.countryId = SV.NOT_EXISTS;
        this.countryName = SV.Strings.EMPTY;
        this.countryVat = SV.NOT_EXISTS;
    }

    copyRefProperties(sourceModel: CountryModel): void {

    }

    static asMap(models: CountryModel[]): Map < any, CountryModel > {
        const map = new Map < any, CountryModel >();

        models.forEach((m) => {
            map.set(m.countryId, m);
        });

        return map;
    }


    toRepo(props: number[] | null = null): CountryRepoH {
        const map = CountryModelG.getPropsAsMap(props);

        const repo = new CountryRepoH();

        if (map.has(CountryModelH.P_COUNTRY_ID) === true && this.countryId !== undefined) {
            repo.countryId = this.countryId;
            repo.countryIdToDb = true;
        }
        if (map.has(CountryModelH.P_COUNTRY_NAME) === true && this.countryName !== undefined) {
            repo.countryName = this.countryName;
            repo.countryNameToDb = true;
        }
        if (map.has(CountryModelH.P_COUNTRY_VAT) === true && this.countryVat !== undefined) {
            repo.countryVat = this.countryVat;
            repo.countryVatToDb = true;
        }

        return repo;
    }

    static fromRepo(repo: CountryRepoH): CountryModel {
        const model = new CountryModel();

        model.countryId = parseInt((repo.countryId ?? model.countryId) as unknown as string);
        model.countryName = repo.countryName ?? model.countryName;
        model.countryVat = parseInt((repo.countryVat ?? model.countryVat) as unknown as string);

        return model;
    }
        

    toNetwork(): any {
        return {
            countryId: this.countryId,
            countryName: this.countryName,
            countryVat: this.countryVat,
        };
    }

    static fromNetwork(json: any): CountryModel {
        if (json === null) {
            return null;
        }

        const model = new CountryModel();
        
        model.countryId = parseInt(json.countryId ?? model.countryId);
        model.countryName = json.countryName ?? model.countryName;
        model.countryVat = parseInt(json.countryVat ?? model.countryVat);

        return model;
    }

    static matchModelToRepoProp(modelProp: number): string | null {
        switch (modelProp) {
            case CountryModelH.P_COUNTRY_ID:
                return CountryRepoH.C_COUNTRY_ID;
            case CountryModelH.P_COUNTRY_NAME:
                return CountryRepoH.C_COUNTRY_NAME;
            case CountryModelH.P_COUNTRY_VAT:
                return CountryRepoH.C_COUNTRY_VAT;
            default:
                return null;
        }
    }

    static getPropsAsMap(props: number[] | null = null): Map < number, boolean > {
        props = props ?? CountryModelH.PROPERTIES;

        const map = new Map < number, boolean >();
        props.forEach((prop) => {
            map.set(prop, true);
        });

        return map;
    }
}
