export default class ProductRepoH {

    static TABLE_NAME = 'products';
    static C_PRODUCT_ID = 'productId';
    static C_PRODUCT_NAME = 'productName';
    static C_PRODUCT_UNIT = 'productUnit';
    static C_PRODUCT_DESCRIPTION = 'productDescription';
    static C_PRODUCT_DELETED = 'productDeleted';
        
    productId: number | null;
    productIdToDb: boolean;
    productName: string | null;
    productNameToDb: boolean;
    productUnit: number | null;
    productUnitToDb: boolean;
    productDescription: string | null;
    productDescriptionToDb: boolean;
    productDeleted: number | null;
    productDeletedToDb: boolean;
    
    constructor() {
        this.productId = null;
        this.productIdToDb = false;
        this.productName = null;
        this.productNameToDb = false;
        this.productUnit = null;
        this.productUnitToDb = false;
        this.productDescription = null;
        this.productDescriptionToDb = false;
        this.productDeleted = null;
        this.productDeletedToDb = false;
    }
    
    static instanceByDbRow(row): ProductRepoH {
        const repo = new ProductRepoH();
    
        repo.productId = row[ProductRepoH.C_PRODUCT_ID] ?? repo.productId;
        repo.productName = row[ProductRepoH.C_PRODUCT_NAME] ?? repo.productName;
        repo.productUnit = row[ProductRepoH.C_PRODUCT_UNIT] ?? repo.productUnit;
        repo.productDescription = row[ProductRepoH.C_PRODUCT_DESCRIPTION] ?? repo.productDescription;
        repo.productDeleted = row[ProductRepoH.C_PRODUCT_DELETED] ?? repo.productDeleted;

        return repo;
    }

    getPrimaryValue(): number | null {
        return this.productId;
    }

    setPrimaryValue(value: number): void {
        this.productId = parseInt(value as unknown as string);
    }

    getPrimaryValueForInsert(): number | null {
        return null;
    }

    getDbPairs() {
        const columns = [];
        const values = [];

        if (this.productNameToDb === true) {
            columns.push(ProductRepoH.C_PRODUCT_NAME);
            values.push(this.productName === null ? null : this.productName.toString());
        }

        if (this.productUnitToDb === true) {
            columns.push(ProductRepoH.C_PRODUCT_UNIT);
            values.push(this.productUnit === null ? null : this.productUnit.toString());
        }

        if (this.productDescriptionToDb === true) {
            columns.push(ProductRepoH.C_PRODUCT_DESCRIPTION);
            values.push(this.productDescription === null ? null : this.productDescription.toString());
        }

        if (this.productDeletedToDb === true) {
            columns.push(ProductRepoH.C_PRODUCT_DELETED);
            values.push(this.productDeleted === null ? null : this.productDeleted.toString());
        }

        return [columns, values];
    }

    getPrimaryDbPair() {
        return [ProductRepoH.C_PRODUCT_ID, this.productId];
    }

}
