import ShipmentDocumentModel from "../../../src/backend/modules/ShipmentModule/ShipmentDocument/Model/ShipmentDocumentModel";

export class CreditShipmentRes {

    shipmentModel: ShipmentModel;
    skuOriginModels: Array<SkuOriginModel>
    skuModels: Array<SkuModel>
    shipmentDocumentModels: Array<ShipmentDocumentModel>

    constructor(json) {

        this.shipmentModel = ShipmentModel.fromJson(json.shipmentJson);
        this.skuOriginModels = json.skuOriginJsons.map((skuOriginJson) => SkuOriginModel.fromJson(skuOriginJson));
        this.skuModels = json.skuJsons.map((skuJson) => SkuModel.fromJson(skuJson));
        this.shipmentDocumentModels = json.shipmentDocumentJsons.map((shipmentDocumentJson) => ShipmentDocumentModel.fromJson(shipmentDocumentJson));

    }
}

export class DeleteShipmentRes {
    shipmentModel: ShipmentModel;

    constructor(json) {
        this.shipmentModel = ShipmentModel.fromJson(json.shipmentJson);
    }
}


export class FetchShipmentsByFilterRes {
    shipmentModels: Array<ShipmentModel>;
    titalSize: number;

    constructor(json) {
        this.shipmentModels = [];
        this.titalSize = json.totalSize;

        for (let shipmentJson of json.shipmentJsons) {
            this.shipmentModels.push(ShipmentModel.fromJson(shipmentJson));
        }

    }
}

export class FetchShipmentsByIdRes {
    shipmentModel: ShipmentModel;

    constructor(json) {
        this.shipmentModel = ShipmentModel.fromJson(json.shipmentJson);
    }
}