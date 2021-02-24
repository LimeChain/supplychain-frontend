import ProductModel from './ProductModel';
import ProductModelH from './ProductModelH';
import ProductRepoH from '../Repo/ProductRepoH';
import SV from '../../../../utilities/SV';
import SkuModel from '../../../../modules/ProductModule/Sku/Model/SkuModel';
import SkuModelG from '../../../../modules/ProductModule/Sku/Model/SkuModelG';
import SkuModelH from '../../../../modules/ProductModule/Sku/Model/SkuModelH';

export default class ProductModelG extends ProductModelH {

    constructor() {
        super();
        this.productId = SV.NOT_EXISTS;
        this.productName = SV.Strings.EMPTY;
        this.productUnit = SV.NOT_EXISTS;
        this.productDescription = SV.Strings.EMPTY;
        this.productDeleted = SV.NOT_EXISTS;
        this.skus = [];
    }

    copyRefProperties(sourceModel: ProductModel): void {
        this.skus = sourceModel.skus;
    }

    static asMap(models: ProductModel[]): Map < any, ProductModel > {
        const map = new Map < any, ProductModel >();

        models.forEach((m) => {
            map.set(m.productId, m);
        });

        return map;
    }


    toRepo(props: number[] | null = null): ProductRepoH {
        const map = ProductModelG.getPropsAsMap(props);

        const repo = new ProductRepoH();

        if (map.has(ProductModelH.P_PRODUCT_ID) === true && this.productId !== undefined) {
            repo.productId = this.productId;
            repo.productIdToDb = true;
        }
        if (map.has(ProductModelH.P_PRODUCT_NAME) === true && this.productName !== undefined) {
            repo.productName = this.productName;
            repo.productNameToDb = true;
        }
        if (map.has(ProductModelH.P_PRODUCT_UNIT) === true && this.productUnit !== undefined) {
            repo.productUnit = this.productUnit;
            repo.productUnitToDb = true;
        }
        if (map.has(ProductModelH.P_PRODUCT_DESCRIPTION) === true && this.productDescription !== undefined) {
            repo.productDescription = this.productDescription;
            repo.productDescriptionToDb = true;
        }
        if (map.has(ProductModelH.P_PRODUCT_DELETED) === true && this.productDeleted !== undefined) {
            repo.productDeleted = this.productDeleted;
            repo.productDeletedToDb = true;
        }

        return repo;
    }

    static fromRepo(repo: ProductRepoH): ProductModel {
        const model = new ProductModel();

        model.productId = parseInt((repo.productId ?? model.productId) as unknown as string);
        model.productName = repo.productName ?? model.productName;
        model.productUnit = parseInt((repo.productUnit ?? model.productUnit) as unknown as string);
        model.productDescription = repo.productDescription ?? model.productDescription;
        model.productDeleted = parseInt((repo.productDeleted ?? model.productDeleted) as unknown as string);

        return model;
    }
        

    toNetwork(): any {
        return {
            productId: this.productId,
            productName: this.productName,
            productUnit: this.productUnit,
            productDescription: this.productDescription,
            productDeleted: this.productDeleted,
            skus: this.skus.map((m) => {
                return m.toNetwork();
            }),
        };
    }

    static fromNetwork(json: any): ProductModel {
        if (json === null) {
            return null;
        }

        const model = new ProductModel();
        
        model.productId = parseInt(json.productId ?? model.productId);
        model.productName = json.productName ?? model.productName;
        model.productUnit = parseInt(json.productUnit ?? model.productUnit);
        model.productDescription = json.productDescription ?? model.productDescription;
        model.productDeleted = parseInt(json.productDeleted ?? model.productDeleted);
        (json.skus ?? model.skus).map((j) => {
            return SkuModel.fromNetwork(j);
        });

        return model;
    }

    static matchModelToRepoProp(modelProp: number): string | null {
        switch (modelProp) {
            case ProductModelH.P_PRODUCT_ID:
                return ProductRepoH.C_PRODUCT_ID;
            case ProductModelH.P_PRODUCT_NAME:
                return ProductRepoH.C_PRODUCT_NAME;
            case ProductModelH.P_PRODUCT_UNIT:
                return ProductRepoH.C_PRODUCT_UNIT;
            case ProductModelH.P_PRODUCT_DESCRIPTION:
                return ProductRepoH.C_PRODUCT_DESCRIPTION;
            case ProductModelH.P_PRODUCT_DELETED:
                return ProductRepoH.C_PRODUCT_DELETED;
            default:
                return null;
        }
    }

    static getPropsAsMap(props: number[] | null = null): Map < number, boolean > {
        props = props ?? ProductModelH.PROPERTIES;

        const map = new Map < number, boolean >();
        props.forEach((prop) => {
            map.set(prop, true);
        });

        return map;
    }
}
