export default class SkuOriginRepoH {

    static TABLE_NAME = 'sku_origins';
    static C_SKU_ORIGIN_ID = 'skuOriginId';
    static C_SKU_ID = 'skuId';
    static C_SHIPMENT_ID = 'shipmentId';
        
    skuOriginId: number | null;
    skuOriginIdToDb: boolean;
    skuId: number | null;
    skuIdToDb: boolean;
    shipmentId: number | null;
    shipmentIdToDb: boolean;
    
    constructor() {
        this.skuOriginId = null;
        this.skuOriginIdToDb = false;
        this.skuId = null;
        this.skuIdToDb = false;
        this.shipmentId = null;
        this.shipmentIdToDb = false;
    }
    
    static instanceByDbRow(row): SkuOriginRepoH {
        const repo = new SkuOriginRepoH();
    
        repo.skuOriginId = row[SkuOriginRepoH.C_SKU_ORIGIN_ID] ?? repo.skuOriginId;
        repo.skuId = row[SkuOriginRepoH.C_SKU_ID] ?? repo.skuId;
        repo.shipmentId = row[SkuOriginRepoH.C_SHIPMENT_ID] ?? repo.shipmentId;

        return repo;
    }

    getPrimaryValue(): number | null {
        return this.skuOriginId;
    }

    setPrimaryValue(value: number): void {
        this.skuOriginId = parseInt(value as unknown as string);
    }

    getPrimaryValueForInsert(): number | null {
        return this.getPrimaryValue();
    }

    getDbPairs() {
        const columns = [];
        const values = [];

        if (this.skuIdToDb === true) {
            columns.push(SkuOriginRepoH.C_SKU_ID);
            values.push(this.skuId === null ? null : this.skuId.toString());
        }

        if (this.shipmentIdToDb === true) {
            columns.push(SkuOriginRepoH.C_SHIPMENT_ID);
            values.push(this.shipmentId === null ? null : this.shipmentId.toString());
        }

        return [columns, values];
    }

    getPrimaryDbPair() {
        return [SkuOriginRepoH.C_SKU_ORIGIN_ID, this.skuOriginId];
    }

}
