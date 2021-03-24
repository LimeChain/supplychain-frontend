import AutoIncrementerModel from './AutoIncrementerModel';
import AutoIncrementerModelH from './AutoIncrementerModelH';
import AutoIncrementerRepoH from '../Repo/AutoIncrementerRepoH';
import SV from '../../../utilities/SV';


export default class AutoIncrementerModelG extends AutoIncrementerModelH {

    constructor() {
        super();
        this.autoIncrementerId = SV.NOT_EXISTS;
        this.nextProductId = SV.NOT_EXISTS;
        this.nextSkuId = SV.NOT_EXISTS;
        this.nextSkuOriginId = SV.NOT_EXISTS;
        this.nextShipmentId = SV.NOT_EXISTS;
        this.nextShipmentDocumentId = SV.NOT_EXISTS;
    }

    copyRefProperties(sourceModel: AutoIncrementerModel): void {

    }

    static asMap(models: AutoIncrementerModel[]): Map < any, AutoIncrementerModel > {
        const map = new Map < any, AutoIncrementerModel >();

        models.forEach((m) => {
            map.set(m.autoIncrementerId, m);
        });

        return map;
    }


    toRepo(props: number[] | null = null): AutoIncrementerRepoH {
        const map = AutoIncrementerModelG.getPropsAsMap(props);

        const repo = new AutoIncrementerRepoH();

        if (map.has(AutoIncrementerModelH.P_AUTO_INCREMENTER_ID) === true && this.autoIncrementerId !== undefined) {
            repo.autoIncrementerId = this.autoIncrementerId;
            repo.autoIncrementerIdToDb = true;
        }
        if (map.has(AutoIncrementerModelH.P_NEXT_PRODUCT_ID) === true && this.nextProductId !== undefined) {
            repo.nextProductId = this.nextProductId;
            repo.nextProductIdToDb = true;
        }
        if (map.has(AutoIncrementerModelH.P_NEXT_SKU_ID) === true && this.nextSkuId !== undefined) {
            repo.nextSkuId = this.nextSkuId;
            repo.nextSkuIdToDb = true;
        }
        if (map.has(AutoIncrementerModelH.P_NEXT_SKU_ORIGIN_ID) === true && this.nextSkuOriginId !== undefined) {
            repo.nextSkuOriginId = this.nextSkuOriginId;
            repo.nextSkuOriginIdToDb = true;
        }
        if (map.has(AutoIncrementerModelH.P_NEXT_SHIPMENT_ID) === true && this.nextShipmentId !== undefined) {
            repo.nextShipmentId = this.nextShipmentId;
            repo.nextShipmentIdToDb = true;
        }
        if (map.has(AutoIncrementerModelH.P_NEXT_SHIPMENT_DOCUMENT_ID) === true && this.nextShipmentDocumentId !== undefined) {
            repo.nextShipmentDocumentId = this.nextShipmentDocumentId;
            repo.nextShipmentDocumentIdToDb = true;
        }

        return repo;
    }

    static fromRepo(repo: AutoIncrementerRepoH): AutoIncrementerModel {
        const model = new AutoIncrementerModel();

        model.autoIncrementerId = parseInt((repo.autoIncrementerId ?? model.autoIncrementerId) as unknown as string);
        model.nextProductId = parseInt((repo.nextProductId ?? model.nextProductId) as unknown as string);
        model.nextSkuId = parseInt((repo.nextSkuId ?? model.nextSkuId) as unknown as string);
        model.nextSkuOriginId = parseInt((repo.nextSkuOriginId ?? model.nextSkuOriginId) as unknown as string);
        model.nextShipmentId = parseInt((repo.nextShipmentId ?? model.nextShipmentId) as unknown as string);
        model.nextShipmentDocumentId = parseInt((repo.nextShipmentDocumentId ?? model.nextShipmentDocumentId) as unknown as string);

        return model;
    }
        

    toNetwork(): any {
        return {
            autoIncrementerId: this.autoIncrementerId,
            nextProductId: this.nextProductId,
            nextSkuId: this.nextSkuId,
            nextSkuOriginId: this.nextSkuOriginId,
            nextShipmentId: this.nextShipmentId,
            nextShipmentDocumentId: this.nextShipmentDocumentId,
        };
    }

    static fromNetwork(json: any): AutoIncrementerModel {
        if (json === null) {
            return null;
        }

        const model = new AutoIncrementerModel();
        
        model.autoIncrementerId = parseInt(json.autoIncrementerId ?? model.autoIncrementerId);
        model.nextProductId = parseInt(json.nextProductId ?? model.nextProductId);
        model.nextSkuId = parseInt(json.nextSkuId ?? model.nextSkuId);
        model.nextSkuOriginId = parseInt(json.nextSkuOriginId ?? model.nextSkuOriginId);
        model.nextShipmentId = parseInt(json.nextShipmentId ?? model.nextShipmentId);
        model.nextShipmentDocumentId = parseInt(json.nextShipmentDocumentId ?? model.nextShipmentDocumentId);

        return model;
    }

    static matchModelToRepoProp(modelProp: number): string | null {
        switch (modelProp) {
            case AutoIncrementerModelH.P_AUTO_INCREMENTER_ID:
                return AutoIncrementerRepoH.C_AUTO_INCREMENTER_ID;
            case AutoIncrementerModelH.P_NEXT_PRODUCT_ID:
                return AutoIncrementerRepoH.C_NEXT_PRODUCT_ID;
            case AutoIncrementerModelH.P_NEXT_SKU_ID:
                return AutoIncrementerRepoH.C_NEXT_SKU_ID;
            case AutoIncrementerModelH.P_NEXT_SKU_ORIGIN_ID:
                return AutoIncrementerRepoH.C_NEXT_SKU_ORIGIN_ID;
            case AutoIncrementerModelH.P_NEXT_SHIPMENT_ID:
                return AutoIncrementerRepoH.C_NEXT_SHIPMENT_ID;
            case AutoIncrementerModelH.P_NEXT_SHIPMENT_DOCUMENT_ID:
                return AutoIncrementerRepoH.C_NEXT_SHIPMENT_DOCUMENT_ID;
            default:
                return null;
        }
    }

    static getPropsAsMap(props: number[] | null = null): Map < number, boolean > {
        props = props ?? AutoIncrementerModelH.PROPERTIES;

        const map = new Map < number, boolean >();
        props.forEach((prop) => {
            map.set(prop, true);
        });

        return map;
    }
}
