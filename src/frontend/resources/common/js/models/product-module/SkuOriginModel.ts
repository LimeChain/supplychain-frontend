import { makeAutoObservable } from 'mobx';
import S from '../../utilities/Main';

export default class SkuOriginModel {

    skuOriginId: string;
    skuId: string;
    shipmentId: string;

    constructor() {
        this.skuOriginId = S.Strings.NOT_EXISTS;
        this.skuId = S.Strings.NOT_EXISTS;
        this.shipmentId = S.Strings.NOT_EXISTS;

        makeAutoObservable(this);
    }

    isNew(): boolean {
        const skuOriginParseInt = parseInt(this.skuOriginId)

        return this.skuOriginId === S.Strings.NOT_EXISTS || (!Number.isNaN(skuOriginParseInt) && skuOriginParseInt < 0);
    }

    isLocallyProduced() {
        return this.shipmentId === S.Strings.NOT_EXISTS;
    }

    setLocallyProcuded() {
        this.shipmentId = S.Strings.NOT_EXISTS;
    }

    hasShipment(): boolean {
        return this.shipmentId !== S.Strings.NOT_EXISTS;
    }

    toJson(): any {
        return {
            'skuOriginId': this.skuOriginId,
            'skuId': this.skuId,
            'shipmentId': this.shipmentId,
        };
    }

    static fromJson(json): SkuOriginModel {
        if (json === null) {
            return null;
        }

        const model = new SkuOriginModel();

        model.skuOriginId = (json.skuOriginId ?? model.skuOriginId).toString();
        model.skuId = (json.skuId ?? model.skuId).toString();
        model.shipmentId = (json.shipmentId ?? model.shipmentId).toString();

        return model;
    }

}
