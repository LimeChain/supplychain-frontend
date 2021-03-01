
export class CreditShipmentReq {

    shipmentJson: ShipmentModel
    skuOriginJsons: Array<SkuOriginModel>
    skuJsons: Array<SkuModel>
    shipmentDocumentJsons: Array<ShipmentDocumentModel>

    constructor(shipmentModel: ShipmentModel, skuOriginModels: Array<SkuOriginModel>, skuModels: Array<SkuModel>, shipmentDocumentModels: Array<ShipmentDocumentModel>) {
        this.shipmentJson = shipmentModel.toJson();
        this.skuOriginJsons = skuOriginModels.map((skuOriginModel) => skuOriginModel.toJson());
        this.skuJsons = skuModels.map((skuModel) => skuModel.toJson());
        this.shipmentDocumentJsons = shipmentDocumentModels.map((shipmentDocumentModel) => shipmentDocumentModel.toJson());
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
