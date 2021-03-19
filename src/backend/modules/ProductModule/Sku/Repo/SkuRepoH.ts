export default class SkuRepoH {

    static TABLE_NAME = 'skus';
    static C_SKU_ID = 'skuId';
    static C_SHIPMENT_ID = 'shipmentId';
    static C_PRODUCT_ID = 'productId';
    static C_QUANTITY = 'quantity';
    static C_PRICE_PER_UNIT = 'pricePerUnit';
    static C_CURRENCY = 'currency';

    skuId: number | null;
    skuIdToDb: boolean;
    shipmentId: number | null;
    shipmentIdToDb: boolean;
    productId: number | null;
    productIdToDb: boolean;
    quantity: number | null;
    quantityToDb: boolean;
    pricePerUnit: number | null;
    pricePerUnitToDb: boolean;
    currency: number | null;
    currencyToDb: boolean;

    constructor() {
        this.skuId = null;
        this.skuIdToDb = false;
        this.shipmentId = null;
        this.shipmentIdToDb = false;
        this.productId = null;
        this.productIdToDb = false;
        this.quantity = null;
        this.quantityToDb = false;
        this.pricePerUnit = null;
        this.pricePerUnitToDb = false;
        this.currency = null;
        this.currencyToDb = false;
    }

    static instanceByDbRow(row): SkuRepoH {
        const repo = new SkuRepoH();

        repo.skuId = row[SkuRepoH.C_SKU_ID] ?? repo.skuId;
        repo.shipmentId = row[SkuRepoH.C_SHIPMENT_ID] ?? repo.shipmentId;
        repo.productId = row[SkuRepoH.C_PRODUCT_ID] ?? repo.productId;
        repo.quantity = row[SkuRepoH.C_QUANTITY] ?? repo.quantity;
        repo.pricePerUnit = row[SkuRepoH.C_PRICE_PER_UNIT] ?? repo.pricePerUnit;
        repo.currency = row[SkuRepoH.C_CURRENCY] ?? repo.currency;

        return repo;
    }

    getPrimaryValue(): number | null {
        return this.skuId;
    }

    setPrimaryValue(value: number): void {
        this.skuId = parseFloat(value as unknown as string);
    }

    getPrimaryValueForInsert(): number | null {
        return null;
    }

    getDbPairs() {
        const columns = [];
        const values = [];

        if (this.shipmentIdToDb === true) {
            columns.push(SkuRepoH.C_SHIPMENT_ID);
            values.push(this.shipmentId === null ? null : this.shipmentId.toString());
        }

        if (this.productIdToDb === true) {
            columns.push(SkuRepoH.C_PRODUCT_ID);
            values.push(this.productId === null ? null : this.productId.toString());
        }

        if (this.quantityToDb === true) {
            columns.push(SkuRepoH.C_QUANTITY);
            values.push(this.quantity === null ? null : this.quantity.toString());
        }

        if (this.pricePerUnitToDb === true) {
            columns.push(SkuRepoH.C_PRICE_PER_UNIT);
            values.push(this.pricePerUnit === null ? null : this.pricePerUnit.toString());
        }

        if (this.currencyToDb === true) {
            columns.push(SkuRepoH.C_CURRENCY);
            values.push(this.currency === null ? null : this.currency.toString());
        }

        return [columns, values];
    }

    getPrimaryDbPair() {
        return [SkuRepoH.C_SKU_ID, this.skuId];
    }

}
