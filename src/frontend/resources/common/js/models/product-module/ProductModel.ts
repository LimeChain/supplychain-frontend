import { makeAutoObservable } from 'mobx';
import ProductModelH from '../../../../../../../builds/dev-generated/ProductModule/Product/ProductModelConsts';
import S from '../../utilities/Main';

export default class ProductModel {
    productId: string
    productName: string
    productUnit: number
    productDescription: string
    productDeleted: number

    constructor() {
        this.productId = S.Strings.NOT_EXISTS;
        this.productName = S.Strings.EMPTY;
        this.productUnit = S.NOT_EXISTS;
        this.productDescription = S.Strings.EMPTY;
        this.productDeleted = S.INT_FALSE;

        makeAutoObservable(this);
    }

    isNew(): boolean {
        return this.productId === S.Strings.NOT_EXISTS;
    }

    markAsDeleted(): void {
        this.productDeleted = S.INT_TRUE;
    }

    clone(): ProductModel {
        return Object.assign(new ProductModel(), this);
    }

    toJson(): any {
        return {
            'productId': this.productId,
            'productName': this.productName,
            'productUnit': this.productUnit,
            'productDescription': this.productDescription,
            'productDeleted': this.productDeleted,
        }
    }

    static fromJson(json): ProductModel {
        if (json === null) {
            return null;
        }

        const model = new ProductModel();

        model.productId = (json.productId ?? model.productId).toString();
        model.productName = json.productName ?? model.productName;
        model.productUnit = json.productUnit ?? model.productUnit;
        model.productDescription = json.productDescription ?? model.productDescription;
        model.productDeleted = json.productDeleted ?? model.productDeleted;

        return model;
    }

    static getUnitName(productUnit: number): string {
        switch (productUnit) {
            case ProductModelH.S_UNIT_KG:
                return 'Kg';
            case ProductModelH.S_UNIT_PACK:
                return 'Pack';
            default:
                return 'Unit';
        }
    }
}
