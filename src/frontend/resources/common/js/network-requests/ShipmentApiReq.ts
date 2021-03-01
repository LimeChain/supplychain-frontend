import SkuModel from '../models/product-module/SkuModel';
import SkuOriginModel from '../models/product-module/SkuOriginModel';
import ShipmentDocumentModel from '../models/shipment-module/ShipmentDocumentModel';
import ShipmentModel from '../models/shipment-module/ShipmentModel';

export class CreditShipmentReq {

    shipmentJson: ShipmentModel
    skuOriginJsons: SkuOriginModel[]
    skuJsons: SkuModel[]
    shipmentDocumentJsons: ShipmentDocumentModel[]

    constructor(shipmentModel: ShipmentModel, skuOriginModels: SkuOriginModel[], skuModels: SkuModel[], shipmentDocumentModels: ShipmentDocumentModel[]) {
        this.shipmentJson = shipmentModel.toJson();
        this.skuOriginJsons = skuOriginModels.map((skuOriginModel) => skuOriginModel.toJson());
        this.skuJsons = skuModels.map((skuModel) => skuModel.toJson());
        this.shipmentDocumentJsons = shipmentDocumentModels.map((shipmentDocument) => shipmentDocument.toJson());
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
