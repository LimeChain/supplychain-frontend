export default class AutoIncrementerRepoH {

    static TABLE_NAME = 'auto_incrementers';
    static C_AUTO_INCREMENTER_ID = 'autoIncrementerId';
    static C_NEXT_PRODUCT_ID = 'nextProductId';
    static C_NEXT_SKU_ID = 'nextSkuId';
    static C_NEXT_SKU_ORIGIN_ID = 'nextSkuOriginId';
    static C_NEXT_SHIPMENT_ID = 'nextShipmentId';
    static C_NEXT_SHIPMENT_DOCUMENT_ID = 'nextShipmentDocumentId';
        
    autoIncrementerId: number | null;
    autoIncrementerIdToDb: boolean;
    nextProductId: number | null;
    nextProductIdToDb: boolean;
    nextSkuId: number | null;
    nextSkuIdToDb: boolean;
    nextSkuOriginId: number | null;
    nextSkuOriginIdToDb: boolean;
    nextShipmentId: number | null;
    nextShipmentIdToDb: boolean;
    nextShipmentDocumentId: number | null;
    nextShipmentDocumentIdToDb: boolean;
    
    constructor() {
        this.autoIncrementerId = null;
        this.autoIncrementerIdToDb = false;
        this.nextProductId = null;
        this.nextProductIdToDb = false;
        this.nextSkuId = null;
        this.nextSkuIdToDb = false;
        this.nextSkuOriginId = null;
        this.nextSkuOriginIdToDb = false;
        this.nextShipmentId = null;
        this.nextShipmentIdToDb = false;
        this.nextShipmentDocumentId = null;
        this.nextShipmentDocumentIdToDb = false;
    }
    
    static instanceByDbRow(row): AutoIncrementerRepoH {
        const repo = new AutoIncrementerRepoH();
    
        repo.autoIncrementerId = row[AutoIncrementerRepoH.C_AUTO_INCREMENTER_ID] ?? repo.autoIncrementerId;
        repo.nextProductId = row[AutoIncrementerRepoH.C_NEXT_PRODUCT_ID] ?? repo.nextProductId;
        repo.nextSkuId = row[AutoIncrementerRepoH.C_NEXT_SKU_ID] ?? repo.nextSkuId;
        repo.nextSkuOriginId = row[AutoIncrementerRepoH.C_NEXT_SKU_ORIGIN_ID] ?? repo.nextSkuOriginId;
        repo.nextShipmentId = row[AutoIncrementerRepoH.C_NEXT_SHIPMENT_ID] ?? repo.nextShipmentId;
        repo.nextShipmentDocumentId = row[AutoIncrementerRepoH.C_NEXT_SHIPMENT_DOCUMENT_ID] ?? repo.nextShipmentDocumentId;

        return repo;
    }

    getPrimaryValue(): number | null {
        return this.autoIncrementerId;
    }

    setPrimaryValue(value: number): void {
        this.autoIncrementerId = parseInt(value as unknown as string);
    }

    getPrimaryValueForInsert(): number | null {
        return this.getPrimaryValue();
    }

    getDbPairs() {
        const columns = [];
        const values = [];

        if (this.nextProductIdToDb === true) {
            columns.push(AutoIncrementerRepoH.C_NEXT_PRODUCT_ID);
            values.push(this.nextProductId === null ? null : this.nextProductId.toString());
        }

        if (this.nextSkuIdToDb === true) {
            columns.push(AutoIncrementerRepoH.C_NEXT_SKU_ID);
            values.push(this.nextSkuId === null ? null : this.nextSkuId.toString());
        }

        if (this.nextSkuOriginIdToDb === true) {
            columns.push(AutoIncrementerRepoH.C_NEXT_SKU_ORIGIN_ID);
            values.push(this.nextSkuOriginId === null ? null : this.nextSkuOriginId.toString());
        }

        if (this.nextShipmentIdToDb === true) {
            columns.push(AutoIncrementerRepoH.C_NEXT_SHIPMENT_ID);
            values.push(this.nextShipmentId === null ? null : this.nextShipmentId.toString());
        }

        if (this.nextShipmentDocumentIdToDb === true) {
            columns.push(AutoIncrementerRepoH.C_NEXT_SHIPMENT_DOCUMENT_ID);
            values.push(this.nextShipmentDocumentId === null ? null : this.nextShipmentDocumentId.toString());
        }

        return [columns, values];
    }

    getPrimaryDbPair() {
        return [AutoIncrementerRepoH.C_AUTO_INCREMENTER_ID, this.autoIncrementerId];
    }

}
