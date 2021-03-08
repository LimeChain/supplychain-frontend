import S from '../../utilities/Main';

export default class SkuModel {
    skuId: string;
    shipmentId: string;
    productId: string;
    quantity: number;
    pricePerUnit: number;
    currency: number;

    constructor() {
        this.skuId = S.Strings.NOT_EXISTS;
        this.productId = S.Strings.NOT_EXISTS;
        this.quantity = S.NOT_EXISTS;
        this.pricePerUnit = S.NOT_EXISTS;
        this.currency = S.NOT_EXISTS;
    }

    isNew(): boolean {
        const skuIdParseInt = parseInt(this.skuId);
        return this.skuId === S.Strings.NOT_EXISTS || (!Number.isNaN(skuIdParseInt) && skuIdParseInt < 0);
    }

    toJson(): any {
        return {
            'skuId': this.skuId,
            'productId': this.productId,
            'quantity': this.quantity,
            'pricePerUnit': this.pricePerUnit,
            'currency': this.currency,
        }
    }

    static fromJson(json): SkuModel {
        if (json === null) {
            return null;
        }

        const model = new SkuModel();

        model.skuId = (json.skuId ?? model.skuId).toString();
        model.productId = (json.productId ?? model.productId).toString();
        model.quantity = json.quantity ?? model.quantity;
        model.pricePerUnit = json.pricePerUnit ?? model.pricePerUnit;
        model.currency = json.currency ?? model.currency;

        return model;
    }

}
