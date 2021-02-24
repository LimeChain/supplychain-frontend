import SiteModel from './SiteModel';
import SiteModelH from './SiteModelH';
import SiteRepoH from '../Repo/SiteRepoH';
import SV from '../../../utilities/SV';


export default class SiteModelG extends SiteModelH {

    constructor() {
        super();
        this.siteId = SV.NOT_EXISTS;
        this.countryId = SV.NOT_EXISTS;
        this.siteName = SV.Strings.EMPTY;
    }

    copyRefProperties(sourceModel: SiteModel): void {

    }

    static asMap(models: SiteModel[]): Map < any, SiteModel > {
        const map = new Map < any, SiteModel >();

        models.forEach((m) => {
            map.set(m.siteId, m);
        });

        return map;
    }


    toRepo(props: number[] | null = null): SiteRepoH {
        const map = SiteModelG.getPropsAsMap(props);

        const repo = new SiteRepoH();

        if (map.has(SiteModelH.P_SITE_ID) === true && this.siteId !== undefined) {
            repo.siteId = this.siteId;
            repo.siteIdToDb = true;
        }
        if (map.has(SiteModelH.P_COUNTRY_ID) === true && this.countryId !== undefined) {
            repo.countryId = this.countryId;
            repo.countryIdToDb = true;
        }
        if (map.has(SiteModelH.P_SITE_NAME) === true && this.siteName !== undefined) {
            repo.siteName = this.siteName;
            repo.siteNameToDb = true;
        }

        return repo;
    }

    static fromRepo(repo: SiteRepoH): SiteModel {
        const model = new SiteModel();

        model.siteId = parseInt((repo.siteId ?? model.siteId) as unknown as string);
        model.countryId = parseInt((repo.countryId ?? model.countryId) as unknown as string);
        model.siteName = repo.siteName ?? model.siteName;

        return model;
    }
        

    toNetwork(): any {
        return {
            siteId: this.siteId,
            countryId: this.countryId,
            siteName: this.siteName,
        };
    }

    static fromNetwork(json: any): SiteModel {
        if (json === null) {
            return null;
        }

        const model = new SiteModel();
        
        model.siteId = parseInt(json.siteId ?? model.siteId);
        model.countryId = parseInt(json.countryId ?? model.countryId);
        model.siteName = json.siteName ?? model.siteName;

        return model;
    }

    static matchModelToRepoProp(modelProp: number): string | null {
        switch (modelProp) {
            case SiteModelH.P_SITE_ID:
                return SiteRepoH.C_SITE_ID;
            case SiteModelH.P_COUNTRY_ID:
                return SiteRepoH.C_COUNTRY_ID;
            case SiteModelH.P_SITE_NAME:
                return SiteRepoH.C_SITE_NAME;
            default:
                return null;
        }
    }

    static getPropsAsMap(props: number[] | null = null): Map < number, boolean > {
        props = props ?? SiteModelH.PROPERTIES;

        const map = new Map < number, boolean >();
        props.forEach((prop) => {
            map.set(prop, true);
        });

        return map;
    }
}
