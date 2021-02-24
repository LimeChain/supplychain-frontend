import SkuModel from './SkuModel';
import SkuModelH from './SkuModelH';
import SkuRepoH from '../Repo/SkuRepoH';
import SV from '../../../../utilities/SV';


export default class SkuModelG extends SkuModelH {

    constructor() {
        super();
        this.skuId = SV.NOT_EXISTS;
        this.shipmentId = SV.NOT_EXISTS;
        this.productId = SV.NOT_EXISTS;
        this.quantity = SV.NOT_EXISTS;
        this.pricePerUnit = SV.NOT_EXISTS;
        this.currency = SV.NOT_EXISTS;
    }

    copyRefProperties(sourceModel: SkuModel): void {

    }

    static asMap(models: SkuModel[]): Map < any, SkuModel > {
        const map = new Map < any, SkuModel >();

        models.forEach((m) => {
            map.set(m.skuId, m);
        });

        return map;
    }


    toRepo(props: number[] | null = null): SkuRepoH {
        const map = SkuModelG.getPropsAsMap(props);

        const repo = new SkuRepoH();

        if (map.has(SkuModelH.P_SKU_ID) === true && this.skuId !== undefined) {
            repo.skuId = this.skuId;
            repo.skuIdToDb = true;
        }
        if (map.has(SkuModelH.P_SHIPMENT_ID) === true && this.shipmentId !== undefined) {
            repo.shipmentId = this.shipmentId;
            repo.shipmentIdToDb = true;
        }
        if (map.has(SkuModelH.P_PRODUCT_ID) === true && this.productId !== undefined) {
            repo.productId = this.productId;
            repo.productIdToDb = true;
        }
        if (map.has(SkuModelH.P_QUANTITY) === true && this.quantity !== undefined) {
            repo.quantity = this.quantity;
            repo.quantityToDb = true;
        }
        if (map.has(SkuModelH.P_PRICE_PER_UNIT) === true && this.pricePerUnit !== undefined) {
            repo.pricePerUnit = this.pricePerUnit;
            repo.pricePerUnitToDb = true;
        }
        if (map.has(SkuModelH.P_CURRENCY) === true && this.currency !== undefined) {
            repo.currency = this.currency;
            repo.currencyToDb = true;
        }

        return repo;
    }

    static fromRepo(repo: SkuRepoH): SkuModel {
        const model = new SkuModel();

        model.skuId = parseInt((repo.skuId ?? model.skuId) as unknown as string);
        model.shipmentId = parseInt((repo.shipmentId ?? model.shipmentId) as unknown as string);
        model.productId = parseInt((repo.productId ?? model.productId) as unknown as string);
        model.quantity = parseInt((repo.quantity ?? model.quantity) as unknown as string);
        model.pricePerUnit = parseInt((repo.pricePerUnit ?? model.pricePerUnit) as unknown as string);
        model.currency = parseInt((repo.currency ?? model.currency) as unknown as string);

        return model;
    }
        

    toNetwork(): any {
        return {
            skuId: this.skuId,
            shipmentId: this.shipmentId,
            productId: this.productId,
            quantity: this.quantity,
            pricePerUnit: this.pricePerUnit,
            currency: this.currency,
        };
    }

    static fromNetwork(json: any): SkuModel {
        if (json === null) {
            return null;
        }

        const model = new SkuModel();
        
        model.skuId = parseInt(json.skuId ?? model.skuId);
        model.shipmentId = parseInt(json.shipmentId ?? model.shipmentId);
        model.productId = parseInt(json.productId ?? model.productId);
        model.quantity = parseInt(json.quantity ?? model.quantity);
        model.pricePerUnit = parseInt(json.pricePerUnit ?? model.pricePerUnit);
        model.currency = parseInt(json.currency ?? model.currency);

        return model;
    }

    static matchModelToRepoProp(modelProp: number): string | null {
        switch (modelProp) {
            case SkuModelH.P_SKU_ID:
                return SkuRepoH.C_SKU_ID;
            case SkuModelH.P_SHIPMENT_ID:
                return SkuRepoH.C_SHIPMENT_ID;
            case SkuModelH.P_PRODUCT_ID:
                return SkuRepoH.C_PRODUCT_ID;
            case SkuModelH.P_QUANTITY:
                return SkuRepoH.C_QUANTITY;
            case SkuModelH.P_PRICE_PER_UNIT:
                return SkuRepoH.C_PRICE_PER_UNIT;
            case SkuModelH.P_CURRENCY:
                return SkuRepoH.C_CURRENCY;
            default:
                return null;
        }
    }

    static getPropsAsMap(props: number[] | null = null): Map < number, boolean > {
        props = props ?? SkuModelH.PROPERTIES;

        const map = new Map < number, boolean >();
        props.forEach((prop) => {
            map.set(prop, true);
        });

        return map;
    }
}
