import ShipmentStatusConstsH from '../../../../../backend/modules/product-group-module/shipment-module/ShipmentStatusModel.h';
import SkuModel from '../models/product-module/SkuModel';
import SkuOriginModel from '../models/product-module/SkuOriginModel';
import ShipmentModel from '../models/shipment-module/ShipmentModel';

export class CreditShipmentReq2 {

    shipmentJson: ShipmentModel
    skuOriginJsons: SkuOriginModel[]
    skuJsons: SkuModel[]

    constructor(shipmentModel: ShipmentModel, skuOriginModels: SkuOriginModel[], skuModels: SkuModel[]) {
        this.shipmentJson = shipmentModel.toJson();
        this.skuOriginJsons = skuOriginModels.map((skuOriginModel) => skuOriginModel.toJson());
        this.skuJsons = skuModels.map((skuModel) => skuModel.toJson());
    }
}

export class CreditShipmentReq {

    shipmentJson: ShipmentModel
    skuOriginJsons: SkuOriginModel[]
    skuJsons: SkuModel[]

    constructor(shipmentModel: ShipmentModel, skuOriginModels: SkuOriginModel[], skuModels: SkuModel[]) {
        this.shipmentJson = shipmentModel.toJson();
        this.skuOriginJsons = skuOriginModels.map((skuOriginModel) => skuOriginModel.toJson());
        this.skuJsons = skuModels.map((skuModel) => skuModel.toJson());
    }
}

export class DeleteShipmentReq {
    shipmentId: string

    constructor(shipmentId: string) {
        this.shipmentId = shipmentId;
    }
}

export class FetchShipmentsByFilterReq {
    filter: string
    from: number
    to: number

    constructor(filter: string, from: number, to: number) {
        this.filter = filter;
        this.from = from;
        this.to = to;
    }
}

export class FetchShipmentByIdReq {
    shipmentId: string

    constructor(shipmentId: string) {
        this.shipmentId = shipmentId;
    }
}
