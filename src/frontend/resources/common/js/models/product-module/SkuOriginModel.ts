import S from '../../utilities/Main';

export default class SkuOriginModel {
    skuOriginId: string;
    skuId: string;
    shipmentId: string;
    
    constructor(){
        this.skuOriginId = S.Strings.NOT_EXISTS;
        this.skuId = S.Strings.NOT_EXISTS;
        this.shipmentId = S.Strings.NOT_EXISTS;
    }

    isNew(): boolean {
        let skuOriginParseInt = parseInt(this.skuOriginId)
        
        return this.skuOriginId === S.Strings.NOT_EXISTS ||
            (!isNaN(skuOriginParseInt) && skuOriginParseInt < 0);
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

        model.skuOriginId = (json.skuOriginId || model.skuOriginId).toString();
        model.skuId = (json.skuId || model.skuId).toString();  
        model.shipmentId = (json.shipmentId || model.shipmentId).toString();
        
        return model;
    }

}