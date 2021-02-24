import SkuOriginModel from './SkuOriginModel';
import SkuOriginModelH from './SkuOriginModelH';
import SkuOriginRepoH from '../Repo/SkuOriginRepoH';
import SV from '../../../../utilities/SV';


export default class SkuOriginModelG extends SkuOriginModelH {

    constructor() {
        super();
        this.skuOriginId = SV.NOT_EXISTS;
        this.skuId = SV.NOT_EXISTS;
        this.shipmentId = SV.NOT_EXISTS;
    }

    copyRefProperties(sourceModel: SkuOriginModel): void {

    }

    static asMap(models: SkuOriginModel[]): Map < any, SkuOriginModel > {
        const map = new Map < any, SkuOriginModel >();

        models.forEach((m) => {
            map.set(m.skuOriginId, m);
        });

        return map;
    }


    toRepo(props: number[] | null = null): SkuOriginRepoH {
        const map = SkuOriginModelG.getPropsAsMap(props);

        const repo = new SkuOriginRepoH();

        if (map.has(SkuOriginModelH.P_SKU_ORIGIN_ID) === true && this.skuOriginId !== undefined) {
            repo.skuOriginId = this.skuOriginId;
            repo.skuOriginIdToDb = true;
        }
        if (map.has(SkuOriginModelH.P_SKU_ID) === true && this.skuId !== undefined) {
            repo.skuId = this.skuId;
            repo.skuIdToDb = true;
        }
        if (map.has(SkuOriginModelH.P_SHIPMENT_ID) === true && this.shipmentId !== undefined) {
            repo.shipmentId = this.shipmentId;
            repo.shipmentIdToDb = true;
        }

        return repo;
    }

    static fromRepo(repo: SkuOriginRepoH): SkuOriginModel {
        const model = new SkuOriginModel();

        model.skuOriginId = parseInt((repo.skuOriginId ?? model.skuOriginId) as unknown as string);
        model.skuId = parseInt((repo.skuId ?? model.skuId) as unknown as string);
        model.shipmentId = parseInt((repo.shipmentId ?? model.shipmentId) as unknown as string);

        return model;
    }
        

    toNetwork(): any {
        return {
            skuOriginId: this.skuOriginId,
            skuId: this.skuId,
            shipmentId: this.shipmentId,
        };
    }

    static fromNetwork(json: any): SkuOriginModel {
        if (json === null) {
            return null;
        }

        const model = new SkuOriginModel();
        
        model.skuOriginId = parseInt(json.skuOriginId ?? model.skuOriginId);
        model.skuId = parseInt(json.skuId ?? model.skuId);
        model.shipmentId = parseInt(json.shipmentId ?? model.shipmentId);

        return model;
    }

    static matchModelToRepoProp(modelProp: number): string | null {
        switch (modelProp) {
            case SkuOriginModelH.P_SKU_ORIGIN_ID:
                return SkuOriginRepoH.C_SKU_ORIGIN_ID;
            case SkuOriginModelH.P_SKU_ID:
                return SkuOriginRepoH.C_SKU_ID;
            case SkuOriginModelH.P_SHIPMENT_ID:
                return SkuOriginRepoH.C_SHIPMENT_ID;
            default:
                return null;
        }
    }

    static getPropsAsMap(props: number[] | null = null): Map < number, boolean > {
        props = props ?? SkuOriginModelH.PROPERTIES;

        const map = new Map < number, boolean >();
        props.forEach((prop) => {
            map.set(prop, true);
        });

        return map;
    }
}
